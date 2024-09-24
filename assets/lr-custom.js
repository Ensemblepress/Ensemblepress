// Home page Newlatter
$(document).ready(function() {
  var $list = $('.form-field button.button-next');
  $list.on('click', function(ev) {
    var $elements = $(".widget-newsletter-strip");    
    if ($elements.length > 0) {
      var $element = $elements.eq(0);
      $element.addClass("is-active is-focus");      
      $('#fiels_row_1').addClass('is-on');
      $('#fiels_row_2').addClass('is-on');      
      console.log($element[0]);  // Use $element[0] to get the DOM element
    } else {
      alert('No elements found with the class "widget-newsletter-strip"');
    }
  });
});
// end

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
    document.body.style.overflowY = 'hidden';
    
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




// Cart Drawer Open Mobile Menu Start 
$(document).ready(function() {
  var $list = $('.header-mobile ul.header-mobile-icons li.header-mobile-icon-bag');

  $list.on('click', function(ev) {
    var $elements = $(".header-close-button");

    if ($elements.length > 0) {
      var $element = $elements.eq(0);
      $element.addClass("is-on");

      $('.header-mobile').addClass('is-off');
      $('#nav-bag').addClass('is-on-mobile');
      console.log($element[0]);

      $('.header-background').addClass('is-on');
    } else {
      alert('No elements found with the class "header-close-button".');
    }
  });
});

// Close Icon
var elements = document.querySelectorAll('.header-close-button');
elements.forEach(function(element) {
  element.addEventListener('click', function(ev) {
    if (elements.length > 0) {
      element.classList.remove("is-on"); 
      const element_a = document.querySelector('.header-mobile');
      if (element_a) {
        element_a.classList.remove('is-off');
      }
      const element_b = document.getElementById('nav-bag');
      if (element_b) {
        element_b.classList.remove('is-on-mobile');
      }
      const element_c = document.querySelector('.header-background');
      if (element_c) {
        element_c.classList.remove('is-on');
      }
      console.log(element);    
    } else {
      alert('No elements found with the class "header-close-button"');
    }
  });
});

// End