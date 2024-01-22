import { createShadcnPreset, imageRendering } from "mizuhara/plugins";
import type { Config } from "tailwindcss";
import animated from "tailwindcss-animated";

const config = {
  presets: [createShadcnPreset()],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [animated, imageRendering],
} satisfies Config;

export default config;
