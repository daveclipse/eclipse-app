    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./app.{js,jsx,ts,tsx}",
        "./app/(tabs).{js,jsx,ts,tsx}",
        "./screens/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            eclipseYellow: '#F5DF4D',
            eclipseBlack: '#000000',
            eclipseGrey: '#97999B',
          },
        },
      },
      plugins: [],
    };
