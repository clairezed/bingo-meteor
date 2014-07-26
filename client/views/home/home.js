Template.latestGridsList.helpers({
  readyGrids: function() {
    return Grids.find({ready: true}, {sort: {createdAt:-1}, limit:4}).map(function(grid, index) {
      grid.position = index;
      return grid;
    });
  },
  moreGrids: function() {
    return Grids.find({ready: true}).fetch().length > 4;
  }
});

Template.home.events({

})

