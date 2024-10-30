// password hide and show start
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#CustomerPassword');
    togglePassword.addEventListener('click', function (e) {
      const type = password.getAttribute('type') === 'password' ? 'email' : 'password';
      password.setAttribute('type', type);
  });
// password hide and show End

// Forget password Click hide and show Start
  document.getElementById('show-recover-form').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('login-form').style.display = 'none';    
  // Change account text to "Forgot Password"
  const accountTextElements = document.querySelectorAll('.widget-dts-text');
    accountTextElements.forEach(function(element) {
        element.textContent = 'Forgot Password';
    });
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'flex';
  });
// Forget password Click hide and show End 

// this customer email sent Start 
document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  var email = document.getElementById('RecoverEmail').value;
  fetch('/account/recover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // Form data must be sent in URL-encoded format
    },
    body: new URLSearchParams({
      'form_type': 'recover_customer_password',
      'email': email
    })
  })
  .then(function(response) {
    if (response.ok) {
      document.getElementById('success-message').style.display = 'flex';
      document.getElementById('forgot-password-form').style.display = 'none';
      document.getElementById('error-message').style.display = 'none';
    } else {
      document.getElementById('success-message').style.display = 'none';
      document.getElementById('error-message').style.display = 'flex';
    }
  })
});
// this customer email sent End