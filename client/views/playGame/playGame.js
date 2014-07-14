Template.playGame.helpers({
  previewMode: function() {
    if (this.game) {
      return this.game.preview == true;
    }
  }
    // winners: function(){
    //     console.log("winners");
    //     winners = [];
    //     _.each(this.winners, function(winner_id, index, list){
    //                 winner = Meteor.users.findOne(winner_id);
    //                 winners.push(winner.username);
    //     })
    //     console.log(winners);
    //     return winners;
    // }
});

Template.playerGrid.helpers({
    previewMode: function() {
    if (this.game) {
      return this.game.preview == true;
    }
  },
  canModifyGrid: function() {
     if (this.grid && this.game) {
      return this.grid.creator.id == Meteor.userId() && this.game.preview == true;
    }
  },
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

Template.playerGrid.events({
  'click .outer-square': function(e, template){
    e.preventDefault();
    var pos = parseInt($(e.target).attr('id'));
    var gameId = template.data.game._id;
    Meteor.call('toggleFound', gameId, pos, function(error, playerContentId){
      if(error)
        throwError(error.reason);
    })

    // content_clicked = PlayerContents.findOne($(e.target).attr('id'));
    // Meteor.call('toggleFound', content_clicked, function(error, contentFound){
    //   if(error)
    //     throwError(error.reason);
    // })
  }
});
