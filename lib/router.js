Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('grids');
  }
});


Router.map(function(){
  this.route('home', {
    path: '/',
    template: 'home'
  });
  this.route('authenticate', {
    path: '/authenticate',
    template: 'authenticate'
  });
  this.route('login', {
    path: '/login',
    template: 'login'
  });
  this.route('signup', {
    path: '/signup',
    template: 'signup'
  });
  this.route('userspace', {
    path: '/user',
    template: 'userspace',
    data: function(){
      return Meteor.user();
    }
  });
  this.route('createGrid', {
    path: '/bingo/new',
    template: 'createGrid'
  });
  this.route('updateGrid', {
    path: '/bingo/:_id/update',
    template: 'updateGrid',
    waitOn: function() {
      Meteor.subscribe('grid', this.params._id);
    },
    data: function(){
      return Grids.findOne({_id: this.params._id});
    }
  });
  this.route('fillGrid', {
    path: '/bingo/:_id/fill',
    template: 'fillGrid',
    waitOn: function() {
      Meteor.subscribe('userGames', Meteor.userId());
    },
    data: function(){
      return Grids.findOne({_id: this.params._id});
    }
  });
  this.route('playGame', {
    path: '/bingo/:_id/game/:gameId',
    template: 'playGame',
    onRun: function() {
      if (this.data().game) {
        Meteor.call('createPlayerContents', this.params._id, this.params.gameId, function (error, result) {
            // Meteor.call('setPlayingUsers', gameId, function (error, result) {});
        });
      }
    },
    waitOn: function() {
      Meteor.subscribe('game', this.params.gameId),
      Meteor.subscribe('playerContents', this.params.gameId);
    },
    data: function() {
      return {
        grid: Grids.findOne({_id: this.params._id}),
        game: Games.findOne({_id: this.params.gameId})
      };
    }
  })




//     this.route('addWords', {
//         path: '/:_id/add-words',
//         data: function(){
//             return Games.findOne({_id: this.params._id}); }
//         });
//     this.route('playBingo', {
//         path: '/:_id/play',
//         onRun: function(){
//             var game_id = this.params._id;
//             Meteor.call('createPlayerContents', game_id, function (error, result) {
//                 Meteor.call('setPlayingUsers', game_id, function (error, result) {});
//             });
//         },
//         waitOn: function(){
//             return [
//             Meteor.subscribe('bingo_activities', this.params._id),
//             Meteor.subscribe('player_contents', this.params._id),
//             Meteor.subscribe('players', this.params._id),
//             Meteor.subscribe('player_found_contents'),

//             ];
//         },
//         data: function(){
//             return Games.findOne({_id: this.params._id});
//         },
//         onStop: function(){
//             Meteor.call('deletePlayerContents',  this.params._id, function (error, result) {});
//             Meteor.call('unsetPlayingUsers',  this.params._id, function (error, result) {});
//             Meteor.call('removeWinnersWhenTheyLeave', this.params._id, function(error, result){});
//         }
//     });
});


// var requireLogin = function(){
//     if(!Meteor.user()){
//         if(Meteor.loggingIn()){
//             this.render(this.loadingTemplate);
//         }else{
//             this.render('accessDenied');
//         }
//         this.stop();
//     }
// }


// Router.onBeforeAction(requireLogin, {only: 'addWords, playBingo'});
// Router.onBeforeAction(function() { clearErrors() });
