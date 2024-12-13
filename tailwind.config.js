/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        'source-code': ['Source Code Pro', 'monospace'], // Thêm font mới
      },
    },
  },
  plugins: [],
};
