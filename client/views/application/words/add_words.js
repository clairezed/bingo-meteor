Template.addWords.helpers({
    games: function(){
        return Games.find();
    },
    words: function(){
        return Words.find({game_id: this._id});
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
            console.log($(e.target).find('[name=word]').val());
            $(e.target).find('[name=word]').val("");
            
            Router.go('addWords', {_id: current_game_id});
        })   
    },
    'click .delete': function(e){
        var currentWordId = this._id;
        Words.remove(currentWordId);
    }
})
