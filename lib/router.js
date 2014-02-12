Router.configure({
    layoutTemplate: 'layout', 
    loadingTemplate: 'loading', 
    waitOn: function() {
        return Meteor.subscribe('words');
        return Meteor.subscribe('players');
        return Meteor.subscribe('games');
    }
});

Router.map(function(){
    this.route('playerIntro', {path: '/'}),
    this.route('setGameTitle', {
        path: '/:_id/game-title',
        data: function(){
            console.log(Players.findOne({_id: this.params._id}));
            return Players.findOne({_id: this.params._id}); }
    }), 
    this.route('addWords', {
        path: '/:_id/add-words',
        data: function(){
            console.log(Games.findOne({_id: this.params._id}));
            return Games.findOne({_id: this.params._id}); }
    })
});
