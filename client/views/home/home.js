Template.latestGridsList.helpers({
  readyGrids: function(){
    return Grids.find({ready: true}, {sort: {creationDate:-1}, limit:4}).map(function(grid, index) {
      grid.position = index;
      return grid;
    });
  }
});

Template.home.events({

})

