Template.addWords.helpers({
    words: function(){
        return Words.find({game_id: this._id});
    },
    enough_words: function(){
        return Games.findOne(this._id).nb_words >= 5;
    }
});

Template.addWords.events({
    'submit form': function(e, template){
        e.preventDefault();

        var word = {
            word: $(e.target).find('[name=word]').val(),
            game_id: template.data._id
        }

        Meteor.call('createWord', word, function(error, current_game_id){
            if (error)
                return alert(error.reason);
            // var current_game = Games.findOne({_id: template.data._id})

            /// clear input text
            $(e.target).find('[name=word]').val("");
            
            Router.go('addWords', {_id: current_game_id});
        })   
    },
    'click .delete': function(e){
        var currentWord = this;
        Games.update(currentWord.game_id, {$inc: {nb_words: -1}});
        Words.remove(currentWord._id);
    }
})
