Template.addWords.helpers({
    games: function(){
        return Games.find();
    },
    words: function(){
        return Words.find({game: this._id});
    }
});

Template.addWords.events({
    'submit form': function(e, template){
        e.preventDefault();

        var word = {
            word: $(e.target).find('[name=word]').val(),
            game: template.data._id
        }
        word._id = Words.insert(word);
        var current_game = Games.findOne({_id: template.data._id})
        // clear input text
        $(e.target).find('[name=word]').val("");
        
        Router.go('addWords', current_game);
    },
    'click .delete': function(e){
        console.log(this._id);
        var currentWordId = this._id;
        Words.remove(currentWordId);

    }
})

Meteor.subscribe('games');
