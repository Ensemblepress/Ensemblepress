document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("change-password-form");
  const successMessage = document.querySelector(".page-account-forgottpassword-create-success");
  const saveButton = form.querySelector("button[type='submit']");
  const formContainer = document.getElementById("change-password-container");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const customer_id = document.getElementById("customer_id").value;
    const accountTextElements = document.querySelectorAll('.widget-dts-text');
    const customer_email_id = document.getElementById("customer_email_id").value;

    // Error Messesg Updated
    const current_password_error = document.getElementById('current_password_error');
    const new_password_error = document.getElementById('new_password_error');  
    const confirm_password_error = document.getElementById('confirm_password_error');
    let isValid = true;
    
    current_password_error.style.display = 'none';
    new_password_error.style.display = 'none';
    confirm_password_error.style.display = 'none';

    if (!currentPassword) {
      current_password_error.textContent = 'Please confirm your current password.';
      current_password_error.style.display = 'block';
      document.getElementById('current-password').style.borderBottom = '1px solid #c00';
      isValid = false;
    }
 
    if (!newPassword) {
      new_password_error.textContent = 'Please confirm your new password.';
      new_password_error.style.display = 'block';
      document.getElementById('new-password').style.borderBottom = '1px solid #c00';
      isValid = false;
    }

    if (currentPassword == newPassword) {

      confirm_password_error.textContent = 'Your new password cannot be the same as your current password. Please choose a different password.';
      confirm_password_error.style.display = 'block';
      document.getElementById('confirm-password').style.borderBottom = '1px solid #c00';
      isValid = false;
      return;
    }
    
    if (!confirmPassword) {
      confirm_password_error.textContent = 'Please confirm your Confirm new password.';
      confirm_password_error.style.display = 'block';
      document.getElementById('confirm-password').style.borderBottom = '1px solid #c00';
      isValid = false;
    }
  
    // Password validation criteria (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
    var passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
     // Check if password meets criteria
    var pass_error = "";
    if (!passwordCriteria.test(newPassword)) {  
      pass_error = 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.';
      const errorMessageElement = document.querySelector('#pasword_text');    
      errorMessageElement.textContent = `${pass_error} ${config_pass_error}`; // Combined error messages
      errorMessageElement.style.margin = '26px 0';
      errorMessageElement.style.color = '#c00';
      return;
    }
    var config_pass_error = "";
    if (newPassword !== confirmPassword) {
      const pass_error = 'Passwords do not match.';
      const errorMessageElement = document.querySelector('#error');
      errorMessageElement.textContent = `${pass_error} ${config_pass_error}`;
      errorMessageElement.style.color = '#c00';
      errorMessageElement.style.margin = '26px 0';
      errorMessageElement.style.display = 'block';
      return;
    }
 
   // Submit login request via fetch
    fetch('/account/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'customer[email]': customer_email_id,
        'customer[password]': currentPassword
      })
    })
    .then(response => {
      if (response.url.includes('login')) {
         //console.log('Old password is not correct');
         current_password_error.textContent = 'Yor current password is not correct.';
         current_password_error.style.display = 'flex';
      }else{
        
      fetch(`/admin/api/2023-01/customers/${customer_id}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": ""
        },
        body: JSON.stringify({
          customer: {
            old_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword
          }
        })
      })
        .then(response => {
          if (response.ok) {          
            formContainer.style.display = "none";
            successMessage.style.display = "flex";
            accountTextElements.forEach(function(element) {
                element.textContent = 'New Password';
            });         
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
          }else {
            return response.json().then(data => {
              console.error("Error:", data.errors);
            });
          }
        })
        .catch(error => {
        console.error("Error updating customer:", error);
      })
      //console.log('Yor current password is not correct');  
      }
    });
  });
});

// Add focus event listener to clear error messages and border styles
document.getElementById('current-password').addEventListener('focus', function() {
  const emailError = document.getElementById('current_password_error');
  emailError.style.display = 'none';
  this.style.borderBottom = '1px solid';
});
document.getElementById('new-password').addEventListener('focus', function() {
  const passwordError = document.getElementById('new_password_error');
  passwordError.style.display = 'none';
  this.style.borderBottom = '1px solid';
});
document.getElementById('confirm-password').addEventListener('focus', function() {
  const passwordError = document.getElementById('confirm_password_error');
  passwordError.style.display = 'none';
  this.style.borderBottom = '1px solid';
});
// Eye Password Start
document.addEventListener("DOMContentLoaded", function () {
  const visibilityToggles = document.querySelectorAll('.toggle_password_visibility');
  visibilityToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const inputField = document.getElementById(targetId);
      if (inputField.type === 'password') {
        inputField.type = 'text';
        this.classList.add('visible');
      } else {
        inputField.type = 'password'; 
        this.classList.remove('visible');
      }
    });
  });
});
// Eye Password End