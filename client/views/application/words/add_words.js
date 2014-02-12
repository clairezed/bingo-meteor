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
