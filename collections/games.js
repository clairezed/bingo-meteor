Games = new Meteor.Collection('games');

Games.allow({
	update: ownsDocument,
	remove: ownsDocument
})
Games.deny({
	update:function(userId, game, fieldNames) {
		return (_.without(fieldNames, 'title', 'nb_words').length > 0);
	}
})


Meteor.methods({
	createGame: function(gameAttributes){
		var user = Meteor.user(),
			gameWithSameTitle = Games.findOne({title: gameAttributes.title});

		if(!user)
			throw new Meteor.Error(401, "You need to login to create a bingo game");

		if(!gameAttributes.title)
			throw new Meteor.Error(422, "Please be nice and give a title to your game, sweetie");

		if(gameAttributes.title && gameWithSameTitle){
			throw new Meteor.Error(302, 
				"Sorry Dude, a bingo game with the same title already exists", 
				gameWithSameTitle._id);
		}
		var game = _.extend(_.pick(gameAttributes, 'title'), {
			creatorId: user._id,
			created_at: new Date().getTime(),
			updated_at: new Date().getTime(), 
			words: [],
			nb_words_required: 5,
			winners: [],
			ready: false
		});

		var gameId = Games.insert(game);

		return gameId;
	},
	deleteGame: function(gameId){
		var game = Games.findOne(gameId);
		Words.remove({game_id: game._id});
		Games.remove(game._id);
	},
	// args : game_id / word
	createWord: function(args){
		var user = Meteor.user();
		if(!user)
				throw new Meteor.Error(401, "You need to login to add a word, sweetie");
		if(args.word =="")
				throw new Meteor.Error(422, "Aren't you trying to add a blank tile ?");

		var game = Games.findOne(args.game_id);
		var ready = game.words.length + 1 >= game.nb_words_required;

		Games.update(game._id, {
			$set: {ready: ready}, 
			$addToSet: {words: args.word}
		});
		return game._id;
	}, 
	deleteWord: function(args){
		var game = Games.findOne(args.game_id);
		// check if still enough words to play bingo
		var ready = game.words.length - 1 >= game.nb_words_required;
	        	Games.update(game._id, {
	        		$set: {ready: ready}, 
	        		$pull: {words: args.word}
	        	});
	},
	checkBingo: function(foundContents){
		console.log("Check BINGOS");

		var playerFoundCases = foundContents.founds;

		var bingo = _.find(winCombinations, function(combi){
		      return (_.intersection(combi, playerFoundCases).length == 5); 
		  });

		if (bingo != undefined) {
		  console.log("BIIIIINGO");
		  Games.update(foundContents.game_id, {
	        		$addToSet: {winners: foundContents.player_id}
	        	});
		}else{
		  console.log("not yet");
		}
	}
})

winCombinations = [
[1, 2, 3, 4, 5],          [6, 7, 8, 9, 10], 
[11, 12, 13, 14, 15], [16, 17, 18, 19, 20], 
[21, 22, 23, 24, 25], [1, 6, 11, 16, 21], 
[2, 7, 12, 17, 22],     [3, 8, 13, 18, 23],
[4, 9, 14, 19, 24],     [5, 10, 15, 20, 25], 
[1, 7, 13, 19, 25],     [5, 9, 13, 17, 21]
]
