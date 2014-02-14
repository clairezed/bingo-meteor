Template.playBingo.helpers({
    words: function(){
        return Words.find({game_id: this._id});
    }
});
