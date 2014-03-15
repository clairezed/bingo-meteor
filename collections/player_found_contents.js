PlayerFoundContents = new Meteor.Collection('player_found_contents');

Meteor.methods({
  addFound: function(content){
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
