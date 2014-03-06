Words = new Meteor.Collection('words');

Words.allow({
	insert: function(userId, doc){
		return !! userId;
	}, 
	remove: function(userId, doc){
		return !! userId;
	}
})


Meteor.methods({
	createWord: function(wordAttributes){
		var user = Meteor.user();

		if(!user)
				throw new Meteor.Error(401, "You need to login to add a word, sweetie");
		if(!wordAttributes.word)
				throw new Meteor.Error(422, "Aren't you trying to add a blank tile ?");

		var word = _.extend(_.pick(wordAttributes, 'word', 'game_id'), {
			created_at: new Date().getTime(),
			updated_at: new Date().getTime(), 
			found_by: []
		});

		Words.insert(word);
		// increment corresponding game nb words
		var game = Games.findOne(word.game_id);
		
		var ready = game.nb_words+1 >= game.nb_words_required;
		Games.update(word.game_id, {$inc: {nb_words: 1}, $set: {ready: ready}});
		return word.game_id;
	}, 
	toggleFound: function(wordFound){

		var user = Meteor.user();
		if(_.contains(wordFound.found_by, user._id)){
			Words.update(
				{_id: wordFound._id}, 
				{$pull: {found_by: user._id}}
			);
		}else{
			Words.update(
				{_id: wordFound._id}, 
				{$addToSet: {found_by: user._id}}
			);
		}
		
	
	}
})
