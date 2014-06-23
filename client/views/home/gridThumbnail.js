Template.gridThumbnail.helpers({
  games: function() {
    var games;
    if (games = Games.find({gridId: this._id})) {
      return games;
    }
  }
})

Template.gridThumbnail.events({
  'click .join-game':function(e) {
    e.preventDefault();
    console.log("join game");
    $('.games-creator-list').slideToggle();
  }
})