Template.bingo_activities.helpers({
    activities: function() {
        return BingoActivities.find();
    }
});

// Template.bingo_activities.rendered = function() {
//     var error = this.data;
//     Meteor.defer(function() {
//         Errors.update(error._id, {$set: {seen: true}});
//     });
// };
