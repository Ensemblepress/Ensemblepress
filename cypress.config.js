const { defineConfig } = require("cypress");

	module.exports = defineConfig({
	  e2e: {
		specPattern: 'automated_testing/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Ensure it matches your file pattern
		baseUrl: 'http://127.0.0.1:9292',
		supportFile: false, // Disable support file
	  },
});
