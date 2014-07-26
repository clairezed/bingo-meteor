// Local (client-only) collection
Messages = new Meteor.Collection(null);

throwMessage = function(message, type) {
  console.log(message);
    var messageId = Messages.insert({message: message, seen: false, type: type});
    setTimeout(function() {
       deleteMessage(messageId);
    }, 5000);
}

clearMessages = function(){
    Messages.remove({seen: true});
}

deleteMessage = function(id) {
    Messages.remove(id);
}
