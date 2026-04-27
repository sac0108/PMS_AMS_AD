/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',
        ams: '#2563eb',
        project: '#f97316',
        available: '#16a34a',
        risk: '#dc2626',
        strategic: '#7c3aed',
      },
    },
  },
  plugins: [],
};
