document.addEventListener("DOMContentLoaded", function() {
  const variantItems = document.querySelectorAll("#variant-selector .variant_li");
  const pdpInfoHeaders = document.querySelectorAll(".pdp-info-header-secondary");
  const detailsButtons = document.querySelectorAll('.pdp-details');
  const body = document.body;
  // change button action add to cart to out of stock
  var addToCartButton = document.getElementById('add-to-cart-btn');
  var addToCartDiv = document.getElementById('add-to-bag');
  // end 
    
  // Function to show variant content
  function showVariantContent(variantId) { 
    // start change button label add to cart to out of stock
    var selectedVariant = window.product.variants.find(function(variant) {
      return variant.id == variantId;
    });
   var available_variant = selectedVariant.available;
   //console.log(selectedVariant); 
   if (selectedVariant.available == true || selectedVariant.inventory_policy == "continue") {
       //Variant is out of stock but allows selling
        //addToCartButton.innerText = "Pre-order";
        addToCartButton.innerText = "Add to Bag";
        addToCartButton.disabled = false;
        addToCartDiv.removeAttribute('disabled');
  //} else if (selectedVariant.available == true) {
        //addToCartButton.innerText = "Add to Bag";
        //addToCartButton.disabled = false;
        //addToCartDiv.removeAttribute('disabled'); // Remove disabled attribute
   } else {
        addToCartButton.innerText = "Out of Stock";
        addToCartButton.disabled = true;
        addToCartDiv.setAttribute('disabled', 'disabled'); // Add disabled attribute
   }
   // End  button label add to cart to out of stock 
    pdpInfoHeaders.forEach(header => {
      if (header.getAttribute("current_variants_id") === variantId) {
        header.style.display = "block";
      } else {
        header.style.display = "none";
      }
    });
  }
  // Function to set the active variant
  function setActiveVariant(selectedItem) {
    variantItems.forEach(item => item.classList.remove("is-active", "selected"));
    selectedItem.classList.add("is-active", "selected");
    selectedVariantId = selectedItem.getAttribute("data-id");
    showVariantContent(selectedVariantId);
      
    //Get the current URL
    // set current VariantId for browser url 
    var currentUrl = new URL(window.location.href);
    // Set the new variant parameter in the URL
    currentUrl.searchParams.set('variant', selectedVariantId);
    // Update the browser's URL without reloading the page
    window.history.replaceState({}, '', currentUrl);
  }

  // Initialize with the default active variant
  const defaultActiveVariant = document.querySelector("#variant-selector .variant_li.is-active");
  if (defaultActiveVariant) {
    const defaultVariantId = defaultActiveVariant.getAttribute("data-id");
    showVariantContent(defaultVariantId);
  }

  // Attach event listeners for variant selection
  variantItems.forEach(item => {
    item.addEventListener("click", function() {
      setActiveVariant(item);
    });
  });

  // Function to show the cart drawer with animation
  function toggleCartDrawer(variantId) {
    const modal = document.getElementById(`model_id_${variantId}`);
    const modalContent = document.getElementById(`model_contect_id_${variantId}`);
    if (modal && modalContent) {
      modal.style.display = 'block'; // Ensure it's visible
      setTimeout(() => {
        modalContent.classList.remove('ReactModal__Content--before-open');
        modalContent.classList.add('ReactModal__Content--after-open');
        body.classList.add('ReactModal__Body--open');
      }, 6); // Small timeout to trigger the CSS transition
    } else {
      console.warn(`Modal for variant ID ${variantId} not found.`);
    }
  }

  // Attach click event to Details buttons
  detailsButtons.forEach(detailsButton => {
    detailsButton.addEventListener('click', function() {
      if (this.id) {
        const variantId = this.id.split('_').pop(); // Extract the variant ID
        toggleCartDrawer(variantId); // Show cart drawer for the variant
      } else {
        console.error("No 'id' attribute found on this element");
      }
    });
  });

  // Close the cart drawer with animation
  document.querySelectorAll('.overlay-close').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
      const modal = this.closest('.ReactModalPortal');
      const modalContent = this.closest('.ReactModal__Content');
      // Start the close animation
      modalContent.classList.remove('ReactModal__Content--after-open');
      modalContent.classList.add('ReactModal__Content--before-open');
      setTimeout(() => {
        modal.style.display = 'none'; // Hide the modal after animation ends
        body.classList.remove('ReactModal__Body--open');
      }, 800); // Match this duration with the CSS animation duration
    });
  });

  // Close the cart drawer when clicking outside of it (on body)
  document.addEventListener('click', function(event) {
    const modal = document.querySelector('.ReactModalPortal.open'); // Select the open modal
    const modalContent = document.querySelector('.ReactModal__Content.ReactModal__Content--after-open');
    // Check if click is outside the modal content and the modal is open
    if (modal && modalContent && !modalContent.contains(event.target) && !event.target.closest('.pdp-details')) {
      modalContent.classList.remove('ReactModal__Content--after-open');
      modalContent.classList.add('ReactModal__Content--before-open');
      setTimeout(() => {
        modal.style.display = 'none'; // Hide the modal after transition
        body.classList.remove('ReactModal__Body--open');
      }, 800); // Match this duration with the CSS animation duration
    }
  });
});