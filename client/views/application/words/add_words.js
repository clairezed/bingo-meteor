// var wordsData = [
//     {
//         word: "turlututu"
//     },
//     {
//         word: "ukulele"
//     },
//     {
//         word: "yorkshire"
//     }
// ];
Template.addWords.helpers({
    //words: wordsData
    games: function(){
        return Games.find();
    },
    words: function(){
        return Words.find();
    }
});

Template.addWords.events({
    'submit form': function(e){
        e.preventDefault();

        var word = {
            word: $(e.target).find('[name=word]').val(),
            game: $(e.target).find('[name=gameId]').val()
        }
        word._id = Words.insert(words);
        Router.go('addWords', game);
    }
})

Meteor.subscribe('games');
