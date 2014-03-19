Meteor.publish('games', function() {
    return Games.find();
});

Meteor.publish('player_contents', function(gameId) {
    PlayerContents.startObservers(gameId);
    this.onStop(function () {
        PlayerContents.stopObservers(gameId);
    });
    return PlayerContents.find({game_id: gameId});
});
        
Meteor.publish('bingo_activities', function (gameId) {
  Meteor.call('clearActivity', function(error){
        if(error)
            console.log(error.reason);
    })

    return BingoActivities.find({game_id: gameId});
});

Meteor.publish('players', function (gameId) {   
    return Meteor.users.find({playing: gameId}, {fields: {playing: 1, username: 1,}});
});

Meteor.publish('player_found_contents', function () {
    PlayerFoundContents.startObservers();
    this.onStop(function () {
        PlayerFoundContents.stopObservers();
    });
    return PlayerFoundContents.find();
});


