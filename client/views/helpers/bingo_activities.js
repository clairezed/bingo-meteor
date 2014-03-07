// Local (client-only) collection
BingoActivities = new Meteor.Collection(null);

createActivity = function(word){
    var user = Meteor.user();
    var activityId = BingoActivities.insert({word: word, player: user});
    console.log("createActivity");
    // console.log(activityId);
    return activityId;
}

clearActivity = function(){
    // BingoActivities.remove()
}
