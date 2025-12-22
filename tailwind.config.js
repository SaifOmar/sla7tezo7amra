/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f7f9',
          100: '#e6eef6',
          200: '#cfe0ef',
          300: '#9fbfdf',
          400: '#6f9fcd',
          DEFAULT: '#092334',
          600: '#43647f',
          700: '#344b5c',
          800: '#24323a',
          900: '#12181d',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#64748b',
          foreground: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}
