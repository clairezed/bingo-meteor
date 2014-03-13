Template.playBingo.helpers({
    contents: function(){
        return PlayerContents.find({game_id: this._id, player_id: Meteor.userId()}, {sort: {pos: 1}});
         // return BingoActivities.find({game_id: this._id}, {sort: {created_at: -1}, limit: 5});
    }, 
    ownGame: function(){
    	return this.creatorId == Meteor.userId();
    }
    // ,
    // found_by_current_user: function(){
    //     if (_.contains(this.found_by, Meteor.userId())){
    //         return "found";
    //     }
    //     return "";
    // }
});

Template.playBingo.events({
    'click .outer-square': function(e, template){
        e.preventDefault();
        
        content_clicked = PlayerContents.findOne($(e.target).attr('id'));
        Meteor.call('toggleFound', content_clicked, function(error, found){
            console.log("end : " +found);
                if(found){
                    Meteor.call('createActivity', content_clicked, function(error){
                        if(error)
                            throwError(error.reason);
                    })
                }
                
        })
    }
})
