Template.configGrid.helpers({
  hasPublicVisibility: function() {
    if(grid = Grids.findOne({_id: this._id})){
      return grid.visibility == "public";
    };
  },
  hasPrivateVisibility: function() {
    if(grid = Grids.findOne({_id: this._id})){
      return grid.visibility == "private";
    };
  }
})