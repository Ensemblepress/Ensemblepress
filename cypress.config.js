const { defineConfig } = require("cypress");

	module.exports = defineConfig({
	  e2e: {
		specPattern: 'automated_testing/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Ensure it matches your file pattern
		baseUrl: 'https://dev-store-lost-river-press.myshopify.com/',
		supportFile: false, // Disable support file
	  },
	});
		
