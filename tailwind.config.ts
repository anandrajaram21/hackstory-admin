/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        mobile: "412px",
      },
      colors: {
        cross: "#2E2E2E",
        grey: "#9A9A9A",
        ribbon: "#B8B7B7",
        logo: "#5738AF",
        background: "#1C1C1C",
        marquee: "#D0D5FF",
        title: "#FFF6E8",
        yellow: "#FABF29",
        headerbutton: "#A7A9BE",
        tracks: "#E8E8EE",
        trackstext: "#A7A9BE",
      },
      animation: {
        marquee: "marquee 70s linear infinite",
        marquee2: "marquee2 70s linear infinite",
        marquee3: "marquee3 70s linear infinite",
        marquee4: "marquee4 70s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        marquee3: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        marquee4: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-scrollbar")],
};
