Template.userspace.helpers({
    games: function(){
        var user = Meteor.user();
            return Games.find({creatorId: user._id});
    }, 
     has_games: function(){
            var user = Meteor.user();
            if(user)
                return Games.find({creatorId: user._id}).count() > 0;
    }
});

Template.userspace.events({
    'click .delete-game': function(e){
        e.preventDefault();

        if(confirm("Do you really want to delete your sweet bingo, sugar ?")){
            var currentGameId = this._id;

            Meteor.call('deleteGame', currentGameId, function(error){
                if (error)
                    throwError(error.reason);
            })
        }
    }
})
