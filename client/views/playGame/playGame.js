Template.playGame.helpers({
  previewMode: function() {
    if (this.game) {
      return this.game.preview == true;
    }
  }
});

Template.gameNotifications.helpers({
  winner: function(){
    if (this.winner) {
      return Meteor.users.findOne(this.winner)
    }
  }
});


