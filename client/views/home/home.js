Template.latestGridsList.helpers({
  readyGrids: function(){
    return Grids.find({ready: true});
  }
});

Template.home.events({

})

