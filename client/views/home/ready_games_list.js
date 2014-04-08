Template.readyGamesList.helpers({
    ready_games: function(){
            return Games.find({ready: true});
    }
});

Template.readyGamesList.events({
    // 'click .delete-game': function(e){
    //     e.preventDefault();

    //     if(confirm("Do you really want to delete your sweet bingo, sugar ?")){
    //         var currentGameId = this._id;

    //         Meteor.call('deleteGame', currentGameId, function(error){
    //             if (error)
    //                 throwError(error.reason);

    //             Router.go('playerIntro');
    //         })
    //     }
    // }
})
