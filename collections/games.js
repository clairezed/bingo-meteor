Games = new Meteor.Collection('games');

Games.allow({
  update: ownsDocument,
  remove: ownsDocument
})
// Games.deny({
//  update:function(userId, game, fieldNames) {
//    return (_.without(fieldNames, 'title', 'nb_words').length > 0);
//  }
// })


Meteor.methods({
  createGame: function(gameAttributes) {
    console.log("call createGame");
    var user = Meteor.user();

    var players = (gameAttributes.preview ? [] : [Meteor.userId()]);

    var game = _.extend(_.pick(gameAttributes, 'gridId', 'preview'), {
      creator: {
        id: user._id,
        name: user.username
      },
      players: players,
      winner: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    var gameId = Games.insert(game);

    return gameId;
  },
  launchGame: function(gameId) {
    console.log("call launchGame");
    Games.update(gameId, {
      $set: {
        preview: false,
        updatedAt: new Date()
      },
      $addToSet: {players: Meteor.userId()}
    });
    return gameId;
  },
  joinGame: function(gameId) {
    console.log("call joinGame");
    var game_id = Games.update(gameId, {
      $set: { updatedAt: new Date() },
      $addToSet: {players: Meteor.userId()}
    });
    console.log(game_id);
    return gameId;
  },
  quitGame: function(gameId) {
    console.log("call quitGame");
    var userId = Meteor.userId();
    Games.update(gameId, {
      $set: { updatedAt: new Date() },
      $pull: {players: userId}
    });
    PlayerContents.remove({gameId: gameId, playerId: userId});
  },
  deleteGame: function(gameId) {
    console.log("call deleteGame");
    var game = Games.findOne(gameId);
    var userId = Meteor.userId();
    if(game.creator.id != userId){
      throw new Meteor.Error(422, "You can't delete a game you haven't created.");
    } else if (game.players.count) {
      throw new Meteor.Error(422, "You can't delete your game while there are still playing users");
    }

    PlayerContents.remove({gameId: game._id});
    Games.remove(game._id);
  },
  // Cron job
  deleteUnactiveGames: function() {
    // TODO : set good unactiveDelay
    var unactiveDelay = moment().subtract({ h:2})._d;
    console.log(unactiveDelay);
    console.log(Games.find({updatedAt: {$lt: unactiveDelay}}).fetch());
    nbGamesDeleted = Games.remove({updatedAt: {$lt: unactiveDelay}});
    return nbGamesDeleted;
  },

  checkBingo: function(playerContent) {
    console.log("call checkBingo");
    var foundPositions = _.map(_.where(playerContent, {found: "true"}), function(hash, index) {
      return hash.position + 1;
    });

    var bingo = _.find(winCombinations, function(combi){
          return (_.intersection(combi, foundPositions).length == 5);
      });

    if (bingo != undefined) {
      console.log("BIIIIINGO");
      return true;
    } else {
      return false;
    }
  },
  setWinner : function(gameId, playerId) {
    console.log("call setWinner");
    console.log(!Games.findOne(gameId).winner);
    if (!Games.findOne(gameId).winner) {
      Games.update(gameId, {
        $set: {
          winner: playerId,
          updatedAt: new Date()
        }
      });
    };
    return gameId;
  }
})

winCombinations = [
[1, 2, 3, 4, 5],      [6, 7, 8, 9, 10],
[11, 12, 13, 14, 15], [16, 17, 18, 19, 20],
[21, 22, 23, 24, 25], [1, 6, 11, 16, 21],
[2, 7, 12, 17, 22],   [3, 8, 13, 18, 23],
[4, 9, 14, 19, 24],   [5, 10, 15, 20, 25],
[1, 7, 13, 19, 25],   [5, 9, 13, 17, 21]
]


// ====== OBSERVERS ====================== //

Games.startObservers = function startObservers(gameId) {
  // Games.observer = Games.find(gameId).observeChanges({
  //   changed: function(id, fields) {
  //     console.log("FIELDS");
  //     console.log(fields);
  //     if (fields.winner) {
  //       // throw new Meteor.Error(422, "There's a bingo");
  //       var winner = Meteor.users.findOne(fields.winner);
  //       console.log("winner iiiis : ");
  //       console.log(winner);
  //     }
  //   }
  // })
  Games.observer = Games.find(gameId).observe({
    removed: function(oldGame) {
      console.log('GAME REMOVED');
      console.log(oldGame);
      Meteor.call('deleteUnactivePlayerContents', oldGame._id, function(error, nbPlayerContentsDeleted) {
        if(error) {
          console.log(error.reason);
        } else {
          console.log("nbPlayerContentsDeleted : "+nbPlayerContentsDeleted);
        }
      })
    }
  })
}

Games.stopObservers = function stopObservers(gameId) {
  if(Games.observer) {
    Games.observer.stop();
  }
};