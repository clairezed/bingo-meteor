Template.playersList.helpers({
    players: function(){
        return Meteor.users.find({}, {fields: {playing: 1, username: 1,}});
    }
});
