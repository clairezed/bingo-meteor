// Local (client-only) collection
BingoActivities = new Meteor.Collection();

createActivity = function(word){
    var user = Meteor.user();
    console.log("createActivity");
    return BingoActivities.insert({
    	game_id: word.game_id,
    	word: word.word, 
        player: user.username, 
        created_at: new Date().getTime()});
}

clearActivity = function(){
    // BingoActivities.remove()
}