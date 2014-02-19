// Meteor.publish('words', function() {
//     return Words.find();
// });
Meteor.publish('words', function(gameId) {
    return Words.find({game: gameId});
});
Meteor.publish('games', function() {
    return Games.find();
});
