Template.latestBingosList.helpers({
    ready_games: function(){
            return Games.find({ready: true});
    }
});

Template.home.events({
    
})
