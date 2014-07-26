Template.login.helpers({

});

Template.login.events({

})

Template.loginForm.events({
  "submit #login-form": function(event, template) {
    console.log(template.find("#login-username").value);
    event.preventDefault();

    var username = template.find("#login-username").value;
    var password = template.find("#login-password").value;

    // Fields validation
    var errors = [];
    if(username.length < 1) {
      errors.push("Please fill in your name !");
    };
    if(password.length < 1) {
      errors.push("Your password is empty, dear");
    };

    if(errors.length > 0) {
      for(index in errors) {
        throwMessage(errors[index], 'danger');
      };
    } else {
      Meteor.loginWithPassword(
        username,
        password,
        function(error) {
          if (error) {
            throwMessage(error.reason, 'danger');
          }else{
            throwMessage("Happy to see you again !", 'success');
            Router.go('userspace');
          }
        }
      );
    }
  }
});




