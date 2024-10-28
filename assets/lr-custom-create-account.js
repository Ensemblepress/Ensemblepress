document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Retrieve input values and state
  const salutation = document.getElementById('salutation').value;
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const newsletter = document.getElementById('newsletter').checked;
  const terms = document.getElementById('terms').checked;

  const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let isValid = true; // Track form validity

  // Clear previous errors
  document.querySelector('#error').textContent = '';
  document.querySelector('#error_required').textContent = '';

  // Helper functions
  function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    inputElement.style.border = '2px solid red'; // Add red border
    const errorElement = document.querySelector(`#${inputId}-error`);
    errorElement.textContent = message; // Display error message
    isValid = false;
  }

  function clearError(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.style.border = ''; // Clear border
    const errorElement = document.querySelector(`#${inputId}-error`);
    errorElement.textContent = ''; // Clear error message
  }

  // Add event listeners to clear errors on interaction
  ['firstName', 'lastName', 'email', 'password', 'confirmPassword'].forEach((id) => {
    const inputElement = document.getElementById(id);
    inputElement.addEventListener('focus', () => clearError(id)); // Clear error on focus
    inputElement.addEventListener('input', () => clearError(id)); // Clear error on input
  });

  // Validate First Name (Mandatory)
  if (!firstName) {
    showError('firstName', 'First name is required.');
  }

  // Validate Last Name (Mandatory)
  if (!lastName) {
    showError('lastName', 'Last name is required.');
  }

  // Validate Email
  if (!email) {
    showError('email', 'Email address is required.');
  }

  // Validate Password
  if (!password) {
    showError('password', 'Password is required.');
  }

  // Validate Confirm Password
  if (!confirmPassword) {
    showError('confirmPassword', 'Confirm password is required.');
  }

  // Password Criteria Check
  if (password && !passwordCriteria.test(password)) {
    document.querySelector('#error').textContent =
      'Password must contain at least one uppercase, one lowercase, one number, one special character, and be at least 8 characters long.';
    isValid = false;
  }

  // Password Match Check
  if (password !== confirmPassword) {
    document.querySelector('#error').textContent +=
      ' Passwords do not match.';
    isValid = false;
  }

  // Terms Acceptance Check
  if (!terms) {
    document.querySelector('#error').textContent +=
      ' You must accept the terms and conditions.';
    isValid = false;
  }

  // Stop form submission if validation fails
  if (!isValid) return;

  // Submit form data (Simulate sending to Shopify API)
  fetch('/account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        accepts_marketing: newsletter,
        metafields: [
          {
            namespace: 'custom',
            key: 'salutation',
            value: salutation,
            type: 'single_line_text_field',
          },
        ],
      },
    }),
  })
    .then((response) => {
      console.log(response); // Log response for debugging
      if (response.ok) {
        document.querySelector('#sucess').textContent =
          'Account created successfully!';
        document.getElementById('page-account-register-form').style.display = 'none';
        document.getElementById('page-account-register-success').style.display = 'flex';
      } else {
        document.querySelector('#error').textContent =
          'There was an error. Please try again.';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      document.querySelector('#error').textContent =
        'There was an error. Please try again.';
    });
});