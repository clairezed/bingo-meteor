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
			updated_at: new Date().getTime()
		});

		Words.insert(word);
		return word.game_id;
	}
})