Template.configGrid.helpers({
  onUpdatePage: function() {

    return this._id;
  },
  hasPublicVisibility: function() {
    if(!this._id) {
      return true;
    }else if(grid = Grids.findOne({_id: this._id})){
      return grid.visibility == "public";
    };
  },
  hasPrivateVisibility: function() {
    if(grid = Grids.findOne({_id: this._id})){
      return grid.visibility == "private";
    };
  }
})

Template.configGrid.events({
  'click .delete-grid': function(e, template) {
    e.preventDefault();
    var gridId = template.data._id;

    Meteor.call('deleteGrid', gridId, function(error){
      if(error) {
        throwMessage(error.reason, 'danger');
      } else {
        throwMessage("Ok then, your bingo's been deleted !", 'success');
        Router.go('home');
      }
    });
  }
})

var helpData = {
  'visibility-help': {
    title: "About visibility ",
    message: "<strong>Public visibility :</strong> everyone can see your bingo. <br> <strong>Private visibility :</strong> only you, and people who have a direct link to your bingo, can see it.", //supports Markdown
    // url: "http://YOUR_URL_TO_ADDITIONAL_HELP",
    options: {
      placement: 'right'
    }
  },
  'another-help-name': {
    title: "another help document title ", //supports Markdown
    message: "another help document message",
    url: "http://YOUR_URL_TO_ADDITIONAL_HELP"
  },
}
InlineHelp.initHelp(helpData);