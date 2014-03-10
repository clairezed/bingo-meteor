Meteor.publish('words', function(gameId) {
    return Words.find({game_id: gameId});
});
Meteor.publish('games', function() {
    return Games.find();
});
Meteor.publish('bingo_activities', function (gameId) {
    return BingoActivities.find({game_id: gameId});
});

Meteor.publish('players', function (gameId) {
    return Meteor.users.find({playing: gameId}, {fields: {playing: 1, username: 1,}});
});


