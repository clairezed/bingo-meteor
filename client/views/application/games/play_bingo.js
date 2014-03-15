Template.playBingo.helpers({
    contents: function(){
        return PlayerContents.find({game_id: this._id, player_id: Meteor.userId()}, {sort: {pos: 1}});
    }, 
    ownGame: function(){
    	return this.creatorId == Meteor.userId();
    }, 
    winners: function(){
        console.log("winners");
        winners = [];
        _.each(this.winners, function(winner_id, index, list){
                    winner = Meteor.users.findOne(winner_id);
                    winners.push(winner.username);
        })
        console.log(winners);
        return winners;
        
        // return Meteor.users.find({})
    }
});

Template.playBingo.events({
    'click .outer-square': function(e, template){
        e.preventDefault();
        
        content_clicked = PlayerContents.findOne($(e.target).attr('id'));
        Meteor.call('toggleFound', content_clicked, function(error, contentFound){
            if(error)
                throwError(error.reason);     
        })
    }
})
