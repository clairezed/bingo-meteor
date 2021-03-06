Template.gridAside.helpers({
  currentPlayers: function() {
    var players;
    if(this.game) {
      if (players = Meteor.users.find({_id: {$in: this.game.players}})) {
        return players;
      }
    }
  }
});

Template.playGameActionBtns.helpers({
  canDeleteGame: function() {
    if (this) {
      return this.creator.id == Meteor.userId() && this.players.length == 1;
    }
  },
  ownsButCanteleteGame: function() {
    if (this) {
      return this.creator.id == Meteor.userId() && this.players.length > 1;
    }
  },
  canQuitGame: function() {
    if (this) {
      return this.creator.id != Meteor.userId();
    }
  }
});

Template.playGameActionBtns.events({
  'click .quit-game': function(e, template) {
    e.preventDefault();
    var gameId = template.data.game. _id;

    Meteor.call('quitGame', gameId, function(error) {
      if(error) {
        throwMessage(error.reason, 'danger');
      }else {
        Router.go('home');
      }
    });
  },
  'click .delete-game': function(e, template) {
    e.preventDefault();
    var gameId = template.data.game. _id;

    Meteor.call('deleteGame', gameId, function(error) {
      if(error) {
        throwMessage(error.reason, 'danger');
      }else {
        Router.go('home');
      }
    });
  }
});

// var helpData2 = {
//   'delete-game-help': {
//     title: "Wanna delete your game ?",
//     message: "How rude ! You can't delete your game while there are other sweet people playing !",
//     options: {
//       placement: 'right'
//     }
//   },
// }
// InlineHelp.initHelp(helpData2);
