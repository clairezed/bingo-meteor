Template.playerIntro.helpers({
    // to know if we have to show the playerGames template
    has_games: function(){
            var user = Meteor.user();
            return Games.find({creatorId: user._id}).count() > 0;
    }
});

Template.playerIntro.events({
    'submit form': function(e){
        e.preventDefault();
        var user = Meteor.user();

        var game = {
            title: $(e.target).find('[name=title]').val()
        }

        Meteor.call('createGame', game, function(error, current_game_id){
            if (error)
                return alert(error.reason);
 
            Router.go('addWords', {_id: current_game_id});
        });
    }
})

