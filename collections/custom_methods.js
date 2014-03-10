Meteor.methods({
        setPlaying: function (game_id) {
            var user = Meteor.user();
            // user.profile.playing = game_id;
            Meteor.users.update(user._id, {$set: {playing: game_id}});
            // console.log("custom metod");
            // console.log(user);
        },
         unsetPlaying: function (game_id) {
            var user = Meteor.user();
            // user.profile.playing = game_id;
            Meteor.users.update(user._id, {$set: {playing: ""}});
            // console.log("custom metod");
            // console.log(user);
        }
    });
