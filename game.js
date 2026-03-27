
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


$(".btn").click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over-bg");
      $("h1").addClass("game-over-title");
      $("h1").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over-bg");
      }, 200);

      startOver();
    }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Function to play the sound
function playSound(x) {
    switch (x) {
        case "green":
            var audio = new Audio('sounds/green.mp3');
            audio.play();
        break;
        case "blue":
            var audio = new Audio('sounds/blue.mp3');
            audio.play();
        break;
        case "red":
            var audio = new Audio('sounds/red.mp3');
            audio.play();
        break;
        case "yellow":
            var audio = new Audio('sounds/yellow.mp3');
            audio.play();
        break;

        default: 
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();
            break;
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
