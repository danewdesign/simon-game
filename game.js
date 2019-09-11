/* SECTION global variables for user clicked pattern empty array,
game pattern empty array, status of game started, and start level of 1 */
var userClickedPattern = [];
var gamePattern = [];
var gameStarted = false;
var level = 1;

// SECTION document event handler to detect key presses
$(document).keydown(function() {
  // if game has not started, initiate game/nextSequence()
  if (gameStarted == false) {
    gamePattern = [];
    nextSequence();
  }
  // set game started to true
  gameStarted = true;

});

// SECTION event handler for when buttons are clicked
$(".btn").click(function() {
  // bind button id (which is a color) to variable userChosenColor and push this to userClickedPattern array
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //  plays sound and animates button for correct or incorrect user chosen color
  playSound(userChosenColor);
  animateButton(userChosenColor);
  // call function checkAnswer to check user clicked pattern vs game pattern
  checkAnswer(userClickedPattern.length - 1);
});

// SECTION function that checks user clicked pattern vs game pattern
function checkAnswer(currentLevel) {
  // if userClickedPattern is equal to gamePattern log success and continue to next if
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    // if userClickedPattern length is equal to gamePattern length, flash green background and
    // call nextSequence after 1 sec
    if (userClickedPattern.length === gamePattern.length) {
      $("body").addClass("green");
      setTimeout(function() {
        $("body").removeClass("green");
      }, 200);
      setTimeout(function() {
      nextSequence();
      }, 1000);
    }
  /* if not equal, change h1 to game over, play wrong sound, flash red background color, set game started to false
     and set level back to 1 (in other words, this restarts the game) */
  } else {
    $("h1").html("Game Over</br>Press Any Key to Restart");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    gameStarted = false;
    level = 1;
  }
}

// SECTION function that initiates the game
function nextSequence() {
  // empty userClickedPattern array
  userClickedPattern = [];
  // variable for button colors
  var buttonColors = ["red", "blue", "green", "yellow"];
  // variable to generate random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  // variable to set randomChosenColor equal to correct buttonColors array index
  var randomChosenColor = buttonColors[randomNumber];
  // select h1 element and set to current level
  $("h1").text("Level " + level);
  // increase level variable by 1
  level++;
  // push the randomChosenColor to end of gamePattern array
  gamePattern.push(randomChosenColor);
  // select id of randomChosenColor and add fadeIn and fadeOut effect
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // play sound that corresponds with randomChosenColor
  playSound(randomChosenColor);
}

// SECTIONS function that plays correct sound for button clicked
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// SECTION function that animates button that was clicked
function animateButton(name) {
  $("#" + name).addClass("pressed");

  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 100);
}
