describe('Shopify user account flow', () => {
  it('Shopify user account flow', () => {
    
	// Visit the homepage
    cy.visit('https://dev-store-lost-river-press.myshopify.com');
	
	//enter store password
	//cy.get('.password-link').click();
	//cy.get('[type="password"]').type('yeacuy');
	//cy.get('.password-button').click();
	cy.get('#accept-cookies').click();
	
	//register page		
	cy.get('#li-nav-account').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-register').click();
	//cy.get('#salutation').click();
	//cy.get('#salutation').select('Mr.');
	cy.get('#salutation').select('Mrs.').should('have.value', 'Mrs.');
	cy.get('#firstName').type('Abc').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#lastName').type('Cde').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#email').type('xojig67475@anypng.com').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#password').type('Xojig67475@%').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#confirmPassword').type('Xojig67475@%').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#terms').check();
    cy.get('button[type="submit"]').click();
	
	cy.wait(2000); // Wait briefly to simulate user behavior
	
	cy.get('#li-nav-account').trigger('mouseover');
	
	cy.wait(2000); // Wait briefly to simulate user behavior
	
  });
});
