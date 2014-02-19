Router.configure({
    layoutTemplate: 'layout', 
    loadingTemplate: 'loading', 
    waitOn: function() {
        return Meteor.subscribe('games');
    }
});

Router.map(function(){
    this.route('playerIntro', {path: '/'}),
    this.route('addWords', {
        path: '/:_id/add-words',
        waitOn: function(){
            return Meteor.subscribe('words', this.params._id);
        },
        data: function(){
            console.log(Games.findOne({_id: this.params._id}));
            return Games.findOne({_id: this.params._id}); }
    })
});
