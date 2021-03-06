BingoActivities = new Meteor.Collection('bingo_activities');

Meteor.methods({
  createActivity: function(content){
    console.log("createActivity");
      var user = Meteor.users.findOne(content.player_id);
      return BingoActivities.upsert(
        {
          game_id: content.game_id,
          content: content.content, 
          player: user.username, 
        },
        {
          $set: {
            game_id: content.game_id,
            content: content.content, 
            player: user.username, 
            created_at: new Date().getTime()
          }
        });
  },
  clearActivity: function(){
      // create cursor checking activities after a certain limit (skip)
      var excedentaryActivitiesCursor = BingoActivities.find({}, {sort: {created_at: -1}, skip: 5});
            // remove all activities that have moved after (= were added to) skip limit
            excedentaryActivitiesCursor.observe({
                added: function(doc){
                    BingoActivities.remove({_id: doc._id});
            }
        })
  }
})
