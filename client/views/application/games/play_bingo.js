Template.playBingo.helpers({
    contents: function(){
        return PlayerContents.find({game_id: this._id, player_id: Meteor.userId()}, {sort: {pos: 1}});
    }, 
    ownGame: function(){
    	return this.creatorId == Meteor.userId();
    }
});

Template.playBingo.events({
    'click .outer-square': function(e, template){
        e.preventDefault();
        
        content_clicked = PlayerContents.findOne($(e.target).attr('id'));
        console.log(content_clicked);
        Meteor.call('toggleFound', content_clicked, function(error, found){
            if(error)
                throwError(error.reason);     
                
        })
    }
})
