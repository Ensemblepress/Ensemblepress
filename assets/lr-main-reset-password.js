document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("custom_reset_password");
  const successMessage = document.querySelector(".page-account-forgottpassword-create-success");
  const saveButton = form.querySelector("button[type='submit']");
  const formContainer = document.getElementById("change-password-container");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const newPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password_confirmation").value;
    // Select the input element by its name attribute
    const customer_id = document.querySelector('input[name="id"]').value;
     
    // Error Messesg Updated
    const new_password_error = document.getElementById('new_password_error');  
    const confirm_password_error = document.getElementById('confirm_password_error');
    let isValid = true;
    
    new_password_error.style.display = 'none';
    confirm_password_error.style.display = 'none';
    
    if (!newPassword) {
      new_password_error.textContent = 'Please enter password.';
      new_password_error.style.color = '#c00';
      new_password_error.style.display = 'block';
      document.getElementById('password').style.borderBottom = '1px solid #c00';
      isValid = false;
    }
     
    if (!confirmPassword) {
      confirm_password_error.textContent = 'Please enter confirm password.';
      confirm_password_error.style.color = '#c00';
      confirm_password_error.style.display = 'block';
      document.getElementById('password_confirmation').style.borderBottom = '1px solid #c00';
      isValid = false;
    }
    
    if (newPassword !== confirmPassword) {
      confirm_password_error.textContent = 'Passwords do not match.';
      confirm_password_error.style.color = '#c00';
      confirm_password_error.style.margin = '26px 0';
      confirm_password_error.style.display = 'block';
      return;
    }
    
    // Password validation criteria (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
    var passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
     // Check if password meets criteria
    if (!passwordCriteria.test(newPassword)) {  
      const errorMessageElement = document.querySelector('#pasword_text');    
      errorMessageElement.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.'; // Combined error messages
      errorMessageElement.style.margin = '26px 0';
      errorMessageElement.style.color = '#c00';
      return;
    }
    
 
    fetch(`/admin/api/2023-01/customers/${customer_id}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": ""
        },
        body: JSON.stringify({
          customer: {
            password: newPassword,
            password_confirmation: confirmPassword
          }
        })
      })
        .then(response => {
          if (response.ok) {          
            //formContainer.style.display = "none";
            //successMessage.style.display = "flex";
            window.location.href = '/account';
            // const errorMessageElement = document.querySelector('#pasword_text');
            // errorMessageElement.textContent = 'Your password suceessfull reset. Please go to login page and login'; // Combined error messages
            // errorMessageElement.style.margin = '26px 0';
            // errorMessageElement.style.color = '#28a745';
            
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
        console.log("Error updating customer:", error);
      })
      //console.log('Yor current password is not correct');    
    });
  });


// Add focus event listener to clear error messages and border styles
document.getElementById('password').addEventListener('focus', function() {
  const passwordError = document.getElementById('new_password_error');
  passwordError.style.display = 'none';
  this.style.borderBottom = '1px solid';
});
document.getElementById('password_confirmation').addEventListener('focus', function() {
  const passwordError = document.getElementById('confirm_password_error');
  passwordError.style.display = 'none';
  this.style.borderBottom = '1px solid';
});