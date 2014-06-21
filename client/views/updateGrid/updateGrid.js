Template.updateGrid.helpers({
  tags: function() {
    if(grid = Grids.findOne({_id: this._id})){
      tags = grid.tags.join(",");
      return tags;
    };
  }
})

Template.updateGrid.events({
    'submit form': function(e, template){
        e.preventDefault();
        var user = Meteor.user();
        var gridId = template.data._id

        var tags = $(e.target).find('[name=tags]').val().split(",");
        if(tags == '') {
            tags = null;
        }
        console.log($(e.target).find('[name=title]').val());
        var grid = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val(),
            tags: tags
        }

        Meteor.call('updateGrid', gridId, grid, function(error, currentGridId){
            if (error){
                throwError(error.reason);
            }
        });
    }
})