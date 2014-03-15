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
	createPlayerContents: function(game_id){
		var user = Meteor.user();
		if(!user)
				throw new Meteor.Error(401, "You need to login to add a word, sweetie");

		var game = Games.findOne(game_id);

		if(game == null)
				throw new Meteor.Error(422, "Oups, there's a problem wit finding your game...");

		var wordsArray = game.words;
		var nb_words = wordsArray.length;
		var indexes = [];
		for(i=1 ; i<= nb_words; i++){
			indexes.push(i);
		}
		var randomPos = _.shuffle(indexes);

		_.each(wordsArray, function(word, index, list){
			// add only words that haven't already been added
			if(!PlayerContents.findOne({content: word, player_id: user._id})){
				PlayerContents.insert({
				player_id: user._id,
				game_id: game_id,
				content: word,
				found: false,
				pos: randomPos[index]
			});
			}
		});

		return game_id;
	},
	deletePlayerContents: function(game_id){
		console.log("deletePlayerContents");
		var user = Meteor.user();
		PlayerContents.remove({
			player_id: user._id,
			game_id: game_id
		});
	},
	toggleFound: function(contentFound){
		var user = Meteor.user();
		if(contentFound.found){
			PlayerContents.update(
				{_id: contentFound._id}, 
				{$set: {found: false}}
			);
		}else{
			PlayerContents.update(
				{_id: contentFound._id}, 
				{$set: {found: true}}
			);
		}
		return contentFound;
	}
})
