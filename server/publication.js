Meteor.publish('games', function() {
    return Games.find();
});

Meteor.publish('player_contents', function(gameId) {
    var player_contents = PlayerContents.find({game_id: gameId});
    var handle = player_contents.observeChanges({
        changed: function(id, fields){
            var content = PlayerContents.findOne(id);
            // create activity only for found contents
            if(fields.found){
                Meteor.call('createActivity', content, function(error, activity_id){
                    if(error)
                        console.log("there's a pb");
                });
            };
            // update content founds
            Meteor.call('addFound', content, function(error, player_found_content_id){
                    if(error)
                        console.log(error.reason);
                })
        }
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
    var player_found_contents = PlayerFoundContents.find();
    var handle = player_found_contents.observeChanges({
        changed: function(id, fields){
            var foundContents = PlayerFoundContents.findOne(id);
            Meteor.call('checkBingo', foundContents, function(error, fc_id){

            })
            // create activity only for found contents
            // if(fields.found){
            //     Meteor.call('createActivity', content, function(error, activity_id){
            //         if(error)
            //             console.log("there's a pb");
            //     });
            // };
            // // update content founds
            // Meteor.call('addFound', content, function(error, player_found_content_id){
            //         if(error)
            //             console.log(error.reason);
            //     })
        }
    });
    return PlayerFoundContents.find();
});


