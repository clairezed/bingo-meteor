Games = new Meteor.Collection('games');

Games.allow({
	update: ownsDocument,
	remove: ownsDocument
})
// Games.deny({
// 	update:function(userId, game, fieldNames) {
// 		return (_.without(fieldNames, 'title', 'nb_words').length > 0);
// 	}
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
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    });

    var gameId = Games.insert(game);

    return gameId;
  },
  launchGame: function(gameId) {
    console.log("call launchGame");
    Games.update(gameId, {$set: {preview: false}, $addToSet: {players: Meteor.userId()}});
    return gameId;
  },
  joinGame: function(gameId) {
    console.log("call joinGame");
    var game_id = Games.update(gameId, {$addToSet: {players: Meteor.userId()}});
    console.log(game_id);
    return gameId;
  },
  quitGame: function(gameId) {
    console.log("call quitGame");
    var userId = Meteor.userId();
    Games.update(gameId, {$pull: {players: userId}});
    PlayerContents.remove({gameId: gameId, playerId: userId});
  },
	deleteGame: function(gameId){
    console.log("call deleteGame");
		var game = Games.findOne(gameId);
    var userId = Meteor.userId();
    if(game.creator.id != userId){
      throw new Meteor.Error(422, "You can't delete a game you haven't created.");
    } else if (game.players.count) {
      throw new Meteor.Error(422, "You can't delete your game while there are still playing users");
    }

    Games.remove(game._id);
	}
// 	checkBingo: function(foundContents){
// 		var playerFoundCases = foundContents.founds;

// 		var bingo = _.find(winCombinations, function(combi){
// 		      return (_.intersection(combi, playerFoundCases).length == 5);
// 		  });

// 		if (bingo != undefined) {
// 		  console.log("BIIIIINGO");
// 		  Games.update(foundContents.game_id, {
// 	        		$addToSet: {winners: foundContents.player_id}
// 	        	});
// 		}
// 	},
// 	removeWinnersWhenTheyLeave: function(game_id){
// 		var user = Meteor.user();
// 		Games.update(game_id, {
//         		$pull: {winners: user._id}
//         	});
// 	}
})

winCombinations = [
[1, 2, 3, 4, 5],      [6, 7, 8, 9, 10],
[11, 12, 13, 14, 15], [16, 17, 18, 19, 20],
[21, 22, 23, 24, 25], [1, 6, 11, 16, 21],
[2, 7, 12, 17, 22],   [3, 8, 13, 18, 23],
[4, 9, 14, 19, 24],   [5, 10, 15, 20, 25],
[1, 7, 13, 19, 25],   [5, 9, 13, 17, 21]
]
