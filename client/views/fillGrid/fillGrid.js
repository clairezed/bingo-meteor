Template.fillGrid.helpers({
  userGame: function() {
    return Games.findOne({creatorId: Meteor.userId(), gridId: this._id});
  }
})

Template.fillGrid.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var gridId = template.data._id;
    var word = $(e.target).find('[name=word]').val();

    Meteor.call('addWord', gridId, word, function(error, currentGridId){
      if (error) {
        throwError(error.reason);
      }
            //// clear input text
      $(e.target).find('[name=word]').val("");
    })
  },
  'click .delete': function(e, template) {
    e.preventDefault();
    var gridId = template.data._id;
    var word = $(e.target).prev().html();

    Meteor.call('removeWord', gridId, word, function(error){
      if(error)
        throwError(error.reason);
    })
  },
  'click .launch-game': function(e, template) {
    e.preventDefault();
    var gridId = template.data._id;
    // var user = Meteor.user();
    var game = Games.findOne({creatorId: Meteor.userId(), gridId: gridId});

    if (game) {
      Router.go('playGame', {_id: gridId, gameId: game._id});
    } else {
      var game = {
          gridId: gridId,
          creatorId: Meteor.userId(),
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
