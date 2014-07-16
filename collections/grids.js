Grids = new Meteor.Collection('grids');

Grids.allow({
  update: ownsDocument,
  remove: ownsDocument
})
Grids.deny({
  update:function(userId, grid, fieldNames) {
    return (_.without(fieldNames, 'title', 'nbWords').length > 0);
  }
})


Meteor.methods({
  createGrid: function(gridAttributes){
    var user = Meteor.user(),
    gridWithSameTitle = Grids.findOne({title: gridAttributes.title});

    if(!user)
      throw new Meteor.Error(401, "You need to login to create a bingo grid");

    if(!gridAttributes.title)
      throw new Meteor.Error(422, "Please be nice and give a title to your grid, sweetie");

    if(gridAttributes.title && gridWithSameTitle){
      throw new Meteor.Error(302,
        "Sorry Dude, a bingo grid with the same title already exists",
        gridWithSameTitle._id);
    }
    var grid = _.extend(_.pick(gridAttributes, 'title', 'description', 'tags'), {
      creator: {
        id: user._id,
        name: user.username
      },
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      words: [],
      nbWordsRequired: 25,
      ready: false
    });

    var gridId = Grids.insert(grid);

    return gridId;
  },
  updateGrid: function(gridId, gridAttributes) {
    var user = Meteor.user(),
    currentGrid = Grids.findOne(gridId);
    gridWithSameTitle = Grids.findOne({title: gridAttributes.title});

    if(!user)
      throw new Meteor.Error(401, "You need to login to create a bingo grid");

    if(!gridAttributes.title)
      throw new Meteor.Error(422, "Please be nice and give a title to your grid, sweetie");

    if(gridAttributes.title && gridWithSameTitle && (gridWithSameTitle =! currentGrid)){
      throw new Meteor.Error(302,
        "Sorry Dude, a bingo grid with the same title already exists",
        gridWithSameTitle._id);
    }

    var gridId = Grids.update(gridId, {
      title: gridAttributes.title,
      description: gridAttributes.description,
      tags: gridAttributes.tags
    });

    return gridId;
  },
  deleteGrid: function(gridId){
    var grid = Grids.findOne(gridId);
    Grids.remove(grid._id);
  },
  // args : grid_id / word
  addWord: function(gridId, word){
    var user = Meteor.user();
    if(!user)
      throw new Meteor.Error(401, "You need to login to add a word, sweetie");
    if(word =="")
      throw new Meteor.Error(422, "Aren't you trying to add a blank word ?");

    var grid = Grids.findOne(gridId);
    // TODO : automatise ready check ?
    var ready = grid.words.length + 1 >= grid.nbWordsRequired ;

    Grids.update(grid._id, {
      $set: {ready: ready},
      $addToSet: {words: word}
    });
    return grid._id;
  },
  removeWord: function(gridId, word){
    console.log("removeWord method");
    var grid = Grids.findOne(gridId);
    console.log(grid);
    // check if still enough words to play bingo
    // TODO : automatise ready check ?
    var ready = grid.words.length - 1 >= grid.nbWordsRequired ;
    Grids.update(grid._id, {
      $set: {ready: ready},
      $pull: {words: word}
    });
  }
})

