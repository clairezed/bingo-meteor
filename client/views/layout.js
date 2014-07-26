Template.layout.helpers({

});

Template.layout.events({
    'click .disconnect': function(e){
        e.preventDefault();
        Meteor.logout(function(error) {
            if (error) {
                console.log("error while disconnecting");
                throwMessage(error.reason, 'danger');
            }else{
                Router.go('home');
            }
        });
    }
})
