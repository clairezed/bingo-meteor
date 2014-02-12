Template.gameName.helpers({
    games: function(){
        return Games.find();
    }
});

Meteor.subscribe('games');
