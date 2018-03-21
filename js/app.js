$(document).ready(function() {

var questions = ["1.What is Earth's largest continent?",
"2.What river runs through Baghdad?",
"3.What country has the most natural lakes?",
"4.What is the driest place on Earth?",
"5.What is the only sea without any coasts?",
"6.Which African nation has the most pyramids?" ];

var answers = [4,1,2,3,4,2,2];

var answerInfo = ["Currently, Asia is Earth's largest continent at approximately 17,300,000 square miles (44,806,812 sq km). ",
"he Tigris river runs through Baghdad. It is about 1,150 miles (1,800 km) long. The name 'Tigris' comes from Old Persian and translates as 'the fast one'.", "Canada has more than half of all the natural lakes in the world. An impressive nine percent of the country is covered in fresh water.","The driest place on Earth: the McMurdo Dry Valleys in Antactica. It hasn't rained there for more than 2 million years!", "The Sargasso Sea is a region in the middle of the North Atlantic Ocean.", "Sudan is home to over 200 pyramids, more than twice that of Egypt."]

var answerPic = ["asia.png", "tigris.jpg", "canada.png",
"mcmurdo.jpg", "sargassosea.png", "sudan.png"]

var boxOneChoices = ["Europe", "Tigris","Australia", "Sahara Desert","Mediterranean Sea","Libya"];

var boxTwoChoices = ["Antartica", "Jordan", "Canada", "Kufra, Libya", "Sargasso Sea","Sudan"];

var boxThreeChoices = ["Africa","Euphrates","India", "McMurdo, Antartica", "Adriatic Sea","Egypt"];

var boxFourChoices = ["Asia", "Karun", "United States", "Atacama, Desert", "Celebes Sea", "Algeria"];

var i = 0;
var guess = 1;
var madeGuess = 0;
var time = 1500;
var timeBetween = 7;
var wins = 0;
var losses = 0;
var unanswered = 0;
var timerExp = 0;
var pointsEnabled = 0;
var points = 0;
var totalPointsEarned = 0;

$(".begin").hide();
$(".answerConfirmation").hide();
$(".summary").hide();
$(".answer").hide();
$(".pointsArea").hide();


$("#geography").click(function() {
	$("body").css("background-image","url('images/background.jpg')");
	$(".begin").fadeIn();
	$(".chooseGame").fadeOut("slow");
	$(".summary").hide();
	$(".answer").hide();
	$("#timer").fadeIn("slow");
	$("#pointsMode").hide();
	i = 20;
	nextQuestion();
});


$("#pointsMode").click(function() {
	if (pointsEnabled === 0) {
		pointsEnabled = 1;
		$(".pointsArea").fadeIn("slow");
		 }
	else { pointsEnabled = 0;
		$(".pointsArea").fadeOut("slow"); }
});


$("#boxOne").click(function() {
	$("#timer").html("");
	if (madeGuess === 0) {
		guess = 1;
		madeGuess = 1;
		checkAnswer(); }
});

$("#boxTwo").click(function() {
	$("#timer").html("");
	if (madeGuess === 0) {
		guess = 2;
		madeGuess = 1;
		checkAnswer(); }
});


$("#boxThree").click(function() {
	$("#timer").html("");
	if (madeGuess === 0) {
		guess = 3;
		madeGuess = 1;
		checkAnswer(); }
});

$("#boxFour").click(function() {
	$("#timer").html("");
	if (madeGuess === 0) {
		guess = 4;
		madeGuess = 1;
		checkAnswer(); }
});

$(".btn").mouseup(function() {
	$(this).blur();
});


function nextQuestion() {

	if (wins + losses + unanswered === 10) { gameOver(); }
	else {	madeGuess = 0;

			time = 1500;
			timeBetween = 7;
			$("#pointsEarned").hide();
			$(".answerConfirmation").fadeOut();
			$(".btn-info").hide();
			$(".btn-info").css("background-color", "pink");
			$(".btn-info").fadeIn();
			$("#questionArea").text(questions[i]);
			$("#boxOne").text(boxOneChoices[i]);
			$("#boxTwo").text(boxTwoChoices[i]);
			$("#boxThree").text(boxThreeChoices[i]);
			$("#boxFour").text(boxFourChoices[i]);
			$("#inBetween").html("");
			timer(); }
}


function timer () {
	intervalId = setInterval(count, 10);
}


function count () {
	if (time === 0) { clearInterval(intervalId);
					  unanswered++;
					  timerExp = 1;
					  checkAnswer(); }
	else if (time % 100 === 0) { $("#timer").html(time/100); }
	time--;
}

function checkAnswer() {
	clearInterval(intervalId);
	$("#timer").html("");
	if (pointsEnabled === 0) { $("#pointsEarned").hide(); }
	else { $("#pointsEarned").show(); }
	if (guess === answers[i]) {	$(".bg-success").fadeIn();
								$("#pointsEarned").css("color", "greenyellow");
								$("#pointsEarned").html("You earned " + time + " points for that question.");
								totalPointsEarned = totalPointsEarned + time;
								wins++; }


			$("#pointsEarned").css("color", "red");
			$("#pointsEarned").html("You lost -" + time + " points for that question.");
			totalPointsEarned = totalPointsEarned - time;
			$(".bg-danger").fadeIn();


			if (timerExp === 0) { losses++; }
			timerExp = 0;


function gameOver() {
	$("#timer").fadeOut("slow");
	$(".summary").fadeIn("slow");
	$(".begin").fadeOut("slow");
	$(".answerConfirmation").fadeOut("slow");
	clearInterval(intervalId);
	$("#wins").html(wins);
	$("#losses").html(losses);
	$("#unanswered").html(unanswered);
	$(".chooseGame").fadeIn("slow");
	$("#pointsMode").fadeIn("slow");
	$("#totalPointsEarned").html(totalPointsEarned);
	$(".pointsArea").hide();
	$("#pointsEarned").html("");
	$("#inBetween").html("");
	wins = 0;
	losses = 0;
	unanswered = 0;
	guess = 0;
	madeGuess = 0;
	i = 0;
	totalPointsEarned = 0;
	pointsEnabled = 0;
}

});
