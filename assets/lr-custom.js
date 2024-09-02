// window.onload = function() {
//   var video = document.getElementById("myVideo");
//   video.autoplay = true;
//   video.muted = true; // This is necessary for autoplay to work in some browsers
//   video.play();
//   // Stop the video after 5 seconds
//   setTimeout(function() {
//     video.pause();
//   }, 5000); // 5000 milliseconds = 5 seconds
// };

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
  $('.plp-header .plp-header-tools-filter').on('click', function() {    
    var $cartDrawer = $('.ReactModalPortal');    
    // Toggle the 'open' class
    $cartDrawer.toggleClass('open');    
    // Toggle the display property
    if ($cartDrawer.css('display') === 'block') {
      $cartDrawer.css('display', 'none');
      $('body').css('overflowY', 'hidden'); // Hide the vertical scroll bar
    } else {
      $cartDrawer.css('display', 'block');
      $('body').css('overflowY', 'hidden'); // Hide the vertical scroll bar
    }
  });
// End

// Event listener to close the cart drawer
$(document).ready(function() {
  $('.overlay .overlay-close').on('click', function() {
    var $cartDrawer = $('.ReactModalPortal');
    
    // Remove the 'open' class and hide the cart drawer
    $cartDrawer.removeClass('open');
    $cartDrawer.css('display', 'none');
    $('body').css('overflowY', 'visible'); // Show the vertical scroll bar
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

