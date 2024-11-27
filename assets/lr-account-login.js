// Toggle Password Visibility
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#CustomerPassword');
togglePassword.addEventListener('click', function () {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
});

// Login start 
const loginForm = document.querySelector('form[action="/account/login"]');
const emailInput = document.getElementById('CustomerEmail');
const passwordInput = document.getElementById('CustomerPassword');
const emailError = document.getElementById('customer-email-error');
const passwordError = document.getElementById('customer-password-error');

// Handle form submission
loginForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default submission if validation fails

  // Reset error states
  emailError.style.display = 'none';
  passwordError.style.display = 'none';
  emailInput.style.borderBottom = '1px solid';
  passwordInput.style.borderBottom = '1px solid';

  let isValid = true;
  const email = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // Email validation
  if (!email) {
    emailError.textContent = 'Please enter your email.';
    emailError.style.display = 'block';
    emailInput.style.borderBottom = '1px solid #c00';
    isValid = false;
  }

  // Password validation
  if (!passwordValue) {
    passwordError.textContent = 'Please enter your password.';
    passwordError.style.display = 'block';
    passwordInput.style.borderBottom = '1px solid #c00';
    isValid = false;
  }

  // If validation fails, stop further processing
  if (!isValid) return;

  // Submit login request via fetch
  fetch('/account/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'customer[email]': email,
      'customer[password]': passwordValue
    })
  })
    .then(response => {

      if (response.url.includes('login')) {
        console.log('Login failed: Redirected back to the login page.');
        passwordError.textContent = 'Invalid login credentials. Please try again.';
        passwordError.style.display = 'block';
      } else {
        console.log('Login successful:', response.url);
        window.location.href = response.url; // Redirect to the account page
      }
    })
    .catch(() => {
      emailError.textContent = 'An unexpected error occurred. Please try again.';
      emailError.style.display = 'block';
    });
});

// Clear error messages on focus
emailInput.addEventListener('focus', function () {
  emailError.style.display = 'none';
  emailInput.style.borderBottom = '1px solid';
});

passwordInput.addEventListener('focus', function () {
  passwordError.style.display = 'none';
  passwordInput.style.borderBottom = '1px solid';
});

// Login End

// Forgot Password Form Toggle
document.getElementById('show-recover-form').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('forgot-password-form').style.display = 'flex';
  document.querySelectorAll('.widget-dts-text').forEach(element => {
    element.textContent = 'Forgot Password';
  });
  document.getElementById('success-message').style.display = 'none';
});

// Forgot Password Form Submission
document.getElementById('forgot-password-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const recoverEmailInput = document.getElementById('RecoverEmail');
  const recoverEmail = recoverEmailInput.value.trim();
  const errorMessageElement = document.getElementById('reset_email');
  const successMessageElement = document.getElementById('success-message');
  errorMessageElement.style.display = 'none';
  successMessageElement.style.display = 'none';
  recoverEmailInput.style.borderBottom = '1px solid #c00';
  if (!recoverEmail) {
    errorMessageElement.textContent = 'Please enter your email address.';
    errorMessageElement.style.display = 'flex';
    recoverEmailInput.style.borderBottom = '1px solid #c00'; // Add border style for error
    return;
  }
  fetch('/account/recover', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'form_type': 'recover_customer_password',
      'email': recoverEmail
    })
  })
  .then(response => {
    if (response.ok) {
      successMessageElement.style.display = 'flex';
      document.getElementById('forgot-password-form').style.display = 'none';
    } else {
      errorMessageElement.textContent = 'There was an error processing your request. Please try again.';
      errorMessageElement.style.display = 'flex';
      recoverEmailInput.style.borderBottom = '1px solid #c00'; // Highlight on error
    }
  });
});
// Add focus event listener to the input field
document.getElementById('RecoverEmail').addEventListener('focus', function() {
  const errorMessageElement = document.getElementById('reset_email');
  errorMessageElement.style.display = 'none'; // Hide error message
  this.style.borderBottom = '1px solid'; // Remove border-bottom style
});
