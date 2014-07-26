Template.configGrid.helpers({
  onUpdatePage: function() {

    return this._id;
  },
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