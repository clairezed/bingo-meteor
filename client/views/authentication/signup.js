Template.signupForm.events({
  "submit #signup-form": function(event, template) {
    event.preventDefault();
    Accounts.createUser({
      username: template.find("#signup-username").value,
      password: template.find("#signup-password").value
      // ,
      // profile: {
      //   name: template.find("#signup-name").value
      //   // Other required field values can go here
      // }
    }, function(error) {
      if (error) {
        // Display the user creation error to the user however you want
      }else{
                Router.go('userspace');
            }
    });
  }
});
