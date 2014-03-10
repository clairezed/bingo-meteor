Template.bingo_activities.helpers({
    bingo_activities    : function() {
        return BingoActivities.find({}, {sort: {created_at: -1}, limit: 5});
    }
});
