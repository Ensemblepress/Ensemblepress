describe('Shopify user account flow', () => {
  it('Shopify user account flow', () => {
    
	// Visit the homepage
    cy.visit('https://dev-store-lost-river-press.myshopify.com');
	//cy.visit('https://staging-lost-river-press.myshopify.com');
		
	//enter store password
	//cy.get('.password-link').click();
	//cy.get('[type="password"]').type('ontats');
	//cy.get('.password-button').click();
	cy.get('#accept-cookies').click();
	
	//login page
	cy.scrollTo('top');
	cy.get('#li-nav-account').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-sign-in').click();
	cy.get('#CustomerEmail').type('yagnik.dabhi@ncameo.com').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#CustomerPassword').type('Yagnikdabhi@32100').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#loginSubmit').first().click();
	
	cy.wait(2000); // Wait briefly to simulate user behavior
	
	cy.get('#li-nav-account').trigger('mouseover');
	cy.wait(2000); // Wait briefly to simulate user behavior
	cy.get('#HeaderMenu-EmptyDrop-logout').click({ force: true });
	cy.wait(2000); // Wait briefly to simulate user behavior

	cy.get('#li-nav-account').trigger('mouseover');
	
  });
});
