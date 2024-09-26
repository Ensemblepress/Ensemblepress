// Event listener to open the Sort by filter 
document.addEventListener('DOMContentLoaded', function() {
  // State management
  let isModalOpen = false;

  // Function to open the modal
  function openFiltersPLPModal() {
    const modal = document.getElementById('sort_by_filter');

    // Show modal before triggering the animation
    modal.style.display = 'block';

    // Trigger a reflow to make sure the transition is applied
    modal.offsetHeight;

    // Add the necessary classes for open animation
    document.body.classList.add('ReactModal__Body--open');
    //document.body.style.overflowY = 'hidden';
    
    // Add classes for animation
    modal.classList.remove('ReactModal__Overlay--before-open');
    modal.classList.add('ReactModal__Overlay--after-open');
    
    const content = modal.querySelector('.ReactModal__Content');
    content.classList.remove('ReactModal__Content--before-open');
    content.classList.add('ReactModal__Content--after-open');

    isModalOpen = true;
  }

  // Function to close the modal
  function closeFiltersPLPModal() {
    const modal = document.getElementById('sort_by_filter');
    const content = modal.querySelector('.ReactModal__Content');

    // Add classes for the close animation
    modal.classList.remove('ReactModal__Overlay--after-open');
    modal.classList.add('ReactModal__Overlay--before-open');
    
    content.classList.remove('ReactModal__Content--after-open');
    content.classList.add('ReactModal__Content--before-open');

    // Wait for the CSS transition to finish before hiding the modal
    setTimeout(function() {
      modal.style.display = 'none';
      document.body.classList.remove('ReactModal__Body--open');
      document.body.style.overflowY = '';
      isModalOpen = false;
    }, 300); // Match this timeout with your CSS transition duration (e.g., 300ms)
  }

  // Add event listeners for modal open/close
  document.getElementById('sortButton').addEventListener('click', openFiltersPLPModal);
  document.getElementById('closeModal').addEventListener('click', closeFiltersPLPModal);

  // Optional: Close modal when clicking outside (overlay click)
  document.getElementById('sort_by_filter').addEventListener('click', function(event) {
    if (event.target === document.getElementById('sort_by_filter')) {
      closeFiltersPLPModal();
    }
  });
});

// Sort Filter Start Work

document.addEventListener("DOMContentLoaded", function() {
  const sortRadios = document.querySelectorAll('input[name="sort"]');
  const applyButton = document.getElementById('apply-sort');
  const clearButton = document.getElementById('clear-sort');
  const productList = document.getElementById('product-list');
  let products = Array.from(document.querySelectorAll('.product')); // Capture the initial product list

  // Store the original product order
  const originalProducts = [...products];

  function sortProducts(sortValue) {
    let sortedProducts;

    switch (sortValue) {
      case 'az':
        sortedProducts = products.sort((a, b) => {
          const nameA = a.dataset.name || '';
          const nameB = b.dataset.name || '';
          return nameA.localeCompare(nameB);
        });
        break;
      case 'za':
        sortedProducts = products.sort((a, b) => {
          const nameA = a.dataset.name || '';
          const nameB = b.dataset.name || '';
          return nameB.localeCompare(nameA);
        });
        break;
      case 'lowprice':
        sortedProducts = products.sort((a, b) => {
          const priceA = parseFloat(a.dataset.price) || 0;
          const priceB = parseFloat(b.dataset.price) || 0;
          return priceA - priceB;
        });
        break;
      case 'highprice':
        sortedProducts = products.sort((a, b) => {
          const priceA = parseFloat(a.dataset.price) || 0;
          const priceB = parseFloat(b.dataset.price) || 0;
          return priceB - priceA;
        });
        break;
      case 'oldnew':
        sortedProducts = products.sort((a, b) => {
          const dateA = new Date(a.dataset.date) || new Date(0);
          const dateB = new Date(b.dataset.date) || new Date(0);
          return dateA - dateB;
        });
        break;
      case 'newold':
        sortedProducts = products.sort((a, b) => {
          const dateA = new Date(a.dataset.date) || new Date(0);
          const dateB = new Date(b.dataset.date) || new Date(0);
          return dateB - dateA;
        });
        break;
      case 'instock':
        sortedProducts = products.filter(product => {
          const quantity = parseInt(product.dataset.quantity) || 0;
          return quantity > 0;
        });
        break;
      default:
        sortedProducts = originalProducts; // Reset to original product order when 'default' is selected
        break;
    }

    // Clear and append sorted/filtered products
    productList.innerHTML = '';
    sortedProducts.forEach(product => productList.appendChild(product));
  }

  // Apply sort when Apply button is clicked
  applyButton.addEventListener('click', function() {
    const selectedSort = document.querySelector('input[name="sort"]:checked').value;
    sortProducts(selectedSort);
    const element = document.getElementById('sort_by_filter');
    element.style.display='none';
    jQuery('body').css('overflow-y', 'visible');
  });

  // Reset products to default state when Clear button is clicked
  clearButton.addEventListener('click', function() {
    document.querySelectorAll('input[name="sort"]').forEach(radio => radio.checked = false); // Uncheck all radio buttons
    products = [...originalProducts]; // Reset the product array to the original products
    sortProducts(); // Re-render the original product order
  });
});

$(document).on("click", function(e) {
  if ($(e.target).is(".ReactModal__Content, .plp-header-tools-filter-title ,.plp-header-secondary, .plp-header-tools-filter-sort, .filter-panel, .filter-option, .overlay-outer-title, .filter-selector, .sort_option, .sort_option_input") === false) {
    $("#sort_by_filter").hide();
    jQuery('body').css('overflow-y', 'visible');
  }
});

// Sort Filter End Work