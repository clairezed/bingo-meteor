Template.bingoActivityList.helpers({
    words: function(){
        return Words.find({game_id: this._id, found_by: true});
    }
});
