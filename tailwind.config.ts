
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // extend this object with your custom styling with small font size

    extend: {
      colors: {
        primary: '#f2f4fc',
        secondary: '#1F2544',
        danger: '#e3342f',

      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config