var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var start = false;

function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound("sounds/"+randomChoosenColour+".mp3");

    level = level+1;

    $("h1").text("Level "+level);
}

function playSound(name){
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }
    ,100)
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        // console.log("success");
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        // console.log("wrong");
        $("h1").text("Game over Press any key to restart");
        $("body").addClass("game-over");
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200)
        start = false;
        level = 0;
        gamePattern = [];
    }
}
$(".btn").click(function() {
    var userChoosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChoosenColour);

    playSound("sounds/"+userChoosenColour+".mp3");

    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(){
    if (!start) {
        nextSequence();
        start = true;
    }
})

if (window.innerWidth < 700){
    $(".startButton").removeClass("hidden");
    $("h1").text("Press Start to Start the game")
}

$(".startButton").click(function(){
    if (!start) {
        nextSequence();
        start = true;
    }
})

