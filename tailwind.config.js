/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        RedHat: ["Red Hat Text", "sans-serif"]
      },
      colors: {
        Red: 'hsl(14, 86%, 42%)',
        Green: 'hsl(159, 69%, 38%)',
        Rose50: 'hsl(20, 50%, 98%)',
        Rose100: 'hsl(13, 31%, 94%)',
        Rose300: 'hsl(14, 25%, 72%)',
        Rose400: 'hsl(7, 20%, 60%)',
        Rose500: 'hsl(12, 20%, 44%)',
        Rose900: 'hsl(14, 65%, 9%)'
      },
      animation: {
        upAnim: "upAnim .5s ease 0s 1 normal forwards",
        slideUp: "slideUp .5s ease 0s 1 normal forwards"
      },
      keyframes: {
        upAnim: {
          '0%': {
            opacity: 0,
            transform: "scale(0.5)"
            
          },
          '100%': {
            opacity: 1,
            transform: "scale(1)"
            
          }
        },
        slideUp: {
          '0%': {
            opacity: 0,
            transform: 'translateY(250px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
        
      }
    },
  },
  plugins: [],
}
