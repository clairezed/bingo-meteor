Template.layout.helpers({

});

Template.layout.events({
    'click .disconnect': function(e){
        e.preventDefault();
        Meteor.logout(function(error) {
            if (error) {
                console.log("error while disconnecting");
                throwError(error.reason);
            }else{
                Router.go('home');
            }
        });
    }
})
