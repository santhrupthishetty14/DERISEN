/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#12092c',
          dark: '#180D38',
          card: '#1E1147',
          cardHover: '#27175c',
          purple: '#6320EE',
          purpleHover: '#5214db',
          violet: '#7C3AED',
          violetLight: '#8B5CF6',
          electric: '#7000FF',
          cyan: '#38BDF8',
          lilac: '#EDE9FE',
          lilacSoft: '#F5F3FF',
          lilacBorder: '#DDD6FE',
        },
        surface: {
          canvas: '#FFFFFF',
          subtle: '#F8F9FD',
          alt: '#FAFBFF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-grad': 'linear-gradient(135deg, #180D38 0%, #6320EE 60%, #9333EA 100%)',
        'text-grad': 'linear-gradient(135deg, #180D38 0%, #6320EE 55%, #8B5CF6 100%)',
        'badge-grad': 'linear-gradient(135deg, #6320EE 0%, #7C3AED 100%)',
        'dark-card-grad': 'linear-gradient(145deg, #1E1147 0%, #150A33 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 25px rgba(99, 32, 238, 0.35)',
        'dark-card': '0 15px 35px rgba(18, 9, 44, 0.25)',
      },
      borderRadius: {
        'full-pill': '9999px',
      },
      transitionDuration: {
        '400': '400ms',
        '800': '800ms',
        '900': '900ms',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
