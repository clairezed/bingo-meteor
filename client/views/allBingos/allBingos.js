Template.allGridsList.helpers({
  readyGrids: function(){
    return Grids.find({ready: true}, {sort: {creationDate:-1}}).map(function(grid, index) {
      grid.position = index;
      return grid;
    });
  }
});