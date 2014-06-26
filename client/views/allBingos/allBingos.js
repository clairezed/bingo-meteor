Template.allGridsList.helpers({
  readyGrids: function(){
    return Grids.find({ready: true});
  }
});