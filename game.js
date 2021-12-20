var buttonColor = ["red","green","blue","yellow"];

var gamePattern =[];

var userClickPattern = [];

var started = false;

var level=0;

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");

    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);

    checkAnswer(userClickPattern.length-1);
});

$(document).keypress(function(){
    if(!started){
        $("level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChoosenColor = buttonColor[randomNumber];

    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);

}

function playSound(name){
    var audio =new Audio("sounds/"+name+".mp3");

    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $(currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (userClickPattern[currentLevel]=== gamePattern[currentLevel]){
        console.log("success");
        if (userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    level=0;
    gamePattern=[];
    started =false;
}