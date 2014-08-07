Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});


Router.map(function(){
  this.route('home', {
    path: '/',
    template: 'home',
    waitOn: function() {
      Meteor.subscribe('visibleGrids');
      Meteor.subscribe('visibleGames');
    }
  });
  this.route('information', {
    path: '/information',
    template: 'information'
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
    waitOn: function() {
      Meteor.subscribe('userGrids', Meteor.userId()),
      Meteor.subscribe('visibleGames');
    }
  });

  this.route('allBingos', {
    path: '/bingo/all',
    template: 'allBingos',
    waitOn: function() {
      Meteor.subscribe('visibleGrids'),
      Meteor.subscribe('visibleGames');
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
      Meteor.subscribe('grid', this.params._id),
      // TODO : check what's the use of following :
      Meteor.subscribe('gridGames', this.params._id);
    },
    data: function(){
      return Grids.findOne({_id: this.params._id});
    }
  });

  this.route('playGame', {
    path: '/bingo/:_id/game/:gameId',
    template: 'playGame',
    onRun: function() {
      pc = PlayerContents.findOne({gameId: this.params.gameId, playerId: Meteor.userId()})
      if (this.data().game && !pc) {
        Meteor.call('createPlayerContents', this.params._id, this.params.gameId, function (error, result) {
        });
      }
    },
    onBeforeAction: function() {
      if (this.data().game) {
        var userIds = this.data().game.players;
        this.subscribe('gamePlayers', userIds).wait();
      }
    },
    waitOn: function() {
      Meteor.subscribe('game', this.params.gameId),
      Meteor.subscribe('grid', this.params._id),
      Meteor.subscribe('playerContents', this.params.gameId),
      Meteor.subscribe('gameShouts', this.params.gameId);
    },
    data: function() {
      return {
        grid: Grids.findOne({_id: this.params._id}),
        game: Games.findOne({_id: this.params.gameId})
      };
    }
  })
});


var requireLogin = function(){
  if(!Meteor.user()){
    if(Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    }else{
      Router.go('authenticate');
    }
    this.stop();
  }
}


Router.onBeforeAction(requireLogin, {only: ['userspace', 'createGrid', 'updateGrid', 'fillGrid', 'playGame'] });
Router.onBeforeAction(function() { clearMessages() });
