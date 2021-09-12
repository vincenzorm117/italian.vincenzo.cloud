module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      green: {
        default: "#67BA65",
        dark: "#469744",
        darkest: "#3A7F39",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
