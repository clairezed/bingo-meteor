// Local (client-only) collection
BingoActivities = new Meteor.Collection(null);

createActivity = function(word){
    var user = Meteor.user();
    console.log("createActivity");
    return BingoActivities.insert({word: word.word, 
        player: user.username, 
        created_at: new Date().getTime()});
}

clearActivity = function(){
    // BingoActivities.remove()
}
