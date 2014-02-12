Template.playerIntro.helpers({
    words: function(){
        return Players.find();
    }
});

Template.playerIntro.events({
    'submit form': function(e){
        e.preventDefault();

        var player = {
            name: $(e.target).find('[name=name]').val()
        }
        player._id = Players.insert(player);
        Router.go('setGameTitle', player);
    }
})

Meteor.subscribe('players');
