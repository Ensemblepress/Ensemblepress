describe('Shopify Full Navigation Flow', () => {
  it('Site check menu navigation', () => {
    
	// Visit the homepage
    cy.visit('https://dev-store-lost-river-press.myshopify.com');
	
	//enter store password
	//cy.get('.password-link').click();
	//cy.get('[type="password"]').type('yeacuy');
	//cy.get('.password-button').click();
	cy.get('#accept-cookies').click();
		
	//check menu navigation
	cy.get('#li-nav-books').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-new-arrivals').click();
	cy.get('#li-nav-merchandise').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-hats').click();
	cy.get('#li-nav-club').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-login').click();
	cy.get('#li-nav-account').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-overview').click();
	cy.get('#li-nav-bag').trigger('mouseover');
	cy.get('.header-item-brand').click();
  });
});
