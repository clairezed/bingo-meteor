Template.layout.helpers({

});

Template.layout.events({
    'click .disconnect': function(e){
        e.preventDefault();
        Meteor.logout(function(error) {
            if (error) {
                console.log("error while disconnecting");
                throwMessage(error.reason, 'danger');
            }else{
                Router.go('home');
            }
        });
    }
})

// Define here so that InlineHelp.initHelp is called onl once
// and every popover helper is accessible
var helpData = {
  'visibility-help': {
    title: "About visibility ",
    message: "<strong>Public visibility :</strong> everyone can see your bingo. <br> <strong>Private visibility :</strong> only you, and people who have a direct link to your bingo, can see it.", //supports Markdown
    // url: "http://YOUR_URL_TO_ADDITIONAL_HELP",
    options: {
      placement: 'right'
    }
  },
  'delete-grid-help': {
    title: "Wanna delete your bingo ?",
    message: "Oh dear, would you really want to delete a grid that is currently being played ?",
    options: {
      placement: 'right'
    }
  },
  'delete-game-help': {
    title: "Wanna delete your game ?",
    message: "How rude ! You can't delete your game while there are other sweet people playing !",
    options: {
      placement: 'right'
    }
  },
  'shout-help': {
    title: "Shout out loud !",
    message: "Wanna say something to the whole world ? Anything you type in here will be visible to every player for a few seconds.",
    options: {
      placement: 'right'
    }
  }
}
InlineHelp.initHelp(helpData);