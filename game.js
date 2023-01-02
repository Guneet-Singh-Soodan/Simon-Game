var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 1;
function nextSequence() {
    $("h1").text("Level " + level);
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
    audio.play();
}
var i = 0;
var keyIsPressed = false;
$(document).keypress(function () {
    nextSequence();
    $(document).unbind("keypress");
    keyIsPressed = true;
});
$(".btn").click(function () {
    if (keyIsPressed) {
        var userChosenColor = this.id;
        $("." + userChosenColor).addClass("pressed");
        setTimeout(function () { $("." + userChosenColor).removeClass("pressed"); }, 100);
        var audio = new Audio('sounds/' + userChosenColor + '.mp3');
        audio.play();
        if (userChosenColor === gamePattern[i] && i < gamePattern.length - 1) {
            i++;
        }
        else if (userChosenColor !== gamePattern[i]) {
            $("body").css("background-color", "red");
            setTimeout(function () { $("body").css("background-color", "#011F3F"); }, 100);
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();
            gamePattern = [];
            $("h1").text("Game Over, Press Any Key to Restart");
            level = 1;
            i = 0;
            $(document).keypress(function () {
                nextSequence();
                $(document).unbind("keypress");
            });
        }
        else {
            i = 0;
            setTimeout(nextSequence, 800);
        }
    }
});

