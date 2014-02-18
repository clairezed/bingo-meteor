// Meteor.publish('words', function() {
//     return Words.find();
// });
Meteor.publish('words', function(gameId) {
    return Words.find({game: gameId});
});
Meteor.publish('players', function() {
    return Players.find();
});
Meteor.publish('games', function() {
    return Games.find();
});
