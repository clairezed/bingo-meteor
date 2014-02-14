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
        before: function(){
            user = Meteor.user();
            console.log(user);
            user.playing = this.params._id;
        },
        waitOn: function(){
            console.log(this.params._id);
            return Meteor.subscribe('words', this.params._id),
            Meteor.subscribe('bingo_activities', this.params._id),
            Meteor.subscribe('users'),
            // Meteor.subscribe('players', this.params._id);
            Meteor.subscribe('players');
        },
        data: function(){
            return Games.findOne({_id: this.params._id}); 
        },
        unload: function(){
            user = Meteor.user();
            user.playing ="";
        }
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
