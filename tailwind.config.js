// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Убедитесь, что эта строка есть
  ],
  theme: {
    extend: {
      // Можно добавить свои кастомные стили, шрифты, цвета и т.д.
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Пример добавления шрифта Inter
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { maxHeight: '0px', opacity: 0 },
          '100%': { maxHeight: '500px', opacity: 1 }, // 500px - примерная высота, можно подобрать
        },
        slideUp: {
          '0%': { maxHeight: '500px', opacity: 1 },
          '100%': { maxHeight: '0px', opacity: 0 },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}