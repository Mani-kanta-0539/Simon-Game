var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
// This is a simple Simon Game using jQuery and JavaScript.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

    });
 // This funstion checks the user's answer aganist the game.
    function checkAnswer(currentLevel) {
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        }else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
           
            startOver();
        }

    }
// This function generates the next sequence in the game.

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
// This function animates the button press effect.
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sound/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
