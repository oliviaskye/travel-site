module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          200: "#F5EFE0",
          400: "#EADDC9",
        },
        "dark-beige": {
          400: "#B08B57",
        },
        pink: {
          50: "#FFF5F7",
        },
        theme: {
          extend: {
            fontFamily: {
              playfair: ['"Playfair Display"', 'serif'],
            },
          },
        },
        
      },
    },
  },
  plugins: [],
};




