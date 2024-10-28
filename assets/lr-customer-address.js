// Show the 'Add Address' form when the button is clicked
document.getElementById('new-address').addEventListener('click', function() {
  const addAddressForm = document.getElementById('AddAddress');
  const editForms = document.querySelectorAll('.page-account-edit-addressbook-detail');
  // Hide all edit forms before showing the add new address form
  editForms.forEach(form => form.style.display = 'none');
  // Toggle the add address form visibility
  addAddressForm.style.display = addAddressForm.style.display === 'flex' ? 'none' : 'flex';
  document.querySelector('.page-account.page-account-addressbook').style.display = 'none';
});

// Handle the address removal with a confirmation prompt
document.querySelectorAll('.do_removeaddress').forEach(button => {
  button.addEventListener('click', function() {
    const addressId = this.getAttribute('data-address-id');
    const confirmationMessage = this.getAttribute('data-confirm-message');
    // Confirm deletion
    if (confirm(confirmationMessage)) {
      // Create a form dynamically to delete the address
      const form = document.createElement('form');
      form.action = '/account/addresses/' + addressId; // Shopify DELETE URL structure
      form.method = 'POST';
      form.innerHTML = '<input type="hidden" name="_method" value="DELETE">';
      document.body.appendChild(form);
      form.submit();
    }
  });
});

// New Address page Start
document.getElementById('newaddress_data').addEventListener('click', function() {
  const newAddressForm = document.querySelector('#AddAddress form');
  if (newAddressForm) {
    newAddressForm.submit();  // Explicitly submit the form
  }
});


document.getElementById("newaddress_data").addEventListener("click", function(event) {
  // Temporarily remove the preventDefault() method
  document.querySelector('form').submit();
});
// New Address page End

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

// Handle address form submission on Save button click
document.querySelectorAll('.save-address').forEach(saveButton => {
  saveButton.addEventListener('click', function () {
    const addressId = this.getAttribute('data-address-id');
    const form = document.querySelector(`.site-system[data-address-id="${addressId}"] form`);

    if (form) {
      console.log('Submitting form for address ID:', addressId);
      form.submit();  // Submit the form

      // After submission, show the main address book again
      mainAddressBook.style.display = 'block';
    } else {
      console.error('Form not found for address ID:', addressId);
    }
  });
});
// Toggle visibility for editing the address End

// Ensure only one shipping or billing address is selected
document.querySelectorAll('.checkbox-single').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    const addressType = this.getAttribute('data-type');
    // Deselect other checkboxes of the same type (shipping or billing)
    document.querySelectorAll(`.checkbox-single[data-type="${addressType}"]`).forEach(cb => {
      if (cb !== this) {
        cb.checked = false; // Uncheck the other checkboxes
      }
    });
  });
});
