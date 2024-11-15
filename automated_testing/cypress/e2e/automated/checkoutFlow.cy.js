describe('Shopify Full checkout Flow', () => {
  it('Adds it to the cart, and proceeds to checkout', () => {
    
	// Visit the homepage
    cy.visit('https://dev-store-lost-river-press.myshopify.com');
	
	//enter store password
	//cy.get('.password-link').click();
	//cy.get('[type="password"]').type('yeacuy');
	//cy.get('.password-button').click();
	cy.get('#accept-cookies').click();
	
	//home page
	cy.get('.caption-secondary').first().click();
	
	//plp page
	cy.get('.product.item').first().click();
	
	//select product varient
	cy.get('.header-logo').trigger('mouseover');
	
	//pdp page add to cart
	cy.get('.button-addtobag-cta-title').first().click({ force: true });
	
	//bag icone mousehover
	cy.get('.header-item-bag').trigger('mouseover');
	
	//checkout click
	cy.get('.button.button-orange').click({ force: true });
			
  });
});
