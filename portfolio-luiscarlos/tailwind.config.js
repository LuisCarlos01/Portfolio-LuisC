/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-light": "var(--color-primary-light)",
        "bg-dark": "var(--color-bg-dark)",
        "bg-light": "var(--color-bg-light)",
        "card-bg": "var(--color-card-bg)",
        "text-light": "var(--color-text-light)",
        "text-dark": "var(--color-text-dark)",
        "border-color": "var(--color-border)",
        completed: "#4caf50",
        delete: "#f44336",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
      },
      boxShadow: {
        custom: "0 8px 30px var(--color-shadow)",
      },
      borderRadius: {
        custom: "12px",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--color-text-dark)",
            a: {
              color: "var(--color-primary)",
              "&:hover": {
                color: "var(--color-primary-dark)",
              },
            },
            h1: {
              color: "var(--color-text-dark)",
            },
            h2: {
              color: "var(--color-text-dark)",
            },
            h3: {
              color: "var(--color-text-dark)",
            },
            h4: {
              color: "var(--color-text-dark)",
            },
            strong: {
              color: "var(--color-text-dark)",
            },
            code: {
              color: "var(--color-text-dark)",
            },
            figcaption: {
              color: "var(--color-text-light)",
            },
          },
        },
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      animation: {
        "gradient-x": "gradient-x 5s ease infinite",
        "gradient-y": "gradient-y 5s ease infinite",
        "gradient-xy": "gradient-xy 5s ease infinite",
        fadeIn: "fadeIn 0.8s ease-out forwards",
        slideUpFade: "slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-glow": "glow-pulse 2s ease-in-out",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "top center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "bottom center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right bottom",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        slideUpFade: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
