Template.bingoActivityList.helpers({
    bingo_activities    : function() {
        return BingoActivities.find({game_id: this._id}, {sort: {created_at: -1}, limit: 5});
    },
    words: function(){
        return Words.find({game_id: this._id, found_by: true});
    }
});
