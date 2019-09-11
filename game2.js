var userClickedPattern = [];
var gamePattern = [];
var gameStarted = false;
var level = 1;

// event handler for keypresses to start game
$(document).keydown(function() {
  if (gameStarted == false) {
    gamePattern = [];
    nextSequence();
  }
  gameStarted = true;
});

// select btns and create function for game pattern
function nextSequence() {
  userClickedPattern = [];
  var buttonColors = ["blue", "green", "red", "yellow"];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  $("h1").text("Level " + level);

  level++;

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

// function for user input/ selected buttonColors
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animateButton(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// function to check user answer against computer answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      $("body").addClass("green");
      setTimeout(function() {
        $("body").removeClass("green");
      }, 200);
      setTimeout(nextSequence, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("GAME OVER <br> Press Any Key to Restart");
    gameStarted = false;
    level = 1;
  }
}

// function that plays corresponding sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function that animates corresponding button
function animateButton(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 200);
}
