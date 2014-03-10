// Local (client-only) collection
BingoActivities = new Meteor.Collection('bingo_activities');

// BingoActivities.allow({
//   insert: function(userId, doc){
//     return !! userId;
//   }, 
//   remove: function(userId, doc){
//     return !! userId;
//   }
// })


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
      // BingoActivities.remove()
  }
})
