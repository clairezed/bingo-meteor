Template.playBingo.helpers({
    words: function(){
        return Words.find({game_id: this._id});
    }, 
    ownGame: function(){
    	return this.creatorId == Meteor.userId();
    },
    found_by_current_user: function(){
        if (_.contains(this.found_by, Meteor.userId())){
            console.log("found");
            return "found";
        }
        return "";
    }
});

Template.playBingo.events({
    'click .outer-square': function(e, template){
        e.preventDefault();
        
        word_clicked = Words.findOne($(e.target).attr('id'));
        Meteor.call('toggleFound', word_clicked, function(error, current_game_id){
                
        })
    }
})
