describe('Shopify Full Cart Flow', () => {
  it('product page check with varient add to cart product', () => {
    
	// Visit the homepage
    cy.visit('https://staging-lost-river-press.myshopify.com/');
	
	//enter store password
	//cy.get('.password-link').click();
	//cy.get('[type="password"]').type('ontats');
	//cy.get('.password-button').click();
	cy.get('#accept-cookies').click();
	
	//home page
	cy.get('.caption-secondary').first().click();
	
	//plp page
	cy.get('.product.item').first().click();
	
	//select product varient
	cy.get('.header-logo').trigger('mouseover');
	
	//mouseover
	cy.get('.pdp-image-set-img').eq(1).trigger('mouseover');
	
	cy.get('.pdp-details-click-auto').first().click();
	
	cy.wait(2000); // Wait briefly to simulate user behavior
	
	cy.get('.overlay-close').first().click();
	
	cy.wait(2000); // Wait briefly to simulate user behavior
	
	//Scroll to the bottom of the page
    cy.scrollTo('bottom');
    cy.wait(2000); // Wait briefly to simulate user behavior

    // Assert that we’re at the bottom by checking scroll position
    cy.window().its('scrollY').should('be.greaterThan', 0);

    //Scroll back to the top of the page
    cy.scrollTo('top');
    cy.wait(5000);

    //Confirm we are back at the top
    cy.window().its('scrollY').should('equal', 0);
	
	//pdp page add to cart
	cy.get('.button-addtobag-cta-title').first().click({ force: true });
	
	cy.wait(2000);

	//Confirm the redirect to the password page (if applicable)
    cy.visit('/cart');
			
  });
});
