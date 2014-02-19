Template.playerIntro.helpers({
});

Template.playerIntro.events({
    'submit form': function(e){
        e.preventDefault();
        var user = Meteor.user();
        console.log(user._id);

        var game = {
            title: $(e.target).find('[name=title]').val(),
            creator: user._id
        }
        game._id = Games.insert(game);
        Router.go('addWords', game);

        // var player = {
        //     name: $(e.target).find('[name=name]').val()
        // }
        // player._id = Players.insert(player);
        // Router.go('setGameTitle', player);
    }
})

Meteor.subscribe('players');
