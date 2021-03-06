SyncedCron.add({
  // Deletes unactive games and, as observers are set up, unactive player contents
  name: 'Delete unactive games',
  schedule: function(parser) {
    return parser.text('at 01:00 pm');
  },
  job: function() {
    console.log("STARTING DELAYED JOB");
    Meteor.call('deleteUnactiveGames', function(error, nbGamesDeleted){
      if (error){
        console.log(error.reason);
      }else{
        console.log("nbGamesDeleted :"+ nbGamesDeleted);
        return nbGamesDeleted;
      }
    })
  }
});
