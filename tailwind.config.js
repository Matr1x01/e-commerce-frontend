/** @type {import('tailwindcss').Config} */



const lightAndAiry = {
  headerBg: '#F2F7FB',
  cardBg: '#E5F2FF',
  mainBg: '#D0E6FF',
  darkBg: '#87A8C9',
  lightBg: '#FFFFFF',
  footerBg: '#778BA5',
  textOnLight: '#212529',
  textOnDark: '#FFFFFF',
  textDanger: '#ef4444',
};
const warmAndInviting = {
  headerBg: '#FCEEC9',
  cardBg: '#F8E0B3',
  mainBg: '#F2D29B',
  darkBg: '#CC9966',
  lightBg: '#FFFFFF',
  footerBg: '#A67D3D',
  textOnLight: '#212529',
  textOnDark: '#FFFFFF',
  textDanger: '#c23616',
};
const modernAndMinimalist = {
  headerBg: '#343A40',
  cardBg: '#29323C',
  mainBg: '#242930',
  darkBg: '#1A1E22',
  lightBg: '#FFFFFF',
  footerBg: '#1A1E22',
  textOnLight: '#e7e7e7',
  textOnDark: '#dadada',
  textDanger: '#ef4444',
};


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: warmAndInviting
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};



