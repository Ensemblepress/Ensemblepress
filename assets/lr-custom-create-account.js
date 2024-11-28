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
  const customer_id = document.getElementById("customer_id").value;
  const errorMessageElement = document.getElementById('error');
  const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let isValid = true;

  // Clear previous errors
  document.querySelector('#error').textContent = '';
  document.querySelector('#salutation-error').textContent = '';

  function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    inputElement.style.borderBottom = '1px solid #c00';
    const errorElement = document.querySelector(`#${inputId}-error`);
    errorElement.textContent = message;
    errorElement.classList.add('visible');
    isValid = false;
  }

  function clearError(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.style.border = '';
    const errorElement = document.querySelector(`#${inputId}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
  }

  // Add event listeners to clear errors on interaction
  ['salutation', 'firstName', 'lastName', 'email', 'password', 'confirmPassword', 'terms'].forEach((id) => {
    const inputElement = document.getElementById(id);
    inputElement.addEventListener('change', () => clearError(id));
    inputElement.addEventListener('input', () => clearError(id));
  });

  // Validate Salutation
  if (!salutation) {
    showError('salutation', 'Please select a salutation.');
  }
  if (!firstName) showError('firstName', 'Please enter your first name.');
  if (!lastName) showError('lastName', 'Please enter your last name.');
  if (!email) showError('email', 'Please enter your email.');
  if (!password) showError('password', 'Please enter your Password.');
  else if (!passwordCriteria.test(password)) {
    showError('password', 'Password must contain at least one uppercase, one lowercase, one number, one special character, and be at least 8 characters long.');
  }
  if (!confirmPassword) showError('confirmPassword', 'Please confirm your password.');
  else if (password !== confirmPassword) {
    showError('confirmPassword', 'Passwords do not match.');
  }
  if (!terms) showError('terms', 'You must accept the terms and conditions.');

  if (!isValid) return; // Stop if form is invalid

  // Simulate form submission to Shopify API
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
      if (response.ok) {
        // Hide the register form and show the success message
        //window.location.href = '/account';   
        document.getElementById('page-account-register-form').style.display = 'none';
        document.getElementById('page-account-register-success').style.display = 'flex';
      } else if(response.status === 403){      
        errorMessageElement.textContent = 'You do not have permission to access this resource.';
        errorMessageElement.style.display = 'flex';    
      } else if(response.status === 405){    
        errorMessageElement.textContent = 'Method Not Allowed. Check the HTTP method used.';
        errorMessageElement.style.display = 'flex';
      } else if(response.status === 500){    
        errorMessageElement.textContent = 'Internal Server Error. Retrying...';
        errorMessageElement.style.display = 'flex';    
      } else if(response.status === 502){    
        errorMessageElement.textContent = 'The server is experiencing issues. Please try again later.';
        errorMessageElement.style.display = 'flex';    
      } else if(response.status === 503){
        errorMessageElement.textContent = 'Service Unavailable.';
        errorMessageElement.style.display = 'flex';
      } else if(response.status === 504){    
        errorMessageElement.textContent = 'The server is temporarily unavailable. Please try again later.';
        errorMessageElement.style.display = 'flex';
      } else {
        document.querySelector('#error').textContent =
        'There has been an error while submitting the form. Please try again.';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      document.querySelector('#error').textContent =
        'There has been an error while submitting the form. Please try again.';
    });
});