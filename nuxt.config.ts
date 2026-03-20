// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/hints", "v-gsap-nuxt", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        file: "en.json",
        domain: "bye.juhaas.eu",
      },
      {
        code: "sk",
        file: "sk.json",
        domain: "zbohom.juhaas.eu",
      },
    ],
    differentDomains: process.env.NODE_ENV === "production",
  },
});