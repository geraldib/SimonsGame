var buttonColours = ["red", "blue" , "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var hasGameStarted = 0;

var level = 0;


//user choice
$(".btn").on( "click", function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

}); 



function checkAnswer(currentLevel){
    //wwiiining condition
	if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
         console.log("You are right");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

	}

	//when you loose
	else{
         console.log("Wrong chapo!!");
         var audio = new Audio('sounds/wrong.mp3');
	     audio.play();
	     $("body").addClass("game-over");

	     setTimeout(function() {
       $("body").removeClass("game-over");
   }, 200);

	     $("h1").text("Game Over, Press A key to continue...");
	     startOver();

	}
  
}

//restart game
function startOver(){

	level = 0;
	gamePattern = [];
    userClickedPattern = [];
    hasGameStarted = 0;

}



//random picks another color 
function nextSequence(){
     
     userClickedPattern = [];

	 var randomNumber = Math.floor(Math.random() * 4);
	 var randomChosenColour = buttonColours[randomNumber];
	 gamePattern.push(randomChosenColour);

	 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

     playSound(randomChosenColour);

     //levels
     level++;
     $("h1").text("level "+level);
	 
}

//plays sounds====
function playSound(name){

	var audio = new Audio('sounds/'+name+'.mp3');
	audio.play();

}

//animates pressed buttons==
function animatePress(colorPress){
      
    $("#" + colorPress).addClass("pressed");

      setTimeout(function() {
       $("#" + colorPress).removeClass("pressed");
   }, 100);

}

//starts the game listens for keypress
$(document).keypress(function(event) {

	if (hasGameStarted == 0) {
        if ( event.key === 'a' ) {
            nextSequence();
            hasGameStarted++;

        }

      }

    });


$(".start").click(function(){
  
    if (hasGameStarted == 0) {
      nextSequence();
      hasGameStarted++;
    }

});

