describe('Shopify Full Navigation Flow', () => {
  it('Site check menu navigation', () => {
    
	// Visit the homepage
    cy.visit('http://127.0.0.1:9292');
	
	//enter store password
	cy.get('.password-link').click();
	cy.get('[type="password"]').type('nowyoh');
	cy.get('.password-button').click();
	cy.get('#accept-cookies').click();
		
	//check menu navigation
	cy.get('#li-nav-books').trigger('mouseover');
	cy.get('#HeaderMenu-books-new-arrivals').click();
	cy.get('#li-nav-merchandise').trigger('mouseover');
	cy.get('#HeaderMenu-merchandise-hats').click();
	cy.get('#li-nav-club').trigger('mouseover');
	cy.get('#HeaderMenu-club-login').click();
	cy.get('#li-nav-account').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-overview').click();
	cy.get('#li-nav-bag').trigger('mouseover');
	cy.get('.header-item-brand').click();
  });
});
