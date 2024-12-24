describe('Shopify Product Search Flow', () => {
  it('searches for a product', () => {
    
	//visit the homepage
    cy.visit('https://staging-lost-river-press.myshopify.com/');
	
	//enter store password
	//cy.get('.password-link').click();
	//cy.get('[type="password"]').type('ontats');
	//cy.get('.password-button').click();
	cy.get('#accept-cookies').click();
	
	//product search
	cy.get('.header-item-search').click();
	cy.get('.input-search-display').first().type('Letter to my Mother{enter}');
	cy.get('.name-title').first().click();
	cy.get('#li-nav-books').trigger('mouseover');
	cy.get('#HeaderMenu-EmptyDrop-new-arrivals').click();
	
	// product filter
	cy.get('.plp-header-tools-filter-title').click();
	cy.get('.sort_option_input',{ timeout: 10000 }).eq(1).click();
	cy.get('#apply-sort').click();
	cy.scrollTo('top');
	cy.get('.plp-header-tools-filter-title').click();
	cy.get('.sort_option_input',{ timeout: 10000 }).eq(2).click();
	cy.get('#apply-sort').click();
	cy.scrollTo('top');
	cy.get('.plp-header-tools-filter-title').click();
	cy.get('.sort_option_input',{ timeout: 10000 }).eq(3).click();
	cy.get('#apply-sort').click();
	cy.scrollTo('top');
	cy.get('.header-item-brand').first().click();
  });
});
