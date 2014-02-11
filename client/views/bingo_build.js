var wordsData = [
    {
        word: "turlututu"
    },
    {
        word: "ukulele"
    },
    {
        word: "yorkshire"
    }
];
Template.bingoBuild.helpers({
    //words: wordsData
    words: function(){
        return Words.find();
    }
});
