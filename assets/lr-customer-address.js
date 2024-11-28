// Show the 'Add Address' form when the button is clicked
document.getElementById('new-address').addEventListener('click', function() {
  const addAddressForm = document.getElementById('AddAddress');
  const editForms = document.querySelectorAll('.page-account-edit-addressbook-detail');
  editForms.forEach(form => form.style.display = 'none');
  addAddressForm.style.display = addAddressForm.style.display === 'flex' ? 'none' : 'flex';
  document.querySelector('.page-account.page-account-addressbook').style.display = 'none';
});
// ENd
// Show the 'Delete Form' form when the button is clicked
  document.querySelectorAll('.do_removeaddress').forEach(button => {
  button.addEventListener('click', function() {
    const addressId = this.getAttribute('data-address-id'); // Get the address ID
    const confirmationMessage = this.getAttribute('data-confirm-message'); // Get the confirmation message
    
    // Confirm deletion
    if (confirm(confirmationMessage)) {
      // Create a form dynamically to delete the address
      const form = document.createElement('form');
      form.action = '/account/addresses/' + addressId; // Shopify DELETE URL structure
      form.method = 'POST';
      form.innerHTML = '<input type="hidden" name="_method" value="DELETE">'; // Indicate DELETE method
      document.body.appendChild(form); // Append form to body
      form.submit(); // Submit the form
    }
  });
});
//END

// Toggle visibility for editing the address Start
const mainAddressBook = document.querySelector('.page-account.page-account-addressbook');
document.querySelectorAll('.textlink-edit').forEach(button => {
  button.addEventListener('click', function () {
    const addressId = this.getAttribute('data-address-id');
    const editForm = document.getElementById('EditAddress_' + addressId);
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    // Hide all open forms
    document.querySelectorAll('.page-account-edit-addressbook-detail').forEach(form => {
      form.style.display = 'none';
    });

    // If an edit form is being opened, hide the main address book
    if (!isExpanded) {
      mainAddressBook.style.display = 'none';
      editForm.style.display = 'flex'; // Show the selected form
    } else {
      mainAddressBook.style.display = 'block'; // Show the main address book
      editForm.style.display = 'none'; // Hide the form
    }
    // Toggle aria-expanded for accessibility
    this.setAttribute('aria-expanded', !isExpanded);
  });
});


document.querySelectorAll('.save-address').forEach(saveButton => {
  saveButton.addEventListener('click', function () {
    const addressId = this.getAttribute('data-address-id');
    const form = document.querySelector(`.site-system[data-address-id="${addressId}"] form`);
    //console.log(saveButton);
    if (!form) {
      console.error('Form not found for address ID:', addressId);
      return;
    }
    //console.log('Validating form for address ID:', addressId);
    let isValid = true;
    //console.log('adress_id='+addressId);
    
    // Define fields with IDs and error elements dynamically
    const fields = [
      { id: `AddressFirstName_${addressId}`, errorId: `editaddress_firstname_error_${addressId}`, message: 'Please enter your first name.' },
      { id: `AddressLastName_${addressId}`, errorId: `editaddress_lastname_error_${addressId}`, message: 'Please enter your last name.' },
      { id: `AddressAddress1_${addressId}`, errorId: `editaddress_address1_error_${addressId}`, message: 'Please enter your street address.' },
      { id: `AddressAddress2_${addressId}`, errorId: `editaddress_address2_error_${addressId}`, message: 'Please enter your Apt, Suite, Building, Company.' },
      { id: `AddressProvince_${addressId}`, errorId: `editaddress_province_error_${addressId}`, message: 'Please enter your state or province.' },
      { id: `AddressCity_${addressId}`, errorId: `editaddress_city_error_${addressId}`, message: 'Please enter your city.' },
      { id: `AddressZip_${addressId}`, errorId: `editaddress_zip_error_${addressId}`, message: 'Please enter your ZIP code.' },
      { id: `AddressPhone_${addressId}`, errorId: `editaddress_phone_error_${addressId}`, message: 'Please enter your phone number.' }
    ];

    // Loop through each field and validate
    fields.forEach(({ id, errorId, message }) => {
      const input = document.getElementById(id);
      const error = document.getElementById(errorId);
      if (!input) {
        console.error(`Input field with ID ${id} not found.`);
        return;
      }
      // Check if the input is empty
      if (!input.value.trim()) {
        error.innerText = message;
        error.style.display = 'block';
        input.style.borderBottom = '1px solid #c00';
        isValid = false;
      } else {
        error.style.display = 'none';
        input.style.borderBottom = '';
      }

      // Hide error when the user interacts with the field
      input.addEventListener('focus', () => {
        error.style.display = 'none';
        input.style.borderBottom = '';
      });
    });

    if (isValid) {
      //console.log('Submitting form for address ID:', addressId);
      form.submit();  // Submit the form if valid
      document.querySelector('.main-address-book').style.display = 'block';  // Show address book
    } else {
      //console.log('Form validation failed.');
    }
  });
});

// New Address form Here Start
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('new-address-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        let isValid = true; // Track form validity
        // List of input fields to validate
        const fields = [
            { id: 'first_name', errorId: 'first_name_error', message: 'Please enter your first name.' },
            { id: 'last_name', errorId: 'last_name_error', message: 'Please enter your last name.' },
            { id: 'address1', errorId: 'address1_error', message: 'Please enter your street address.' },
            { id: 'address2', errorId: 'address2_error', message: 'Please enter your Apt, Suite, Building, Company' }, // Optional field
            { id: 'country', errorId: 'country_error', message: 'Please enter your country' }, // Optional field
            { id: 'province', errorId: 'province_error', message: 'Please enter your state or province.' },  
            { id: 'city', errorId: 'city_error', message: 'Please enter your city.' },
            { id: 'zip', errorId: 'zip_error', message: 'Please enter your ZIP code.' },
            { id: 'phone', errorId: 'phone_error', message: 'Please enter your phone number.' },
        ];

        // Validate each field
        fields.forEach(({ id, errorId, message }) => {
            const input = document.getElementById(id);
            const error = document.getElementById(errorId);

            if (!input.value.trim()) {
                // Show error message and add red border
                error.innerText = message;
                error.style.display = 'block';
                input.style.borderBottom = '1px solid #c00';
                isValid = false;
            } else {
                // Hide error message and reset border
                error.style.display = 'none';
                input.style.borderBottom = '';
            }
        });

        // If all fields are valid, proceed with AJAX submission
        if (isValid) {
            submitForm();
        }
    });

    // Function to handle AJAX form submission
    function submitForm() {
        const form = document.getElementById('new-address-form');
        const formData = new FormData(form);
        
        const successMessage = document.getElementById('address-form-success');
        const errorMessage = document.getElementById('address-form-error');

        fetch('/account/addresses', {
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            body: formData,
        })
        .then(response => {
            if (response.redirected) {
              window.location.href = response.url; // Handle Shopify redirects            
            } else if (response.ok) {
              successMessage.style.display = 'block';
              errorMessage.style.display = 'none';
              form.reset(); // Reset the form on success
            } else if(response.status === 403){
              errorMessage.innerText = 'You do not have permission to access this resource.';
              errorMessage.style.display = 'flex';            
           } else if(response.status === 405){          
              errorMessage.innerText = 'Method Not Allowed. Check the HTTP method used.';
              errorMessage.style.display = 'flex';            
           } else if(response.status === 500){
              errorMessage.innerText = 'Internal Server Error. Retrying...';
              errorMessage.style.display = 'flex';            
           } else if(response.status === 502){          
              errorMessage.innerText = 'The server is experiencing issues. Please try again later.';
              errorMessage.style.display = 'flex';            
           } else if(response.status === 503){          
              errorMessage.innerText = 'Service Unavailable.';
              errorMessage.style.display = 'flex';            
           } else if(response.status === 504){          
              errorMessage.innerText = 'The server is temporarily unavailable. Please try again later.';
              errorMessage.style.display = 'flex';              
           } else {
              throw new Error('Failed to save address');
           }
     })
     .catch(error => {
            errorMessage.innerText = 'An error occurred. Please try again.';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            console.error('Error:', error);
      });
    }
    // Hide error messages and red border when the user interacts with the input fields
    function hideErrorOnInput() {
        const fields = [
            'first_name', 'last_name', 'address1', 'address2', 
            'country','province', 'city', 'zip', 'phone'
        ];
        fields.forEach(id => {
            const input = document.getElementById(id);
            const error = document.getElementById(`${id}_error`);

            input.addEventListener('input', () => {
                error.style.display = 'none';
                input.style.borderBottom = ''; // Reset the border
            });

            input.addEventListener('focus', () => {
                error.style.display = 'none';
                input.style.borderBottom = ''; // Reset the border
            });
        });
    }
    // Initialize the event listeners to hide errors on input
    hideErrorOnInput();
});

// New Address form Here ENd