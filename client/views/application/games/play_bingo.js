Template.playBingo.helpers({
    words: function(){
        return Words.find({game_id: this._id});
    }
});

Template.playBingo.events({
    'click .outer-square': function(e, template){
        e.preventDefault();

        console.log("click !");
        console.log($(e.target).attr('id'));
        word_clicked = Words.findOne($(e.target).attr('id'));
        console.log(word_clicked);

        // var word = {
        //     word: $(e.target).find('[name=word]').val(),
        //     game_id: template.data._id
        // }

        // Meteor.call('createWord', word, function(error, current_game_id){
        //     if (error)
        //         return alert(error.reason);
        //     // var current_game = Games.findOne({_id: template.data._id})

        //     /// clear input text
        //     $(e.target).find('[name=word]').val("");
            
        //     Router.go('addWords', {_id: current_game_id});
        // })   
    }
})