Template.gridCreationBreadcrumb.helpers({
  canUpdatePresentation: function() {
    return Grids.findOne({_id: this._id}) ? true : false;
  },
  canFillGrid: function() {
    return Grids.findOne({_id: this._id}) ? true : false;
  }
})