Template.playerIntro.helpers({
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

