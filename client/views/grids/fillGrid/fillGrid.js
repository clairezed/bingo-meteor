Template.fillGrid.helpers({
  gameIsActive: function() {
    game = Games.findOne({creatorId: Meteor.userId(), gridId: this._id});
    return (game && game.preview == false);
  }
})

Template.fillGrid.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var gridId = template.data._id;
    var word = $(e.target).find('[name=word]').val();

    Meteor.call('addWord', gridId, word, function(error, currentGridId){
      if (error) {
        throwMessage(error.reason, 'danger');
      }
            //// clear input text
      $(e.target).find('[name=word]').val("");
    })
  },
  'click .delete-word': function(e, template) {
    e.preventDefault();
    var gridId = template.data._id;
    var word = $(e.target).prev().html();

    Meteor.call('removeWord', gridId, word, function(error){
      if(error)
        throwMessage(error.reason, 'danger');
    });
  },
    'click .preview-game': function(e, template) {
    e.preventDefault();
    var gridId = template.data._id;
    // var user = Meteor.user();
    var game = Games.findOne({creatorId: Meteor.userId(), gridId: gridId});

    if (game) {
      Router.go('playGame', {_id: gridId, gameId: game._id});
    } else {
      var game = {
          gridId: gridId,
          preview: true
      }
      console.log("createGame from preview-game")
      Meteor.call('createGame', game, function(error, gameId){
          if (error){
              throwMessage(error.reason, 'danger');
          }else{
              Router.go('playGame', {_id: gridId, gameId: gameId});
          }
      });
    }
  }
})
