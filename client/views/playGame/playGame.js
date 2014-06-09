Template.playGame.helpers({
  gameCreator: function() {
    if (this.game) {
      return Meteor.users.findOne({_id: this.game.creatorId});
    }
  },
  ownGame: function(){
     if (this.game) {
      return this.game.creatorId == Meteor.userId();
    }
  },
  contents: function(){
    if (this.game) {
      return PlayerContents.find({gameId: this.game._id, playerId: Meteor.userId()}).fetch();
    }
  },
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


Template.playGame.events({
  'click .outer-square': function(e, template){
    e.preventDefault();
    content_clicked = PlayerContents.findOne($(e.target).attr('id'));
    Meteor.call('toggleFound', content_clicked, function(error, contentFound){
      if(error)
        throwError(error.reason);
    })
  }
});
