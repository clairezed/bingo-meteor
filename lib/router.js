Router.configure({
    layoutTemplate: 'layout', 
    loadingTemplate: 'loading', 
    waitOn: function() {
        return Meteor.subscribe('games');
    }
});


Router.map(function(){
    this.route('playerIntro', {path: '/'});
    this.route('addWords', {
        path: '/:_id/add-words',
        waitOn: function(){
            return Meteor.subscribe('words', this.params._id);
        },
        data: function(){
            return Games.findOne({_id: this.params._id}); }
    });
    this.route('playBingo', {
        path: '/:_id/play',
        waitOn: function(){
            return Meteor.subscribe('words', this.params._id);
        },
        data: function(){
            return Games.findOne({_id: this.params._id}); }
    });
});


var requireLogin = function(){
    if(!Meteor.user()){
        if(Meteor.loggingIn()){
            this.render(this.loadingTemplate);
        }else{
            this.render('accessDenied');
        }
        this.stop();
    }
}


Router.before(requireLogin, {only: 'addWords'});
Router.before(function() { clearErrors() });