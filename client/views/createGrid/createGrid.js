Template.createGrid.events({
    'submit form': function(e){
        e.preventDefault();
        var user = Meteor.user();

        var grid = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val(),
            tags: $(e.target).find('[name=tags]').val()
        }

        Meteor.call('createGrid', grid, function(error, currentGridId){
            if (error){
                throwError(error.reason);
            }else{
                Router.go('fillGrid', {_id: currentGridId});
            }
        });
    }
})
