Template.launchGameBtn.events({
  'click .launch-game': function(e, template) {
    e.preventDefault();
    var gridId = template.data._id;
    // var user = Meteor.user();
    var game = Games.findOne({creatorId: Meteor.userId(), gridId: gridId});

    if (game) {
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