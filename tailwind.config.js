module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
      secondary: 'Open Sans',

    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
        xl: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#CE2029',
        secondary: '#FF6C6C',
        tertiary: '#FFD700',
        black: '#000000',
        white: '#FFFFFF',
      },

      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },

      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '16': '4rem',
      },


      
    },
  },
  plugins: [],
};
