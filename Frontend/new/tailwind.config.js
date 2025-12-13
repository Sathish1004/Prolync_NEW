/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        '4xl': '1920px',
      },
      maxWidth: {
        '8xl': '88rem', // 1408px
        '9xl': '96rem', // 1536px
        '10xl': '104rem', // 1664px
      },
      colors: {
        primary: "#4F46E5", // Purple-ish
        secondary: "#2563EB", // Blue-ish
      },
      animation: {
        'scroll-left': 'scroll-left 40s linear infinite',
        'gradient-shift': 'gradient-shift 5s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
