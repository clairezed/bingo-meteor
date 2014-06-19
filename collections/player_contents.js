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

    if(grid == null)
      throw new Meteor.Error(422, "Oups, there's a problem with finding your game...");

    var wordsArray = _.shuffle(_.shuffle(grid.words));

    // ESSAI avec un PC par game avec array
    var content = [];
    _.each(wordsArray, function(word, index, list){
      content.push({word: word, found: "false", position: index});
    });

    if(pcId = PlayerContents.findOne({gameId: gameId, playerId: user._id})){
       // PlayerContents.update(pcId, {})
      } else {
        pcId = PlayerContents.insert({
          playerId: user._id,
          gameId: gameId,
          gridId: gridId,
          content: content
        });
      }


    // ESSAI avec un PC par mot
    // _.each(wordsArray, function(word, index, list){
    //   // add only words that haven't already been added
    //   if(pcId = PlayerContents.findOne({gameId: gameId, content: word, playerId: user._id})){
    //    // PlayerContents.update(pcId, {})
    //   } else {
    //     PlayerContents.insert({
    //       playerId: user._id,
    //       gameId: gameId,
    //       gridId: gridId,
    //       content: word,
    //       found: "false",
    //       pos: index
    //     });
    //   }
    // });
    // return gameId;

    return pcId;
  },
  deletePlayerContents: function(gameId){
    console.log("deletePlayerContents");
    var userId = Meteor.userId();

    PlayerContents.remove({
      playerId: userId,
      gameId: gameId
    });
  },
  toggleFound: function(gameId, position){
    console.log("toggleFound");
    var userId = Meteor.userId();
    var found;

    pc = PlayerContents.findOne({gameId: gameId, playerId: userId});
    content = pc.content[position];
    content.found == "false" ? content.found = "true" : content.found = "false"

    pc = PlayerContents.update({_id:pc._id, 'content.position': position},
      {$set: {'content.$': content}});

    // db.player_contents.update({_id: "Jra8uNizxddWc9vwx", 'content.position': 1}
    //   , {$set: {'content.$':{word: "truc", position: 1, found: "true"}}})


    // if(contentFound.found){
    //   PlayerContents.update(
    //     {_id: contentFound._id},
    //     {$set: {found: "false"}}
    //     );
    // }else{
    //   PlayerContents.update(
    //     {_id: contentFound._id},
    //     {$set: {found: "true"}}
    //     );
    // }
    // return contentFound;
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
