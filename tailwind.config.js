
/** @type {import('tailwindcss').Config} */
export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          fontFamily: {
            'sans': ['Oswald', 'sans-serif'], // পুরো UI-র জন্য Oswald
          },
        },
      },
      plugins: [],
    }