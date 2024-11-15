describe('Shopify user account flow', () => {
  it('Shopify user account flow', () => {
    
	// Visit the homepage
    cy.visit('http://127.0.0.1:9292');
	
	//enter store password
	cy.get('.password-link').click();
	cy.get('[type="password"]').type('nowyoh');
	cy.get('.password-button').click();
	cy.get('#accept-cookies').click();
	
	//register page		
	cy.get('#li-nav-account').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-register').click();
	//cy.get('#salutation').click();
	cy.get('#firstName').type('Abc').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#lastName').type('Cde').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#email').type('xojig67475@anypng.com').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#password').type('Xojig67475@%').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#confirmPassword').type('Xojig67475@%').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#terms').check();
    cy.get('button[type="submit"]').click();
	
	//login page
	cy.scrollTo('top');
	cy.get('#li-nav-account').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-sign-in').click();
	cy.get('#CustomerEmail').type('xojig67475@anypng.com').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#CustomerPassword').type('Xojig67475@%').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('button[type="submit"]').first().click();
	cy.get('#li-nav-account').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-logout').click();
	
  });
});
