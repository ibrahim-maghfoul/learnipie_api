$(document).ready(function() {
    // Get the form element
    var $form = $('form');
  
    // Handle form submit event
    $form.submit(function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();
  
      // Get the form data
      var formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        subject: $('#subject').val(),
        message: $('#message').val()
      };
  
      // Send the form data to the server using AJAX
      $.ajax({
        type: 'POST',
        //! Replace it with the real adress
        url: 'http://localhost:5000/learnipie/api/v1/services/sendEmail',
        data: formData,
        success: function(data) {
          // Handle success response
          console.log(data);
          // Change the button color to green and text to "Sent!"
          $('.send-email')
            .removeClass('btn-primary-gradient')
            .addClass('btn-success-gradient')
            .text('Sent!');
          // Revert the button color back to its initial styling after 2 seconds
          setTimeout(function() {
            $('.send-email')
              .removeClass('btn-success-gradient')
              .addClass('btn-primary-gradient')
              .text('Send Message');
          }, 5000);
        },
        error: function(error) {
          // Handle error response
          console.error(error);
        }
      });
    });
  });