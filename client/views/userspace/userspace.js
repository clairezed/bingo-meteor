Template.userspace.helpers({
  grids: function(){
    return Grids.find({'creator.id': Meteor.userId()}, {sort: {creationDate:-1}, limit:4}).map(function(grid, index) {
      grid.position = index;
      return grid;
    });
  }
});

Template.userspace.events({
  'click .delete-game': function(e){
    e.preventDefault();

    if(confirm("Do you really want to delete your sweet bingo, sugar ?")){
      var currentGridId = this._id;

      Meteor.call('deleteGrid', currentGridId, function(error){
        if (error)
          throwError(error.reason);
      })
    }
  }
})
