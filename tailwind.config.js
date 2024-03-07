/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#316FEA",
        borderColor: "#D3D8DC",
        blackColor: "#060E1E",
      },
      // fontFamily: {
      //   basis: ["Basis Grotesque Pro Bold"],
      // },
    },
  },
  plugins: [],
};

