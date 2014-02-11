Meteor.publish('words', function() {
    return Words.find();
});
