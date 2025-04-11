let buttonColours = ["red", "green", "blue", "yellow"];

let gamePattern = [];

let userCllickedPatter = [];

function nextSequence() {
    let randomNumber = Math.floor(Math.random()*4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
};

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").on("click", function() {
    let userChosenColour = $(this).attr("id");

    userCllickedPatter.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
})

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}