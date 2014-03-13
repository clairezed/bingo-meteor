Meteor.publish('games', function() {
    return Games.find();
});

Meteor.publish('player_contents', function(gameId) {
    var player_contents = PlayerContents.find({game_id: gameId});
    var handle = player_contents.observeChanges({
        changed: function(id, fields){
            if(fields.found){
                var content = PlayerContents.findOne(id);
                Meteor.call('createActivity', content, function(error, activity_id){
                    if(error)
                        console.log("there's a pb");
                })
            }
        }
    });
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
            BingoActivities.remove({_id: doc._id});
        }
    })

    return BingoActivities.find({game_id: gameId});

});

Meteor.publish('players', function (gameId) {
    return Meteor.users.find({playing: gameId}, {fields: {playing: 1, username: 1,}});
});

Meteor.publish('player_found_contents', function () {
    return Meteor.player_found_contents.find();
});


