Template.shouts.helpers({
    shouts: function() {
        return Shouts.find({}, {sort: {createdAt:-1}});
    }
});

Template.shoutOut.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var gameId = template.data.game._id;
    var shout = $(e.target).find('[name=shout]').val();
    if(shout.trim().length > 0) {
      Meteor.call('createShout', shout, gameId, function(error, shoutId){
        if (error) {
          throwMessage(error.reason, 'danger');
        }
        //// clear input text
        $(e.target).find('[name=shout]').val("");
      })
    }
  },
})