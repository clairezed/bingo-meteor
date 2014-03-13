Meteor.publish('games', function() {
    return Games.find();
});

Meteor.publish('player_contents', function(gameId) {
    return PlayerContents.find({game_id: gameId});
});

Meteor.publish('bingo_activities', function (gameId) {
    // Meteor.call('clearActivity', args, function(error){
    //     if(error)
    //         throwError(error.reason);
    // })
    
    var excedentaryActivitiesCursor = BingoActivities.find({}, {sort: {created_at: -1}, skip: 5});

    excedentaryActivitiesCursor.observe({
        added: function(doc){
            console.log(doc);
            BingoActivities.remove({_id: doc._id});
        }
    })

    return BingoActivities.find({game_id: gameId});

});

Meteor.publish('players', function (gameId) {
    return Meteor.users.find({playing: gameId}, {fields: {playing: 1, username: 1,}});
});


