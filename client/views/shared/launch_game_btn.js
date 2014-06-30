Template.launchGameBtn.helpers({
  canLaunchGame: function() {
    return (game = Games.findOne({gridId: this._id, 'creator.id': Meteor.userId()})) ? false : true;
  }
})



Template.launchGameBtn.events({
  'click .launch-game': function(e, template) {
    e.preventDefault();
    var gridId = template.data._id;
    var game;
    if (game = Games.findOne({'creator.id': Meteor.userId(), gridId: gridId})) {
      Meteor.call('launchGame', game._id, function(error, gameId){
          if (error){
              throwError(error.reason);
          }else{
              Router.go('playGame', {_id: gridId, gameId: gameId});
          }
      });
    } else {
      var game = {
          gridId: gridId,
          preview: false
      }
      Meteor.call('createGame', game, function(error, gameId){
          if (error){
              throwError(error.reason);
          }else{
              Router.go('playGame', {_id: gridId, gameId: gameId});
          }
      });
    }
  }
})