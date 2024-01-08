/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#1D9BF0",
        "secondary-blue": "rgba(29,155,240,0.2)",

        "dark-blue": "rgb(26,140,216)",

        label: "rgba(83,100,113)",

        "hover-gray": "rgba(15,20,25,0.1)",
        "light-gray": "rgba(15,20,25,0.1)",
        "btn-black": "rgb(0,0,0,0.2)",
      },
      height: {
        input: "60px",
      },
      screens: {
        xs: "500px",
        md: "987px",
        xl: "1264px",
      },
    },
  },
  plugins: [],
};
