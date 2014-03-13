Template.addWords.helpers({
    // words: function(){
    //     return Words.find({game_id: this._id});
    // }
});

Template.addWords.events({
    'submit form': function(e, template){
        e.preventDefault();
        var args = {};
        args["game_id"] =  template.data._id;
        args["word"] = $(e.target).find('[name=word]').val();

        Meteor.call('createWord', args, function(error, current_game_id){
            if (error)
                throwError(error.reason);
            
            //// clear input text
            $(e.target).find('[name=word]').val("");
        })   
    },
    'click .delete': function(e, template){
        var args = {};
        args["game_id"] =  template.data._id;
        args["word"] = $(e.target).prev().html();
       
        Meteor.call('deleteWord', args, function(error){
            if(error)
                throwError(error.reason);
        })
    }
})
