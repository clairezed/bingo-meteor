ownsDocument = function(userId, doc) {
	return doc && doc.creatorId === userId;
}
