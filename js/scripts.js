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
  this.score = 122;
  this.tally = 34;
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
    this.tally = 0
    return false
  } else {
    this.tally += value;
    return true;
  }
}

//user interfacae ----------
game = new Game();

function displayRoll (value) {
  //number or dice pic
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
  // display currentplay winner
  // set replay button label
  //display winnerbox
}

function displayStart () {
  displayPlayer("#player0", game.player0, false);
  displayPlayer("#player1", game.player1, false);
  $("#start").text("START");
  $("#winner-text").text("press to play");
  $("#winner-board").show();
}

$(function() {
  displayStart();

  $("#start").click(function() {
    console.log("start");
    game.start();
    displayPlayer("#player0", game.player0, false);
    displayPlayer("#player1", game.player1, false);
    displayPlayer("#player0", game.player0, true);
    $("#hold").hide();
    $("#winner-board").hide();
  });

  $("#roll").click(function() {
    roll = game.rollDice();
    // display roll
    // display displayInactivePlayer(currentPlayer)

    if(game.currentPlayer.roll(roll)) {
      //show hold button
    } else {
      game.switchPlayer();
      // display displayActivePlayer(currentPlayer)
    }
  });

  $("#hold").click(function() {
    //hide hold button
    if(game.currentPlayer.hold()) {
      // display winner board with currentPlayer
    } else {
      // display displayInactivePlayer(currentPlayer)
      game.switchPlayer();
      // display displayActivePlayer(currentPlayer)
    }
  });
});
