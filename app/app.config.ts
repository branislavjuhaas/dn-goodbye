/**
 * Global application configuration used by the framework.
 * Contains UI defaults (color tokens, icon choices and small layout tweaks).
 * The app starter consumes this configuration via defineAppConfig(...).
 */
export default defineAppConfig({
  ui: {
    colors: {
      neutral: "zinc",
      primary: "rose",
    },
    icons: {
      light: "ph:sun",
      dark: "ph:moon",
    },
    pageBody: {
      base: "mt-32",
    },
    card: {
      slots: {
        body: "flex flex-col items-center justify-center w-full h-full",
      },
    },
  },
});
