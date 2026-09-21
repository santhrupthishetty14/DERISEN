export interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  source?: string;
}

export interface InquiryResponse {
  success: boolean;
  isDirectMail?: boolean;
  message: string;
  mailtoUrl?: string;
  whatsappUrl?: string;
}

export const TARGET_EMAIL = 'derisenofficial@gmail.com';
export const TARGET_WHATSAPP = '917899910917';

/**
 * Builds a structured, pre-filled mailto: link directed to derisenofficial@gmail.com
 */
export function buildMailtoUrl(payload: Partial<InquiryPayload>): string {
  const subject = encodeURIComponent(
    `[DE.RISEN Inquiry] ${payload.service || 'Project Discussion'} - ${payload.name || 'Website Visitor'}`
  );
  
  const bodyContent = [
    `Hi DE.RISEN Team,`,
    ``,
    `I would like to discuss a project with DE.RISEN:`,
    ``,
    `• Name: ${payload.name || 'Not provided'}`,
    `• Email: ${payload.email || 'Not provided'}`,
    payload.phone ? `• Phone/WhatsApp: ${payload.phone}` : null,
    payload.service ? `• Primary Service: ${payload.service}` : null,
    payload.budget ? `• Estimated Budget: ${payload.budget}` : null,
    ``,
    `Project Brief / Requirements:`,
    payload.message || 'No additional message provided.',
    ``,
    `---`,
    `Sent from DE.RISEN Website`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
}

/**
 * Builds a direct WhatsApp chat link pre-filled with the inquiry details
 */
export function buildWhatsAppUrl(payload: Partial<InquiryPayload>): string {
  const text = [
    `*Hi DE.RISEN Team, I would like to inquire about a project:*`,
    `• *Name:* ${payload.name || 'N/A'}`,
    `• *Email:* ${payload.email || 'N/A'}`,
    payload.phone ? `• *Phone:* ${payload.phone}` : null,
    payload.service ? `• *Service:* ${payload.service}` : null,
    payload.budget ? `• *Budget:* ${payload.budget}` : null,
    payload.message ? `• *Details:* ${payload.message}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n');

  return `https://wa.me/${TARGET_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

/**
 * Sends inquiry:
 * 1. If VITE_WEB3FORMS_ACCESS_KEY is set, sends in background via Web3Forms API.
 * 2. If no key is set (e.g. client unavailable for verification code), gracefully opens
 *    the pre-filled mail client and provides instant WhatsApp & email dispatch.
 */
export async function sendInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  const mailtoUrl = buildMailtoUrl(payload);
  const whatsappUrl = buildWhatsAppUrl(payload);
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

  // If no access key is configured, perform graceful zero-verification direct dispatch
  if (!accessKey || accessKey === 'your_web3forms_access_key_here') {
    // Automatically trigger user's default email client
    try {
      window.location.href = mailtoUrl;
    } catch {
      // ignore navigation restrictions if in iframe
    }

    return {
      success: true,
      isDirectMail: true,
      mailtoUrl,
      whatsappUrl,
      message:
        'Your inquiry was pre-filled and directed to derisenofficial@gmail.com. You can also send via WhatsApp with one click!',
    };
  }

  // If access key is present, attempt background delivery via Web3Forms
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[DE.RISEN Web Inquiry] ${payload.service || 'New Lead'} from ${payload.name}`,
        from_name: 'DE.RISEN Website Inquiry',
        name: payload.name,
        email: payload.email,
        phone: payload.phone || 'Not provided',
        service: payload.service || 'Full Service Suite',
        budget: payload.budget || 'Not specified',
        message: payload.message || 'No additional message provided.',
        source: payload.source || 'Website Form',
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        isDirectMail: false,
        message: 'Thank you! Your inquiry has been sent to derisenofficial@gmail.com.',
      };
    } else {
      // API rejected (e.g. bad key) -> fallback gracefully to direct mailto & WhatsApp
      try {
        window.location.href = mailtoUrl;
      } catch {
        // ignore
      }
      return {
        success: true,
        isDirectMail: true,
        mailtoUrl,
        whatsappUrl,
        message:
          'Opening your email app to deliver to derisenofficial@gmail.com directly.',
      };
    }
  } catch (error) {
    console.error('Inquiry submission error:', error);
    // Network offline -> fallback gracefully
    try {
      window.location.href = mailtoUrl;
    } catch {
      // ignore
    }
    return {
      success: true,
      isDirectMail: true,
      mailtoUrl,
      whatsappUrl,
      message: 'Opening your email client to send directly to derisenofficial@gmail.com.',
    };
  }
}
