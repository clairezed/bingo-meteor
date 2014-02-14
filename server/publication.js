Meteor.publish('words', function(gameId) {
    return Words.find({game_id: gameId});
});
Meteor.publish('games', function() {
    return Games.find();
});
// Meteor.publish('players', function (gameId) {
//     return Meteor.users.find({playing: game_id}, {fields: {playing: 1,}})
// });
Meteor.publish('players', function () {
    return Meteor.users.find({}, {fields: {playing: 1, username: 1,}})
});
Meteor.publish('bingo_activities', function (gameId) {
    return Meteor.bingo_activities.find({game_id: gameId})
});
Meteor.publish('users', function () {
    return Meteor.users.find({}, {fields: {playing: 1, username: 1,}})
});
