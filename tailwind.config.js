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
          purple: '#620d9c',
          purpleHover: '#4e087e',
          violet: '#B063FF',
          violetLight: '#C084FC',
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
        'brand-grad': 'linear-gradient(135deg, #4B006E 0%, #620D9C 48%, #B063FF 100%)',
        'brand-grad-horizontal': 'linear-gradient(90deg, #4B006E 0%, #620D9C 48%, #B063FF 100%)',
        'text-grad': 'linear-gradient(135deg, #4B006E 0%, #620D9C 48%, #B063FF 100%)',
        'badge-grad': 'linear-gradient(135deg, #4B006E 0%, #620D9C 48%, #B063FF 100%)',
        'dark-card-grad': 'linear-gradient(145deg, #1E1147 0%, #150A33 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 25px rgba(98, 13, 156, 0.35)',
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
