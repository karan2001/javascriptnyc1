$(window).load(function() {


"use strict";


   $('#contact_form').validate({
         onfocusout: false,
         onkeyup: false,
         rules: {
             email: {
                 required: true,
                 email: true
             }
         },
         errorPlacement: function(error, element) {
             error.appendTo( element.closest("form"));
         },
         messages: {
             email: {
                 required: "Please enter your email.",
                 email: "Please enter a valid email."
             }
         },

         highlight: function(element) {
             $(element)
         },

         success: function(element) {
             element
             .text("Thank You For Your Email. We'll be in touch!").addClass('valid')
         }
     });




  // Variable to hold request
  var request;


  // Bind to the submit event of our form
  $("#contact_form").submit(function(event){

    if($(this).valid()) {
      console.log(this);
        console.log("Is it valid?")

        var form = $("#subscribe_form")
        // alert("Valid: "+ form.valid() );
    } else{
      console.log(" not valid")
    }
      // Abort any pending request
      if (request) {
          request.abort();
      }
      // setup some local variables
      var $form = $(this);



      // Let's select and cache all the fields
      var $inputs = $form.find("input, select, button, textarea");

      // Serialize the data in the form
      var serializedData = $form.serialize();
      console.log("serializedData " + serializedData)

      // Let's disable the inputs for the duration of the Ajax request.
      // Note: we disable elements AFTER the form data has been serialized.
      // Disabled form elements will not be serialized.
      //$inputs.prop("disabled", true);

      // Fire off the request to /form.php
      request = $.ajax({

          url: "https://script.google.com/macros/s/AKfycby2s_ruGuwgMe9eqbZlkCQBtzaTzq5bZSgZr4UAr0gl_RT2Zew/exec",
          type: "post",
          data: serializedData
      });

      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          // Log a message to the console

          console.log("Hooray, it worked!");
          console.log(response);
          console.log(textStatus);
          console.log(jqXHR);
      //    document.getElementById("subscribe_form").innerHTML = "Hello World";

      });





      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          // Log the error to the console
          console.error(
              "The following error occurred: "+
              textStatus, errorThrown
          );
      });

      // Callback handler that will be called regardless
      // if the request failed or succeeded
      request.always(function () {
          // Reenable the inputs
          $inputs.prop("disabled", false);

      });

      // Prevent default posting of form
      event.preventDefault();
  });



});
