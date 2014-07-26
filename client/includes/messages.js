Template.messages.helpers({
    messages: function() {
        return Messages.find().fetch();
    }
});

Template.message.rendered = function() {
    var message = this.data;
    Meteor.defer(function() {
        Messages.update(message._id, {$set: {seen: true}});
    });
};
