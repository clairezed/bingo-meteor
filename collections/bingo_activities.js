BingoActivities = new Meteor.Collection('bingo_activities');

Meteor.methods({
  createActivity: function(word){
      var user = Meteor.user();
      return BingoActivities.insert({
                  game_id: word.game_id,
                  word: word.word, 
                  player: user.username, 
                  created_at: new Date().getTime()});
  },
  clearActivity: function(){
      var excedentaryActivitiesCursor = BingoActivities.find({}, {sort: {created_at: -1}, skip: 5});

            excedentaryActivitiesCursor.observe({
                added: function(doc){
                    BingoActivities.remove({_id: doc._id});
            }
        })
  }
})
