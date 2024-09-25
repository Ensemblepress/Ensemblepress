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