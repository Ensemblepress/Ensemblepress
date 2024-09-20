document.addEventListener("DOMContentLoaded", function() {
  // Selectors
  const variantItems = document.querySelectorAll("#variant-selector .variant_li");
  const pdpInfoHeaders = document.querySelectorAll(".pdp-info-header-secondary");
  const cartDrawer = document.querySelector('.ReactModalPortal');
  const menu = document.querySelector('body.product #menu .header-secondary');
  const detailsButtons = document.querySelectorAll('.pdp-details');
  const portal = document.querySelector('.ReactModalPortal');
  const content = document.querySelector('.ReactModal__Content');

  // Function to show the content for the selected variant and hide others
  function showVariantContent(variantId) {
    pdpInfoHeaders.forEach(header => {
      if (header.getAttribute("current_variants_id") === variantId) {
        header.style.display = "block";
      } else {
        header.style.display = "none";
      }
    });
  }

  // Function to set the active class and show correct content
  function setActiveVariant(selectedItem) {
    // Remove "is-active" and "selected" from all variants
    variantItems.forEach(item => item.classList.remove("is-active", "selected"));
    // Add "is-active" and "selected" to the clicked/selected variant
    selectedItem.classList.add("is-active", "selected");
    const selectedVariantId = selectedItem.getAttribute("data-id");
    showVariantContent(selectedVariantId);
  }

  // Initialize: Show the content for the default active variant
  const defaultActiveVariant = document.querySelector("#variant-selector .variant_li.is-active");
  if (defaultActiveVariant) {
    const defaultVariantId = defaultActiveVariant.getAttribute("data-id");
    showVariantContent(defaultVariantId);
  }

  // Add click event listener to each variant
  variantItems.forEach(item => {
    item.addEventListener("click", function() {
      setActiveVariant(item);
    });
  });

  // Function to show cart drawer and hide menu
  function toggleCartDrawer(variantId) {
    if (cartDrawer) {
      const modal = document.getElementById(`model_id_${variantId}`);
      const modal_content = document.getElementById(`model_contect_id_${variantId}`);
      const body = document.body;
      if (modal) {
          // Open the modal by changing display and adding necessary classes
          modal.style.display = 'block';
          modal.classList.add('open'); // Assuming there's an 'open' class for animations or visibility
          body.classList.add('is-pdp', 'ReactModal__Body--open');
          modal.classList.remove("ReactModal__Overlay--before-open");
          modal.classList.add("ReactModal__Overlay--after-open");
          modal_content.classList.remove('ReactModal__Content--before-open');
          modal_content.classList.add('ReactModal__Content--after-open');
            
          $('.header-secondary').hide();
          $('body').css('overflowY', 'hidden'); // Show the vertical scroll bar
      } else {
          console.warn(`Modal for variant ID ${variantId} not found.`);
      }
    }
  }
  // Attach event listener to the Details buttons
  detailsButtons.forEach(detailsButton => {
    detailsButton.addEventListener('click', function() {
    if (this.id) {
       const variantId = this.id.split('_').pop(); // Extract the variant ID from the 'id' attribute            
      // Call your function to open the corresponding modal or cart drawer
      toggleCartDrawer(variantId); // Pass the variant ID to toggleCartDrawer function
    } else {
        console.error("No 'id' attribute found on this element");
    }
  });
});
  
  $('.overlay-pdp .overlay-close').on('click', function() {
    var $cartDrawer = $('.ReactModalPortal');
    $cartDrawer.removeClass('open');
    $cartDrawer.css('display', 'none');
    $('body').css('overflowY', 'visible'); // Show the vertical scroll bar
    portal.classList.remove("ReactModal__Overlay--after-open");
    portal.classList.add("ReactModal__Overlay--before-open");
    content.classList.remove('ReactModal__Content--after-open');
    content.classList.add('ReactModal__Content--before-open');
    $('.header-secondary').show();
     
  });
});
