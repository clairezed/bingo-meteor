Meteor.methods({
        setPlayingUsers: function (game_id) {
            console.log("set playing users");
            var user = Meteor.user();
            Meteor.users.update(user._id, {$set: {playing: game_id}});
        },
         unsetPlayingUsers: function (game_id) {
            console.log("UNset playing users");
            var user = Meteor.user();
            Meteor.users.update(user._id, {$set: {playing: ""}});
        }
    });
