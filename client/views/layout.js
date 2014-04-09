Template.layout.helpers({
    //words: wordsData
    // currentPlayer: function(){
    //     return Session.get('currentPlayer');
    // }   
});

Template.layout.events({
    'click .disconnect': function(e){
        e.preventDefault();
        Meteor.logout(function(error) {
            if (error) {
        // Display the logout error to the user however you want
            }else{
                Router.go('home');
            }
        });
    }
})
