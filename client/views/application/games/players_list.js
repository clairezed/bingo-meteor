Template.playersList.helpers({
    players: function(){
        return Meteor.users.find();
    }
});
