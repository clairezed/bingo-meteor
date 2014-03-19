PlayerFoundContents = new Meteor.Collection('player_found_contents');

Meteor.methods({
  addFound: function(content){
    console.log("addFound");
    var player_found_contents = PlayerFoundContents.findOne({
      player_id: content.player_id, 
      game_id: content.game_id
    });

    if(content.found){
        PlayerFoundContents.update(
          player_found_contents._id, {
            $addToSet: {founds: content.pos}
        })
    }else{
        PlayerFoundContents.update(
          player_found_contents._id, {
            $pull: {founds: content.pos}
        })
    }
  }
  // , 
  // removePlayerFoundContents: function(game_id){
  //   var user = Meteor.user();
  //   console.log("removePlayerFoundContents");
  //   console.log(user);
  // }
})

///// OBSERVERS /////////////////////////////////////////////////////////////////////

PlayerFoundContents.startObservers = function startObservers() {
  PlayerFoundContents.observer = PlayerFoundContents.find()
  .observeChanges({
    //change: notifySubscribedUsers // or some other function
    changed: function(id, fields){
      var foundContents = PlayerFoundContents.findOne(id);
            Meteor.call('checkBingo', foundContents, function(error, fc_id){
                if (error)
                        console.log(error);
            })

        }
  });
};

PlayerFoundContents.stopObservers = function stopObservers() {
  if(PlayerFoundContents.observer) {
    PlayerFoundContents.observer.stop(); // Call the stop
  }
};
