import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'by82yg',
  e2e: {
    baseUrl: "http://localhost:4200",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
