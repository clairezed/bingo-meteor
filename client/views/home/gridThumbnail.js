Template.gridThumbnail.helpers({
  games: function() {
    var games;
    if (games = Games.find({gridId: this._id})) {
      return games;
    };
  },
  canModifyGrid: function() {
    return this.creator.id == Meteor.userId();
  }
})

Template.gridThumbnail.events({
  'click .join-game-btn':function(e) {
    e.preventDefault();
    console.log("join game btn");
    $("#"+this._id+"").css('z-index', "10").slideToggle();
  }
})

Template.gridGamesList.helpers({
  canResumeGame: function() {
    console.log("trololo");
    return ((game = Games.findOne({gridId: this._id, players: Meteor.userId()})) ? false : true)
  }
})

Template.gridGamesList.events({
  'click .join-game':function(e, template) {
    e.preventDefault();
    console.log("join game");
    if(!Meteor.user()) {
      Router.go('authenticate');
    } else {
      var game = Games.findOne(template.data._id);
      var gridId = game.gridId;
      console.log(game);
      console.log(gridId)
      Meteor.call('joinGame', template.data._id, function(error, gameId){
        if (error){
          throwError(error.reason);
        }else{
          Router.go('playGame', {_id: gridId, gameId: gameId});
        }
      })

    }
  }
})

Template.gridThumbnail.rendered = function() {
  $('.games-creator-list').slideUp();
}