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
    console.log(game);
    if(game.creator.id != userId){
      throw new Meteor.Error(422, "You can't delete a game you haven't created.");
    } else if (game.players.count) {
      throw new Meteor.Error(422, "You can't delete your game while there are still playing users");
    }

    Games.remove(game._id);
	}
// 	// args : game_id / word
// 	createWord: function(args){
// 		var user = Meteor.user();
// 		if(!user)
// 				throw new Meteor.Error(401, "You need to login to add a word, sweetie");
// 		if(args.word =="")
// 				throw new Meteor.Error(422, "Aren't you trying to add a blank tile ?");

// 		var game = Games.findOne(args.game_id);
// 		var ready = game.words.length + 1 >= game.nb_words_required;

// 		Games.update(game._id, {
// 			$set: {ready: ready},
// 			$addToSet: {words: args.word}
// 		});
// 		return game._id;
// 	},
// 	deleteWord: function(args){
// 		var game = Games.findOne(args.game_id);
// 		// check if still enough words to play bingo
// 		var ready = game.words.length - 1 >= game.nb_words_required;
// 	        	Games.update(game._id, {
// 	        		$set: {ready: ready},
// 	        		$pull: {words: args.word}
// 	        	});
// 	},
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

