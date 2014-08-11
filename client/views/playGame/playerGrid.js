Template.playerGrid.helpers({
  contents: function() {
    if (this.game ) {
      pc = PlayerContents.findOne({gameId: this.game._id, playerId: Meteor.userId()});
      if(pc){
        return pc.content;
      }
      // return PlayerContents.find({gameId: this.game._id, playerId: Meteor.userId()}).fetch();
    }
  },
});

Template.playerGridHeader.helpers({
    previewMode: function() {
    if (this.game) {
      return this.game.preview == true;
    }
  },
  canModifyGrid: function() {
     if (this.grid && this.game) {
      return this.grid.creator.id == Meteor.userId() && this.game.preview == true;
    }
  }
});

Template.playerGrid.events({
  'click .outer-square': function(e, template){
    e.preventDefault();
    console.log($(e.target).attr('id'));
    var pos = parseInt($(e.target).attr('id'));
    var gameId = template.data.game._id;
    Meteor.call('toggleFound', gameId, pos, function(error, playerContentId){
      if(error)
        throwMessage(error.reason, 'danger');
    })
  }
});