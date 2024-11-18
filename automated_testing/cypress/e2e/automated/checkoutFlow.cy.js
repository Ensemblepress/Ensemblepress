describe('Shopify Full checkout Flow', () => {
  it('Adds it to the cart, and proceeds to checkout', () => {
    
	// Visit the homepage
    cy.visit('https://dev-store-lost-river-press.myshopify.com');
	
	//enter store password
	//cy.get('.password-link').click();
	//cy.get('[type="password"]').type('yeacuy');
	//cy.get('.password-button').click();
	cy.get('#accept-cookies').click();
	
	//login page
	cy.scrollTo('top');
	cy.get('#li-nav-account').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-sign-in').click();
	cy.get('#CustomerEmail').type('yagnik.dabhi@ncameo.com').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#CustomerPassword').type('Yagnikdabhi@32100').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#loginSubmit').first().click();

	cy.get('#li-nav-books').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-new-arrivals').click();

	//home page
	//cy.get('.caption-secondary').first().click();
	
	//plp page
	cy.get('.product.item').first().click();
	
	//select product varient
	cy.get('.header-logo').trigger('mouseover');
	
	//pdp page add to cart
	cy.get('.button-addtobag-cta-title').first().click({ force: true });
	
	cy.wait(2000); // Wait briefly to simulate user behavior

	//bag icone mousehover
	cy.get('.header-item-bag').trigger('mouseover');
	
	//checkout click
	cy.get('.button.button-orange').click({ force: true });
	
	//credit card method
	/*	
	cy.get('#number').click().type('4242424242424242').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#expiry').click().type('12/28').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#verification_value').click().type('123').trigger('keydown', { keyCode: 9, which: 9 });
	cy.get('#verification_value').click().type('lr developer testing').trigger('keydown', { keyCode: 9, which: 9 });
	*/	
	// COD Method
	cy.get('#basic-paymentOnDelivery').click();
	//cy.get('#checkout-pay-button').should('have.text', 'Complete order.').click({ force: true });	
	cy.get('#checkout-pay-button').contains('Complete order').click({ force: true });

 });
});
