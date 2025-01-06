const { defineConfig } = require("cypress");

	module.exports = defineConfig({
	  e2e: {
		specPattern: 'automated_testing/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Ensure it matches your file pattern
		baseUrl: 'https://8b47fd-7d.myshopify.com/',
		supportFile: false, // Disable support file
	  },
	});
		
