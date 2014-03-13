PlayerFoundContents = new Meteor.Collection('player_found_contents');

Meteor.methods({
  addFound: function(content){
    console.log("PlayerFoundContents addFound");
      // var user = Meteor.users.findOne(content.player_id);
      // return BingoActivities.upsert(
      //   {
      //     game_id: content.game_id,
      //     content: content.content, 
      //     player: user.username, 
      //   },
      //   {
      //     $set: {
      //       game_id: content.game_id,
      //       content: content.content, 
      //       player: user.username, 
      //       created_at: new Date().getTime()
      //     }
      //   });
  }
})
