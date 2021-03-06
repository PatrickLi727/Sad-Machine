var Game = require("./game"),
    Ship = require("./ship"),
    Constants = require('./constants');

var GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.ship = this.game.addShip();
};

GameView.prototype.bindKeyHandlers = function () {
  var ship = this.ship;
  var game = this.game;
  key("left", function() {
    ship.power(Constants.CLOCKWISE);
      if (game.score.instructions !== "") {
        game.instructions();
      }
  });
  key("right", function() {
    ship.power(Constants.COUNTER_CLOCKWISE);
    if (game.score.instructions !== "") {
      game.instructions();
    }
  });
};

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  this.lastTime = 0;

  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.startObstacle = function() {
  var that = this;
  this.game.songLoaded = true;

  setTimeout(function() {
    that.addMusic();
    setInterval(function() {
      that.game.musicBounce();
      that.game.score.scaleScore();
    }, 1500);

  }, 2300);

  this.game.addObstacles();
  setInterval(this.game.reverse.bind(this.game), 6000);
  setInterval(this.game.addObstacles.bind(this.game), 3000);
};

GameView.prototype.addMusic = function() {
  document.getElementById('music').play();
};

GameView.prototype.animate = function(time){
  var timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
