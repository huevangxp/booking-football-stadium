export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
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
