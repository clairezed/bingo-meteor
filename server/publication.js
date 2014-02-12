Meteor.publish('words', function() {
    // return Words.find({game: game});
    return Words.find();
});
Meteor.publish('players', function() {
    return Players.find();
});
Meteor.publish('games', function() {
    return Games.find();
});
