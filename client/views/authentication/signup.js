Template.signupForm.events({
  "submit #signup-form": function(event, template) {
    event.preventDefault();
    var username = template.find("#signup-username").value;
    var password = template.find("#signup-password").value;
    var passwordConfirm = template.find("#signup-password-confirmation").value;

    // Fields validation
    var errors = [];
    if(username.length < 1) {
      errors.push("Please fill in your name !");
    };
    if(password.length < 1) {
      errors.push("Your password is empty, dear");
    };
    if(passwordConfirm.length < 1) {
      errors.push("Your password confirmation is empty, dear");
    }
    if(password != passwordConfirm) {
      errors.push("Hu ho, your password an your password confirmation don't match");
    }

    if(errors.length > 0) {
      for(index in errors) {
        throwMessage(errors[index], 'danger');
      };
    } else {
      Accounts.createUser({
        username: username,
        password: password
      }, function(error) {
        if (error) {
          console.log(error);
          throwMessage(error.reason, 'danger');
        }else{
          throwMessage("Welcome on board !", 'success');
          Router.go('userspace');
        }
      });

    }

  }
});
