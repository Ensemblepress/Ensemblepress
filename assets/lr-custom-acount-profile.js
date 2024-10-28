document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("customer-update-form");    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const firstName = document.getElementById("first_name").value.trim();
        const lastName = document.getElementById("last_name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const salutation = document.getElementById("salutation").value;
        const customer_id = document.getElementById("customer_id").value;
        const currentPassword = document.getElementById("current_password").value.trim();

        // Error message elements
        const first_name_error = document.getElementById('first_name_error');
        const last_name_error = document.getElementById('last_name_error');  
        const email_error = document.getElementById('email_error');
        const phone_error = document.getElementById('phone_error');  
        const current_password_error = document.getElementById('current_password_error');
        // Reset error messages
        first_name_error.style.display = 'none';
        last_name_error.style.display = 'none';
        email_error.style.display = 'none';
        phone_error.style.display = 'none';
        current_password_error.style.display = 'none';        
        let isValid = true; // Flag to track form validity
        // Validate inputs
        if (!firstName) {
            first_name_error.textContent = 'Please enter your first name.';
            first_name_error.style.display = 'block';
            document.getElementById('first_name').style.borderBottom = '1px solid #c00'; // Set error border
            isValid = false;
        }
        if (!lastName) {
            last_name_error.textContent = 'Please enter your last name.';
            last_name_error.style.display = 'block';
            document.getElementById('last_name').style.borderBottom = '1px solid #c00'; // Set error border
            isValid = false;
        }
        if (!email) {
            email_error.textContent = 'Please enter your email.';
            email_error.style.display = 'block';
            document.getElementById('email').style.borderBottom = '1px solid #c00'; // Set error border
            isValid = false;
        }
        if (!phone) {
            phone_error.textContent = 'Please enter your phone number.';
            phone_error.style.display = 'block';
            document.getElementById('phone').style.borderBottom = '1px solid #c00'; // Set error border
            isValid = false;
        }
        if (!currentPassword) {
            current_password_error.textContent = 'Please enter your current password.';
            current_password_error.style.display = 'block';
            document.getElementById('current_password').style.borderBottom = '1px solid #c00'; // Set error border
            isValid = false;
        }
        if (!isValid) return; // Stop if validation fails
        fetch(`/admin/api/2023-01/customers/${customer_id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": "", // Ensure this token is kept secure
            },
            body: JSON.stringify({
                customer: {
                    old_password: currentPassword,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    metafields: [
                        {
                            namespace: "custom",
                            key: "salutation",
                            value: salutation,
                            type: "single_line_text_field",
                        },
                        {
                            namespace: "custom",
                            key: "phone",
                            value: phone,
                            type: "single_line_text_field",
                        },
                    ],
                },
            }),
        })
        .then((response) => {
            if (response.ok) {
                window.location.href = "/account?updated";
            } else {
                return response.json().then((data) => {
                    if (data.errors) {
                        current_password_error.textContent = data.errors.map(error => error.message).join(', ');
                        current_password_error.style.display = 'block';
                    } else {
                        throw new Error("Unknown error occurred");
                    }
                });
            }
        })
        .catch((error) => console.error("Error updating customer:", error));
    });
    // Add focus event listener to clear error messages and border styles
    const inputs = ['salutation','first_name', 'last_name', 'email', 'phone', 'current_password'];
    inputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener('focus', function () {
            const errorElement = document.getElementById(`${inputId}_error`);
            errorElement.style.display = 'none'; // Hide error message
            this.style.borderBottom = '1px solid'; // Remove error border
        });
    });
});