Template.configGrid.helpers({
  onUpdatePage: function() {
    return this._id;
  },
  canDeleteGrid: function() {
    if(this) {
      if (gridGames = Games.find({gridId: this._id})) {
        console.log(gridGames.count());
        return gridGames.count() == 0;
      };
    };
    return false;
  },
  hasPublicVisibility: function() {
    if(!this._id) {
      return true;
    }else if(grid = Grids.findOne({_id: this._id})){
      return grid.visibility == "public";
    };
  },
  hasPrivateVisibility: function() {
    if(grid = Grids.findOne({_id: this._id})){
      return grid.visibility == "private";
    };
  }
})

Template.configGrid.events({
  'click .delete-grid': function(e, template) {
    e.preventDefault();
    var gridId = template.data._id;

    Meteor.call('deleteGrid', gridId, function(error){
      if(error) {
        throwMessage(error.reason, 'danger');
      } else {
        throwMessage("Ok then, your bingo's been deleted !", 'success');
        Router.go('home');
      }
    });
  }
})
