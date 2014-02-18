Template.setGameTitle.helpers({
    players: function(){
        return Players.find();
    }
});


Template.setGameTitle.events({
    'submit form': function(e){
        e.preventDefault();

        var game = {
            title: $(e.target).find('[name=title]').val(),
            creator: $(e.target).find('[name=playerId]').val()
        }
        game._id = Games.insert(game);
        Router.go('addWords', game);
    }
})
