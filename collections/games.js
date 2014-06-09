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
  createGame: function(gameAttributes){
    var game = _.extend(_.pick(gameAttributes, 'gridId', 'creatorId'), {
      players: [],
      winner: null,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    });

    var gameId = Games.insert(game);

    return gameId;
  },
// 	deleteGame: function(gameId){
// 		var game = Games.findOne(gameId);
// 		Games.remove(game._id);
// 	},
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

