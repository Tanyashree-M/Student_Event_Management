/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#5B2EFF",
          light:   "#7B5AFF",
          dark:    "#3A0FCC",
          soft:    "#EDE9FF",
        },
      },
      animation: {
        "fade-in":    "fadeIn 0.5s ease forwards",
        "slide-up":   "slideUp 0.5s ease forwards",
        "slide-left": "slideLeft 0.6s ease forwards",
      },
      keyframes: {
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp:   { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        slideLeft: { from: { opacity: "0", transform: "translateX(-24px)" }, to: { opacity: "1", transform: "translateX(0)" } },
      },
      boxShadow: {
        "glow":    "0 0 24px rgba(91,46,255,0.25)",
        "glow-lg": "0 0 48px rgba(91,46,255,0.3)",
        "card":    "0 4px 32px rgba(91,46,255,0.08), 0 1px 4px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "brand-gradient":  "linear-gradient(135deg, #5B2EFF 0%, #A855F7 100%)",
        "brand-gradient2": "linear-gradient(135deg, #7B5AFF 0%, #C084FC 100%)",
        "mesh":            "radial-gradient(at 40% 20%, #5B2EFF22 0px, transparent 50%), radial-gradient(at 80% 0%, #A855F722 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
