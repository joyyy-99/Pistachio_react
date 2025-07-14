
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
              pistachio: '#93BFA3',
              'light-gray-bg': '#f9fafb',
              'dark-font': '#1f2937',
              'medium-gray-text': '#6b7280',
              'dark-bg': '#121212',
              'navbar-dark': '#2E2E2E',
              'input-dark': '#D9D9D9',
              'feedback-dark': '#6D6D6D',
              'brand-light': '#FAF9F6'
            },
      fontFamily: {
          sans: ['Playfair Display','serif'],
          serif: ['Playfair Display','serif']
        }
        }
  },
  plugins: [],
}
