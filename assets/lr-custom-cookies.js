document.addEventListener('DOMContentLoaded', function() {
    // Show the cookie popup
    const custom_cookies = document.getElementById("custom_cookies").value;
    const customer_id = document.getElementById("customer_id").value;
    
    var cookiePopup = document.getElementById('cookie-consent-popup');
    // Check if user already made a choice
    if (getCookie('cookieConsent') || getCookie('cookiePreferences')) {
        cookiePopup.style.display = 'none';
    }
  
    // Check if the user has already made a choice before displaying the popup
    if( custom_cookies == 1 && customer_id != ""){
	 if (!getCookie('cookieConsent') && !getCookie('cookiePreferences')) {
        cookiePopup.style.display = 'none';
     }
    }else{
	 if (!getCookie('cookieConsent') && !getCookie('cookiePreferences')) {
        cookiePopup.style.display = 'block';
	 }
    }
  
    // Close popup event
    document.getElementById('close-popup').addEventListener('click', function() {
        cookiePopup.style.display = 'none';
    });

    // Accept cookies event
    document.getElementById('accept-cookies').addEventListener('click', function() {
        setCookie('cookieConsent', 'accepted', 365);
        cookiePopup.style.display = 'none';
        saveToCustomerMetafields(consentValue = 1);
    });

    // Decline cookies event
    document.getElementById('decline-cookies').addEventListener('click', function() {
        setCookie('cookieConsent', 'declined', 365);
        cookiePopup.style.display = 'none';
        saveToCustomerMetafields(consentValue = 1);
    });

    // Manage preferences event
    document.getElementById('manage-preferences').addEventListener('click', function() {
        var modal = document.getElementById('cookie-consent-popup');
        modal.style.display = 'block';
    });

    // Close preferences modal
    document.getElementById('close-popup').addEventListener('click', function() {
        var modal = document.getElementById('cookie-consent-popup');
        modal.style.display = 'none';
    });

    // Handle preferences form submission cookie-personalization

    document.addEventListener('DOMContentLoaded', function() {
      document.addEventListener('click', function(event) {
          if (event.target) {
              if (event.target.id === 'cookie-personalization') {
                  toggleCheckbox('cookie-personalization');
              } else if (event.target.id === 'cookie-marketing') {
                  toggleCheckbox('cookie-marketing');
              } else if (event.target.id === 'cookie-analytics') {
                  toggleCheckbox('cookie-analytics');
              }
          }
      });
  
      // Function to toggle checkbox state
      function toggleCheckbox(id) {
          const checkbox = document.getElementById(id);
          if (checkbox) {
              checkbox.checked = !checkbox.checked;
          } else {
              //console.error(`Checkbox with ID "${id}" not found.`);
          }
      }
  });

  
    document.addEventListener('click', function(event) {
     // Attach a submit event handler to the newly added form
     if (event.target && event.target.id === 'save_my_choices') {
        // Prevent the default form submission
        event.preventDefault();
        var form = document.getElementById('preferences-form');
        var formData = new FormData(form);
        //console.log(formData);
        var preferences = {};
        formData.forEach(function(value, key) {
            preferences[key] = value;
        });

        // Manually add unchecked checkboxes
        var checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            preferences[checkbox.id] = checkbox.checked;
        });
        //console.log('Saved Preferences:', preferences);

      // Set cookie (make sure to define setCookie function)
      setCookie('cookiePreferences', JSON.stringify(preferences), 365);
      var modal = document.getElementById('cookie-consent-popup');
      modal.style.display = 'none';
      cookiePopup.style.display = 'none';
      saveToCustomerMetafields(consentValue = 1); 
      }

     // click on accept-all
     if (event.target && event.target.id === 'accept-all') {
       // Prevent the default form submission
        event.preventDefault();
        const checkboxes = document.querySelectorAll('.cookie-preferences');
        var preferences = {};
        checkboxes.forEach(function(checkbox) {
          checkbox.checked = true;
          preferences[checkbox.id] = checkbox.checked;
        });
       //console.log('Saved Preferences:', preferences);

       // Set cookie (make sure to define setCookie function)
       setCookie('cookiePreferences', JSON.stringify(preferences), 365);
       var modal = document.getElementById('cookie-consent-popup');
       modal.style.display = 'none';
       cookiePopup.style.display = 'none';
       saveToCustomerMetafields(consentValue = 1); 
     }

     // click on decline-all
     if (event.target && event.target.id === 'decline-all') {
        // Prevent the default form submission
        event.preventDefault();
        const checkboxes = document.querySelectorAll('.cookie-preferences');
        var preferences = {};
        checkboxes.forEach(function(checkbox) {
          checkbox.checked = false;
          preferences[checkbox.id] = checkbox.checked;
        });
       //console.log('Saved Preferences:', preferences);

       // Set cookie (make sure to define setCookie function)
       setCookie('cookiePreferences', JSON.stringify(preferences), 365);
       var modal = document.getElementById('cookie-consent-popup');
       modal.style.display = 'none';
       cookiePopup.style.display = 'none';
       saveToCustomerMetafields(consentValue = 1);
     }
  }); 
   
    // Set cookie function
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Check cookie function
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

function saveToCustomerMetafields(consentValue = 1) {
 //alert(customer_id);      	
 fetch(`/admin/api/2023-01/customers/${customer_id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": "", // Ensure this token is kept secure
            },
            body: JSON.stringify({
                customer: {
                    metafields: [
                        {
                            namespace: "custom",
                            key: "custom_cookies",
                            value: "1",
                            type: "single_line_text_field",
                        },
                    ],
                },
            }),
        })
        .then((response) => {
            if (response.ok) {
                window.location.href = "/account";
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
 }  
});