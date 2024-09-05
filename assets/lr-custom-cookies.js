document.addEventListener('DOMContentLoaded', function() {
    // Show the cookie popup
    var cookiePopup = document.getElementById('cookie-consent-popup');
    cookiePopup.style.display = 'block';

    // Close popup event
    document.getElementById('close-popup').addEventListener('click', function() {
        cookiePopup.style.display = 'none';
    });

    // Accept cookies event
    document.getElementById('accept-cookies').addEventListener('click', function() {
        setCookie('cookieConsent', 'accepted', 365);
        cookiePopup.style.display = 'none';
    });

    // Decline cookies event
    document.getElementById('decline-cookies').addEventListener('click', function() {
        setCookie('cookieConsent', 'declined', 365);
        cookiePopup.style.display = 'none';
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
    document.addEventListener('click', function(event) {
      //cookie-personalization click
      if (event.target && event.target.id === 'cookie-personalization') {
        const checkbox = document.getElementById('cookie-personalization');
         // Toggle the checkbox state
        checkbox.checked = !checkbox.checked;  
        if (checkbox.checked) {
            checkbox.checked = true;
            checkbox.removeAttribute('checked');  // Remove the 'checked' attribute
        } else {
            checkbox.checked = false;
            checkbox.setAttribute('checked', 'checked');  // Add the 'checked' attribute
        }
     }
     // end click

      //cookie-marketing click
      if (event.target && event.target.id === 'cookie-marketing') {
        const checkbox = document.getElementById('cookie-marketing');
         // Toggle the checkbox state
        checkbox.checked = !checkbox.checked;  
        if (checkbox.checked) {
            checkbox.checked = true;
            checkbox.removeAttribute('checked');  // Remove the 'checked' attribute
            
        } else {
            checkbox.checked = false;
            checkbox.setAttribute('checked', 'checked');  // Add the 'checked' attribute
        }
     }
     // end click

      //cookie-analytics click
      if (event.target && event.target.id === 'cookie-analytics') {
        const checkbox = document.getElementById('cookie-analytics');
         // Toggle the checkbox state
        checkbox.checked = !checkbox.checked;  
        if (checkbox.checked) {
            checkbox.checked = true;
            checkbox.removeAttribute('checked');  // Remove the 'checked' attribute
            
        } else {
            checkbox.checked = false;
            checkbox.setAttribute('checked', 'checked');  // Add the 'checked' attribute
        }
     }
     // end click

     // Attach a submit event handler to the newly added form
     if (event.target && event.target.id === 'save_my_choices') {
        // Prevent the default form submission
        event.preventDefault();
        var form = document.getElementById('preferences-form');
        var formData = new FormData(form);
        console.log(formData);
        var preferences = {};
        formData.forEach(function(value, key) {
            preferences[key] = value;
        });

        // Manually add unchecked checkboxes
        var checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            preferences[checkbox.id] = checkbox.checked;
        });
        console.log('Saved Preferences:', preferences);

      // Set cookie (make sure to define setCookie function)
      setCookie('cookiePreferences', JSON.stringify(preferences), 365);
      var modal = document.getElementById('cookie-consent-popup');
      modal.style.display = 'none';
      cookiePopup.style.display = 'none';
        
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
       console.log('Saved Preferences:', preferences);

       // Set cookie (make sure to define setCookie function)
       setCookie('cookiePreferences', JSON.stringify(preferences), 365);
       var modal = document.getElementById('cookie-consent-popup');
       modal.style.display = 'none';
       cookiePopup.style.display = 'none';
        
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
       console.log('Saved Preferences:', preferences);

       // Set cookie (make sure to define setCookie function)
       setCookie('cookiePreferences', JSON.stringify(preferences), 365);
       var modal = document.getElementById('cookie-consent-popup');
       modal.style.display = 'none';
       cookiePopup.style.display = 'none';
     
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

    // Check if user already made a choice
    if (getCookie('cookieConsent') || getCookie('cookiePreferences')) {
        cookiePopup.style.display = 'none';
    }
});
