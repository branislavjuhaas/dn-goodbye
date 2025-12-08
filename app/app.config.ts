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
