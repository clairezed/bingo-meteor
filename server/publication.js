// GRIDS
Meteor.publish('grid', function(gridId) {
    return Grids.find({_id: gridId});
});

Meteor.publish('grids', function() {
    return Grids.find();
});


// GAMES

Meteor.publish('games', function() {
    return Games.find();
});

Meteor.publish('visibleGames', function() {
    return Games.find({preview: false});
});

Meteor.publish('game', function(gameId) {
    console.log("game startObservers");
    Games.startObservers(gameId);
    this.onStop(function() {
        console.log("game stopObservers");
        Games.stopObservers(gameId);
    })
    return Games.find({_id: gameId});
});

Meteor.publish('userGames', function(userId) {
    return Games.find({creatorId: userId});
})


// PLAYER CONTENTS

Meteor.publish('playerContents', function(gameId) {
    console.log("pc startObservers");
    PlayerContents.startObservers(gameId);
    this.onStop(function () {
        console.log("pc stopObservers");
        PlayerContents.stopObservers(gameId);
    });
    return PlayerContents.find({gameId: gameId});
});

// Meteor.publish('player_found_contents', function () {
//     PlayerFoundContents.startObservers();
//     this.onStop(function () {
//         PlayerFoundContents.stopObservers();
//     });
//     return PlayerFoundContents.find();
// });

// BINGO ACTIVITIES

Meteor.publish('bingoActivities', function (gameId) {
  Meteor.call('clearActivity', function(error){
        if(error)
            console.log(error.reason);
    })

    return BingoActivities.find({game_id: gameId});
});


// USERS

Meteor.publish('players', function (gameId) {
    return Meteor.users.find({playing: gameId}, {fields: {playing: 1, username: 1,}});
});

Meteor.publish('gamePlayers', function(userIds) {
    return Meteor.users.find({_id: {$in: userIds}});
});


