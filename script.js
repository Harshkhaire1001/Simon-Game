var gamePattern=[];
var userClickPattern=[];

var buttonColors=["red","blue","green","yellow"];

var start=false;
var level=0;

$(document).keydown(function(){
    if(!start){
        $("h1").text("level "+level);
        nextSequence();
        start=true;
    }
});

$(".box").click(function(){
    var userClickColor=$(this).attr("id");
    userClickPattern.push(userClickColor);

    playSound(userClickColor);
    animatePress(userClickColor);

    checkAnswer(userClickPattern.length-1);
})

function nextSequence(){
    userClickPattern=[];

    level++;

    $("h1").text("Level "+level); 

    var digit=Math.random()*4;
    digit=Math.floor(digit);

    var randomColor=buttonColors[digit];
    gamePattern.push(randomColor);
   
   $("."+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
   
   playSound(randomColor);
}

function checkAnswer(currLevel){
    if(gamePattern[currLevel]===userClickPattern[currLevel]){
        console.log("Success");
        if(userClickPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        level=0;
        start=false;
        gamePattern=[];
    }
}

function playSound(name){
    var audio=new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },200);
}

// function userPattern(){
//     var userClickColor=$(this).attr("id");
//     userClickPattern.push(userClickColor);
//     playSound(userClickColor);
//     animatePress(userClickColor);
//     console.log(userClickPattern);
// }

// function showSequence(btnColor){
//     $("."+btnColor).addClass("pressed");
//     setTimeout(function(){
//          $("."+btnColor).removeClass("pressed");
//     },1000)
//     console.log(btnColor);
//     var audio=new Audio("./sounds/"+btnColor+".mp3");
//     audio.play();
// }

// $("."+randomColor).addClass("pressed");
// setTimeout(function(){
//     $("."+randomColor).removeClass("pressed");
// },1000);