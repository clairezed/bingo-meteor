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
        data: function(){
            return Games.findOne({_id: this.params._id}); }
        });
    this.route('playBingo', {
        path: '/:_id/play',
        load: function(){
            var game_id = this.params._id;
            Meteor.call('createPlayerContents', game_id, function (error, result) {
                Meteor.call('setPlayingUsers', game_id, function (error, result) {});
            });
        },
        waitOn: function(){
            return [
            // Meteor.subscribe('words', this.params._id),
            Meteor.subscribe('bingo_activities', this.params._id),
            Meteor.subscribe('player_contents', this.params._id),
            Meteor.subscribe('players', this.params._id) 
            ];
        },
        data: function(){
            return Games.findOne({_id: this.params._id}); 
        },
        unload: function(){
            Meteor.call('unsetPlayingUsers',  this.params._id, function (error, result) {});
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
