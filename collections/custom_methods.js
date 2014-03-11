Meteor.methods({
        setPlaying: function (game_id) {
            var user = Meteor.user();
            Meteor.users.update(user._id, {$set: {playing: game_id}});
        },
         unsetPlaying: function (game_id) {
            var user = Meteor.user();
            Meteor.users.update(user._id, {$set: {playing: ""}});
        }
    });
