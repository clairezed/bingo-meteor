CompletedBingos = new Meteor.Collection('completed_bingos');

Meteor.methods({
  checkCompleted: function(array){
  	console.log("checkCompleted");
  	console.log("word : ");
  	console.log(array[0]);
  	console.log("found : ");
  	console.log(array[1]);
      // var user = Meteor.user();
      // return BingoActivities.insert({
      //             game_id: word.game_id,
      //             word: word.word, 
      //             player: user.username, 
      //             created_at: new Date().getTime()});
  }
})
