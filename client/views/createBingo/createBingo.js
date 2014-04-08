Template.createBingo.events({
    'submit form': function(e){
        e.preventDefault();
        var user = Meteor.user();

        var game = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val(),
            tags: $(e.target).find('[name=tags]').val()
        }

        Meteor.call('createGame', game, function(error, current_game_id){
            if (error){
                throwError(error.reason);
            }else{
                Router.go('fillBingo', {_id: current_game_id});
            }
        });
    }
})
