Template.gridThumbnail.helpers({
  games: function() {
    var games;
    if (games = Games.find({gridId: this._id})) {
      return games;
    };
  },
  canModifyGrid: function() {
    return this.creator.id == Meteor.userId();
  },
  positionIsOdd: function() {
    return this.position % 2 == 0;
  }
})

Template.gridThumbnail.events({
  'click .join-game-btn':function(e) {
    e.preventDefault();
    console.log("join game btn");
    $("#"+this._id+"").css('z-index', "10").slideToggle();
    $(".games-creator-list").not($("#"+this._id+"")).slideUp();
  }
})

Template.gridGamesList.helpers({
  canResumeGame: function() {
    return ((game = Games.findOne({_id: this._id, players: Meteor.userId()})) ? true : false);
  }
})

Template.gridGamesList.events({
  'click .join-game-btn':function(e, template) {
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
          throwMessage(error.reason, 'danger');
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