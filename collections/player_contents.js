PlayerContents = new Meteor.Collection('player_contents');

PlayerContents.allow({
  insert: function(userId, doc){
    return !! userId;
  },
  remove: function(userId, doc){
    return !! userId;
  }
})


Meteor.methods({
  createPlayerContents: function(gridId, gameId){
    console.log("createPlayerContents");
    var user = Meteor.user();
    if(!user)
      throw new Meteor.Error(401, "You need to login to add a word, sweetie");

    var grid = Grids.findOne(gridId);
    console.log(grid);

    if(grid == null)
      throw new Meteor.Error(422, "Oups, there's a problem wit finding your game...");

    var wordsArray = _.shuffle(_.shuffle(grid.words));
    console.log(wordsArray);
    // var nb_words = wordsArray.length;
    // var indexes = [];
    // for(i=1 ; i<= nb_words; i++){
    //   indexes.push(i);
    // }
    // var randomPos = (indexes);

    _.each(wordsArray, function(word, index, list){
      // add only words that haven't already been added
      if(!PlayerContents.findOne({gameId: gameId, content: word, playerId: user._id})){
        PlayerContents.insert({
          playerId: user._id,
          gameId: gameId,
          gridId: gridId,
          content: word,
          found: "false",
          pos: index
        });
      }
    });

    return gameId;
  },
  deletePlayerContents: function(gameId){
    console.log("deletePlayerContents");
    var user = Meteor.user();
    PlayerContents.remove({
      playerId: user._id,
      gameId: gameId
    });
  },
  toggleFound: function(contentFound){
    console.log("toggleFound");
    var user = Meteor.user();
    if(contentFound.found){
      PlayerContents.update(
        {_id: contentFound._id},
        {$set: {found: "false"}}
        );
    }else{
      PlayerContents.update(
        {_id: contentFound._id},
        {$set: {found: "true"}}
        );
    }
    return contentFound;
  }
})

///// OBSERVERS /////////////////////////////////////////////////////////////////////

PlayerContents.startObservers = function startObservers(gameId) {
  PlayerContents.observer = PlayerContents.find({gameId: gameId})
  .observeChanges({
    //change: notifySubscribedUsers // or some other function
    changed: function(id, fields){
      var content = PlayerContents.findOne(id);
      // create activity only for found contents
      if(fields.found){
        Meteor.call('createActivity', content, function(error, activity_id){
          if(error)
            console.log("there's a pb");
        });
      };
      // update content founds
      // Meteor.call('addFound', content, function(error, player_found_content_id){
      //   if(error)
      //     console.log(error.reason);
      // })
    }
  });
};

PlayerContents.stopObservers = function stopObservers(gameId) {
  if(PlayerContents.observer) {
    PlayerContents.observer.stop(); // Call the stop
  }
};


// Trigger Somewhere else in the code
// PlayerContents.stopObservers(gameId);
// MyTool.doWorkOnPlayerContents(); // Some contrived work on the PlayerContents collection
// PlayerContents.startObservers();
