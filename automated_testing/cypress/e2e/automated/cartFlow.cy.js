describe('Shopify Full Product Flow', () => {
  it('Adds it to the cart, and proceeds to checkout', () => {
    
	// Visit the homepage
    cy.visit('https://dev-store-lost-river-press.myshopify.com');
	
	//enter store password
	cy.get('.password-link').click();
	cy.get('[type="password"]').type('yeacuy');
	cy.get('.password-button').click();
	cy.get('#accept-cookies').click();
	
	//home page
	cy.get('.caption-secondary').first().click();
	
	//plp page
	cy.get('.product.item').first().click();
	
	//select product varient
	cy.get('.header-logo').trigger('mouseover');
	
	//pdp page add to cart
	cy.get('.button-addtobag-cta-title').first().click({ force: true });
	
	//select product varient
	cy.get('.header-logo').trigger('mouseover');
	
	//Scroll to the bottom of the page
    cy.scrollTo('bottom');
    cy.wait(2000); // Wait briefly to simulate user behavior

	//cy.get('.variant_li').eq(2).click({ force: true });
	
	//pdp page add to cart
	//cy.get('.button-addtobag-cta-title').first().click({ force: true });
	
	//bag icone mousehover
	//cy.get('.header-item-bag').trigger('mouseover');
	
	//Confirm the redirect to the password page (if applicable)
    cy.visit('/cart');
	
	cy.wait(2000); // Wait briefly to simulate user behavior

	cy.get('.cart-page-increase-quantity').click();
	cy.wait(2000); // Wait briefly to simulate user behavior
	
	cy.get('.cart-page-increase-quantity').click();
	cy.wait(2000); // Wait briefly to simulate user behavior

	cy.get('.cart-page-decrease-quantity').click();
	cy.wait(2000); // Wait briefly to simulate user behavior
	
	cy.get('.cart-page-remove-item').click();

	cy.get('#cart-page-empty-message').click();
	
	//checkout click
	//cy.get('.button.button-orange').click({ force: true });
			
  });
});
