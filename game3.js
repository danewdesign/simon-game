// required beginning variables
var gamePattern = [];
var userPattern = [];
var buttonColor = ["green", "red", "yellow", "blue"];
var gameStarted = false;
var level = 1;

/************************* COMPUTER ************************************/
// start game
$(document).keydown(function() {
  if (gameStarted == false) {
    gamePattern = [];
    nextSeq();
  }
  gameStarted = true;
});

// game pattern sequence
function nextSeq() {
  userPattern = [];

  $("h1").text("Level " + level);
  level++;

  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = buttonColor[randomNum];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColor);
}

/********************* PLAYER ********************************/
// user pattern sequence
$(".btn").click(function() {
  var userColor = $(this).attr("id");
  userPattern.push(userColor);

  playSound(userColor);
  animateButton(userColor);

  checkAnswer(userPattern.length - 1);
});

/**************************** FUNCTIONS **********************************/
//function to check user answer against Computer
function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userPattern.length === gamePattern.length) {
      $("body").addClass("green");
      setTimeout(function() {
        $("body").removeClass("green");
      }, 200);
      setTimeout(nextSeq, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("h1").html("GAME OVER <br> Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    gameStarted = false;
    level = 1;
  }
}

// function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function to animate button
function animateButton(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 100);
}
