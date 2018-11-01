// business logic ------
function Game () {
  this.player0 = new Player("Player 1");
  this.player1 = new Player("Player 2");
  this.currentPlayer = null;
  this.winner = null;
}

Game.prototype.start = function() {
  this.player0.clear();
  this.player1.clear();
  this.currentPlayer = this.player0;
  this.winner = null;
}

Game.prototype.switchPlayer = function() {
  if(this.currentPlayer === this.player0) {
    this.currentPlayer = this.player1;
  } else {
    this.currentPlayer = this.player0;
  }
}

Game.prototype.rollDice = function() {
  return (Math.floor((Math.random() * 6)) + 1);
}

function Player (name) {
  this.name = name,
  this.tally = 0,
  this.score = 0
}

Player.prototype.clear = function() {
  this.score = 0;
  this.tally = 0;
}

Player.prototype.hold = function() {
  this.score += this.tally;
  this.tally = 0;

  if(this.score >= 100) {
    return true;
  }
  return false;
}

Player.prototype.roll = function(value) {
  if (value === 1) {
    this.tally = 0;
    return false;
  } else {
    this.tally += value;
    return true;
  }
}

//user interfacae ----------
game = new Game();

function displayRoll (value) {
  $("#dice").text(value);
}

function displayPlayer (selector, player, active) {
  var tallySelector = selector + " .tally";
  $(tallySelector).text(player.tally);
  var scoreSelector = selector + " .score";
  $(scoreSelector).text(player.score);
  if(active) {
    $(selector).removeClass("inactive");
  } else {
    $(selector).addClass("inactive");
  }
}

function displayWinner (name) {
  $("#start").text("REPLAY");
  $("#winner-text").text("THE WINNER IS");
  $("#winner-name").text(name);
  $("#winner-board").show();
}

function displayStart () {
  displayPlayer("#player0", game.player0, false);
  displayPlayer("#player1", game.player1, false);
  $("#start").text("START");
  $("#winner-text").text("press to play");
  $("#winner-board").show();
}
function getPlayerSelector (player) {
  if (player === game.player0){
    return "#player0";
  }else {
    return "#player1";
  }
}

$(function() {
  displayStart();

  $("#start").click(function() {
    game.start();
    displayPlayer("#player0", game.player0, false);
    displayPlayer("#player1", game.player1, false);
    displayPlayer("#player0", game.player0, true);
    $("#hold").hide();
    $("#winner-board").hide();
  });

  $("#roll").click(function() {
    roll = game.rollDice();
    displayRoll(roll);

    if(game.currentPlayer.roll(roll)) {
      var selector = getPlayerSelector(game.currentPlayer);
      displayPlayer(selector, game.currentPlayer, true);
      $("#hold").show();
    } else {
      var selector = getPlayerSelector(game.currentPlayer);
      displayPlayer(selector, game.currentPlayer, false);
      game.switchPlayer();
      var selector = getPlayerSelector(game.currentPlayer);
      displayPlayer(selector, game.currentPlayer, true);
    }
  });

  $("#hold").click(function() {
      $("#hold").hide();
    if(game.currentPlayer.hold()) {
      displayWinner(game.currentPlayer.name);
    } else {
      var selector = getPlayerSelector(game.currentPlayer);
      displayPlayer(selector, game.currentPlayer, false);
      game.switchPlayer();
      var selector = getPlayerSelector(game.currentPlayer);
      displayPlayer(selector, game.currentPlayer, true);
    }
  });
});
