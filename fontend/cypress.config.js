const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '18spsc',

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    experimentalRunAllSpecs: true,
    defaultCommandTimeout: 10000,
  },
});
