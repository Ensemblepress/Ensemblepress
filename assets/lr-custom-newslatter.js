document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // add js 04-08-2024
    var email_req = document.getElementById('email');

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
    if($("#nwsl_chckbk").is(":checked")){
        //console.log('IS CHECKED');
    } else {
        // $('#fiels_row_1').css("color", "red"); 
        // $('.error_color').css("color", "red"); 
        //console.log('NOT CHECKED');
        return false;
    }
      
  
    var email = document.getElementById('email').value;
    var tags = document.getElementById('tags').value;

    //console.log(email);
    //console.log(tags);
    // $('#fiels_row_0').removeClass('is-on');
    // $('#fiels_row_1').removeClass('is-on');
    // $('#fiels_row_2').removeClass('is-on');
    // $('.newsletter-success').addClass('is-on');
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact#contact_form', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Handle the response
    xhr.onload = function() {
        var responseMessage = document.getElementById('newsletter-message');
        if (xhr.status >= 200 && xhr.status < 400) {
            // Success!
            $('#fiels_row_0').removeClass('is-on');
            $('#fiels_row_1').removeClass('is-on');
            $('#fiels_row_2').removeClass('is-on');
            $('.newsletter-success').addClass('is-on');

       } else {
            // Error :(
            responseMessage.textContent = 'There was an error. Please try again.';
            responseMessage.style.color = 'red';
        }
    };

    // Handle network errors
    xhr.onerror = function() {
        var responseMessage = document.getElementById('newsletter-message');
        responseMessage.textContent = 'Network error. Please try again.';
        responseMessage.style.color = 'red';
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