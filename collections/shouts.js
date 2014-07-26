Shouts = new Meteor.Collection('shouts');

Meteor.methods({

  createShout: function(shout, gameId) {
    console.log("createShout");
    var user = Meteor.user();

    Shouts.insert({
      shout: shout,
      shouter: user.username,
      gameId: gameId,
      createdAt: new Date().getTime()
    });

    Meteor.setTimeout(function() {
      Meteor.call('deleteLastShout', function(error){
        if (error) {
          console.log(error.reason, 'danger');
        }
      })
    }, 10000);

  },
  deleteShout: function(shoutId) {
    Shouts.remove(shoutId);
  },
  // due to timeout, we have to rely on creation date to be sure to remove the good shout
  deleteLastShout: function() {
    if(lastShout = Shouts.find({}, {sort: {createdAt:1}, limit:1})) {
      lastShout.forEach(function (lastshout) {
        Shouts.remove(lastshout._id);
      })
    }
  }


})