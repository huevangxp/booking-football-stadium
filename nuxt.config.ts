export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&display=swap",
        },
      ],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: "en", name: "English", file: "en.json", flag: "🇬🇧" },
      { code: "la", name: "Lao", file: "la.json", flag: "🇱🇦" },
    ] as any,
    defaultLocale: "en",
    langDir: "locales",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  css: ["~/assets/css/main.css"],
  future: {
    compatibilityVersion: 4,
  },
  // runtimeConfig: {
  //   public: {
  //     apiBase: process.env.API_BASE || "http://localhost:3000",
  //   },
  // },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
});
