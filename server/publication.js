Meteor.publish('words', function(gameId) {
    return Words.find({game_id: gameId});
});
Meteor.publish('games', function() {
    return Games.find();
});
