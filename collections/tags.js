Tags = new Meteor.Collection('tags');

Tags.deny({
    update: function() {
        return true;
    },
    insert: function() {
        return true;
    },
    remove: function() {
        return true;
    }
})

Meteor.methods({

    /**
     * Creates a new tag
     *
     * @param tag : json object containing the parameters required to create a new tag
     * @return : id of the new tag
     */
    createTag: function(tag) {
        console.log('createTag ; tag\'s name : ' + tag);

        var newTag = {
            name: tag
        }
        var tagId = Tags.insert(newTag);

        return tagId;
    },

    /**
     * Adds an existing tag to an existing slideshow
     *
     * @param id : id of the tag
     * @param slideshowId : id of the slideshow
     */
//     addSlideshow: function(id, slideshowId) {
//         console.log('addSlideshow (adds a tag to a slideshow) ; tags\'id : ' + id + ', slideshow\'s id : ' + slideshowId);

//         Tags.update(id, {
//             $addToSet: {slideshows: slideshowId}
//         });

//         Slideshows.update(slideshowId, {
//             $addToSet: {tags: id}
//         });
//     }
});