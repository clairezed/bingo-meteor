Template.userspace.helpers({
    grids: function(){
        var user = Meteor.user();
        if (user) {
            return Grids.find({creatorId: user._id});
        }
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
