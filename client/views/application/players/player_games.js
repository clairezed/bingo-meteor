Template.playerGames.helpers({
    games: function(){
    	var user = Meteor.user();
            return Games.find({creatorId: user._id});
    }
});

Template.playerGames.events({
    'click .delete-game': function(e){
    	e.preventDefault();

    	if(confirm("Do you really want to delete your sweet bingo, sugar ?")){
    		var currentGameId = this._id;

        	Meteor.call('deleteGame', currentGameId, function(error){
        		if (error)
                	return alert(error.reason);

                Router.go('playerIntro');
        	})
    	}
    }
})
