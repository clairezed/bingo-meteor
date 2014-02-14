Games = new Meteor.Collection('games');

Games.allow({
	insert: function(userId, doc){
		return !! userId;
	},
	remove: function(userId, doc){
		return !! userId;
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
			updated_at: new Date().getTime()
		});

		var gameId = Games.insert(game);

		return gameId;
	},
	deleteGame: function(gameId){
		console.log("in delete method");
		var game = Games.findOne(gameId);
		console.log(game._id);
		Words.remove({game_id: game._id});
		Games.remove(game._id);
	}
})
