document.getElementById('footer-newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // add js 04-08-2024
    var email_req = document.getElementById('footer_email');

    if (!validateEmail(email_req.value)) {
     email_req.setAttribute('required', true);
     email_req.textContent = 'Please fill in this field.';
     //console.log('check validated');
     return false;
    } else {
     //console.log('validated true');
    }
    // end

    //var nwsl_chckbk = $('#nwsl_chckbk').attr('checked', true);
    //Check the objects length propery
    if($("#footer_nwsl_chckbk").is(":checked")){
        //console.log('IS CHECKED');
    } else {
        // $('#footer_fiels_row_1').css("color", "red"); 
        // $('.footer_error_color').css("color", "red"); 
        //console.log('NOT CHECKED');
        return false;
    }
      
    var email = document.getElementById('footer_email').value;
    var tags = document.getElementById('footer_tags').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact#contact_form', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Handle the response
    xhr.onload = function() {
        //var responseMessage = document.getElementById('newsletter-message');
        if (xhr.status >= 200 && xhr.status < 400) {
            // Success!
            $('#footer-signup-cancel').removeClass('is-on');
            $('#footer_fiels_row_0').removeClass('is-on');
            $('#footer_fiels_row_1').removeClass('is-on');
            $('#footer_fiels_row_2').removeClass('is-on');
            $('.footer-newsletter-success').addClass('is-on');
            
            const checkbox = document.getElementById('footer_nwsl_chckbk');
            checkbox.checked = false;

       } else {
            // Error :(
            //responseMessage.textContent = 'There was an error. Please try again.';
            //responseMessage.style.color = 'red';
        }
    };

    // Handle network errors
    xhr.onerror = function() {
        var responseMessage = document.getElementById('newsletter-message');
        responseMessage.textContent = 'Network error. Please try again.';
        //responseMessage.style.color = 'red';
    };

    // Send the data
    var data = 'form_type=customer&utf8=✓&contact[email]=' + encodeURIComponent(email)+
      '&contact[tags]=' + encodeURIComponent(tags);
    xhr.send(data);
});
 
// Function to validate email add js 04-08-2024
function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
// end