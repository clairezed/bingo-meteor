Meteor.methods({
        setPlayingUsers: function (game_id) {
            var user = Meteor.user();
            Meteor.users.update(user._id, {$set: {playing: game_id}});
            // create found contents array for the current game
            var player_found_content = PlayerFoundContents.findOne({player_id: user._id, game_id: game_id});
            if(!player_found_content){
                PlayerFoundContents.insert({
                    player_id: user._id,
                    game_id: game_id,
                    founds: []
                });
            }
        },
         unsetPlayingUsers: function (game_id) {
            var user = Meteor.user();
            Meteor.users.update(user._id, {$set: {playing: ""}});
        //     PlayerFoundContents.remove({
        //         player_id: user._id,
        //         game_id: game_id
        //     });
        }
    });
