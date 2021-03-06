Template.launchGameBtn.helpers({
  canLaunchGame: function() {
    return (game = Games.findOne({gridId: this._id, 'creator.id': Meteor.userId()})) ? false : true;
  }
})



Template.launchGameBtn.events({
  'click .launch-game': function(e, template) {
    e.preventDefault();
    if(!Meteor.user()) {
      Router.go('authenticate');
    } else {
      var gridId = template.data._id;
      var game;
      if (game = Games.findOne({'creator.id': Meteor.userId(), gridId: gridId})) {
        Meteor.call('launchGame', game._id, function(error, gameId){
            if (error){
                throwMessage(error.reason, 'danger');
            }else{
                Router.go('playGame', {_id: gridId, gameId: gameId});
            }
        });
      } else {
        var game = {
            gridId: gridId,
            preview: false
        }
        console.log("createGame from launchGameBtn click launch game, else")
        Meteor.call('createGame', game, function(error, gameId){
            if (error){
                throwMessage(error.reason, 'danger');
            }else{
                Router.go('playGame', {_id: gridId, gameId: gameId});
            }
        });
      }
    }
  }
})