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
    wordsArray = wordsArray.slice(0, grid.nbWordsRequired);

    // ESSAI avec un PC par game avec array
    var content = [];
    _.each(wordsArray, function(word, index, list){
      content.push({word: word, found: "false", position: index});
      // if(index == grid.nbWordsRequired) {
      //   return;
      // }
    });

    if(pcId = PlayerContents.findOne({gameId: gameId, playerId: user._id})){
       console.log("pc already exists");
      } else {
        pcId = PlayerContents.insert({
          playerId: user._id,
          gameId: gameId,
          gridId: gridId,
          content: content
        });
      }

    return pcId;
  },
  deletePlayerContents: function(gameId) {
    console.log("deletePlayerContents");
    var userId = Meteor.userId();

    PlayerContents.remove({
      playerId: userId,
      gameId: gameId
    });
  },
  deleteUnactivePlayerContents: function(gameId) {
    console.log("deleteUnactivePlayerContents");
    nbPCRemoved = PlayerContents.remove({
      gameId: gameId
    });
    return nbPCRemoved;
  },
  toggleFound: function(gameId, position) {
    console.log("toggleFound");
    var userId = Meteor.userId();
    var found;

    pc = PlayerContents.findOne({gameId: gameId, playerId: userId});
    console.log(pc);
    if (pc) {
      content = pc.content[position];
      console.log(content);
      if(content) {
        var found = content.found;
        found == "false" ? content.found = "true" : content.found = "false"

        pc = PlayerContents.update({_id:pc._id, 'content.position': position},
          {$set: {'content.$': content}});
      }
      return pc;
    }
  }
})

///// OBSERVERS /////////////////////////////////////////////////////////////////////

PlayerContents.startObservers = function startObservers(gameId) {
  PlayerContents.observer = PlayerContents.find({gameId: gameId})
  .observeChanges({
    //change: notifySubscribedUsers // or some other function
    changed: function(id, fields){
      console.log("PC observeChanges");
      console.log("FIELDS : ");
      console.log(  fields);
      var playerContent = PlayerContents.findOne(id);
      // create activity only for found contents
      if(fields.content){
        // Meteor.call('createActivity', content, function(error, activity_id){
        //   if(error)
        //     console.log("there's a pb");
        // });
        Meteor.call('checkBingo', fields.content, function(error, result) {
          if(error) {
            console.log(error.reason);
          } else {
            console.log(result)
            if (result) {
              Meteor.call('setWinner', playerContent.gameId, playerContent.playerId, function(error, gameId) {
                if(error) {
                  console.log(error.reason);
                };
              })
            }
          }
        })
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
