var buttonColours = ["red" , "green" , "yellow" , "blue"];
var gamePattern = [];
var userClickedPattern = []
var gameStarted = false;
var level = -1;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColur = buttonColours[randomNumber];
    gamePattern.push(randomChosenColur);
    console.log(gamePattern);
    var sound = new Audio("./sounds/" + randomChosenColur + ".mp3");
    sound.play();
    $("#" + randomChosenColur.trim()).fadeOut(100).fadeIn(100);
    level +=1 ;
    $("h1").text("Level " + level);

}


$(".btn").on("click" , (event) =>{
    if( gameStarted === true){
        var id = event.currentTarget.id;
        userClickedPattern.push(id);
        console.log("user " + userClickedPattern);
        var sound = new Audio("./sounds/" + id + ".mp3");
        sound.play();
        $("#" + id).addClass("pressed");
        setTimeout(() => {
            $("#" + id).removeClass("pressed");
        }, 100);
        if(userClickedPattern.length == gamePattern.length ){
            checkAnswer();
        }
    }
    
    else{
        alert("Start the game before pressing buttons");
    }
})


$(document).on("keydown" , () => {
    if(gameStarted === false){
        nextSequence();
        gameStarted = true;
    }
})


function checkAnswer(){
    if(arraysEqual(userClickedPattern, gamePattern)){
        console.log("you are correct")
        setTimeout(() => {
            nextSequence();
            userClickedPattern =[];
        }, 1000);
    }

    else{
        console.log("you are stupid");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
            startOver();
        }, 100);
    }
}


function arraysEqual(arr1 , arr2){
    for (let i = 0; i < arr2.length; i++) {
        if (arr2[i] !== arr1[i]) {
          return false;
        }
    }

    return true;

}

function startOver(){
    userClickedPattern =[];
    gamePattern = [];
    gameStarted = false;
    level = 0;
    $("h1").text("Game Over, Press Any Key To Restart");
}