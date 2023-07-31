/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "primary": "#191C1E",
        "box": "#D3A778",
        "blood": "#BD3C3C",
        "herring": "#33373A",
      },
    },
  },
  plugins: []
};