const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseUrl": 'https://3000-brumatti-spgapitest-g2ojg09e1bc.ws-us63.gitpod.io/api/v1/',
    "mailHogUrl": "https://8025-brumatti-spgapitest-g2ojg09e1bc.ws-us63.gitpod.io"    
  },
});
