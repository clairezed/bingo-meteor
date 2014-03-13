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
		console.log("create player contents");
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
	// , 
	// deletePlayerContents: function(word){game_id
	// 	 var game = Games.findOne(word.game_id);

	// 	 // check if still enough words to play bingo
	// 	 var ready = game.nb_words-1 >= game.nb_words_required;
 //        	Games.update(word.game_id, {$inc: {nb_words: -1}, $set: {ready: ready}});
 //    		Grids.remove(word._id);
	// },
	toggleFound: function(contentFound){
		var user = Meteor.user();
		console.log("beginning : "+contentFound.found)
		if(contentFound.found === true){
			console.log("i'm true !" + contentFound.found);
			PlayerContents.update(
				{_id: contentFound._id}, 
				{$set: {found: false}}
			);
			console.log("I should be false "+contentFound.found);
		}else{
			PlayerContents.update(
				{_id: contentFound._id}, 
				{$set: {found: true}}
			);
		}
		return contentFound.found;
		// if(_.contains(contentFound.found_by, user._id)){
		// 	PlayerContents.update(
		// 		{_id: contentFound._id}, 
		// 		{$pull: {found_by: user._id}}
		// 	);
		// 	return false;
		// }else{
		// 	PlayerContents.update(
		// 		{_id: contentFound._id}, 
		// 		{$addToSet: {found_by: user._id}}
		// 	);
		// 	return true;
		// }

	}
})
