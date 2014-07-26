Template.userspace.helpers({
  grids: function(){
    return Grids.find({'creator.id': Meteor.userId()}, {sort: {creationDate:-1}, limit:4}).map(function(grid, index) {
      grid.position = index;
      return grid;
    });
  }
});
