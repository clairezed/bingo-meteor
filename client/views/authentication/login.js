Template.login.helpers({

});

Template.login.events({
    
})

Template.loginForm.events({
  "submit #login-form": function(event, template) {
    console.log(template.find("#login-username").value);
    event.preventDefault();
    Meteor.loginWithPassword(
      template.find("#login-username").value,
      template.find("#login-password").value,
      function(error) {
        if (error) {
          console.log(error);
        }else{
                Router.go('userspace');
            }
      }
    );
  }
});




