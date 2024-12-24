describe('Shopify Full checkout Flow', () => {
  it('Adds it to the cart, and proceeds to checkout', () => {
    
	// Visit the homepage
        //cy.visit('https://dev-store-lost-river-press.myshopify.com');
	cy.visit('https://staging-lost-river-press.myshopify.com');
	
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
	
	cy.wait(3000); // Wait briefly to simulate user behavior
		
	// Usage in test
	// Interact with Credit Card Iframe
    // Dynamically select iframe and interact with input field
    /*
	cy.get('iframe.card-fields-iframe').then(($iframes) => {
      cy.log(`Number of iframes: ${$iframes.length}`);
      cy.wrap($iframes).each(($iframe, index) => {
        cy.log(`Iframe #${index} src: ${$iframe.attr('src')}`);
      });
    });
	*/
	// Wait for the iframe to load and wrap it with cy.origin
    // Mock the payment API call
	/*
	 cy.get('iframe.card-fields-iframe')
      .wait(10000)
      .then($iframe => {
        const iframe = $iframe.contents()
        const myInput0 = iframe.find('#number')
        //const myInput1 = iframe.find('input:eq(1)')
        //const myInput2 = iframe.find('input:eq(2)')
        const myButton = iframe.find('#checkout-pay-button');

        cy
          .wrap(myInput0)
          .invoke('val', 4242424242424242)
          .trigger('change');
        
        cy.wrap(myButton).click({ force: true });
      });
	  */
    //Click the pay button to trigger the mocked payment
    cy.get('#checkout-pay-button').click();

    // Wait for the mocked payment response and verify it
    //credit card method
	//cy.get('#number').click();
	//cy.get('#number').type('4242424242424242').trigger('keydown', { keyCode: 9, which: 9 });
	
	//cy.get('#expiry').click().type('12/28').trigger('keydown', { keyCode: 9, which: 9 });
	//cy.get('#verification_value').click().type('123').trigger('keydown', { keyCode: 9, which: 9 });
	//cy.get('#verification_value').click().type('lr developer testing').trigger('keydown', { keyCode: 9, which: 9 });
	//cy.get('#checkout-pay-button').click();

	// COD Method
	//cy.get('#basic-paymentOnDelivery').click();
	//cy.get('#checkout-pay-button').should('have.text', 'Complete order.').click({ force: true });	
	//cy.get('#checkout-pay-button').contains('Complete order').click({ force: true });

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
