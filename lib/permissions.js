ownsDocument = function(userId, doc) {
	console.log(doc);
	return doc && doc.creatorId === userId;
}