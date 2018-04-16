$(document).ready(function () {
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 15;
    var intervalID;
    var indexQandA = 0;
    var answered = false;
    var correct;
    var triviaGame = [{
        question: "What is Earth's largest continent?",
        answer: ["Europe","Antartica","Africa", "Asia"],
        correct: "3",
        image: ("img/asia.png")
    }, {
        question: "What river runs through Baghdad?",
        answer: ["Tigris","Jordan", "Euphrates", "Karun"],
        correct: "0",
        image: ("img/tigris.jpg")
    }, {
        question: "What place has the most natural lakes?",
        answer: ["Australia","Canada","India", "United States"],
        correct: "1",
        image: ("img/canada.png")
    }, {
        question: "Which African nation has the most pyramids?",
        answer: ["Libya", "Sudan", "Egypt", "Algeria"],
        correct: "1",
        image: ("img/sudan.png")
    }, {
        question: "What is the driest place on Earth?",
        answer: ["Sahara Desert", "Kufra, Libya", "McMurdo, Antartica", "Atacama, Desert"],
        correct: "2",
        image: ("img/mcmurdo.jpg")
    }, {
        question: "What is the only sea without any coasts?",
        answer: ["Mediterranean Sea", "Sargasso Sea", "Adriatic Sea", "Celebes Sea"],
        correct: "1",
        image: ("img/sargassosea.png")
    }];


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false;
        timeRemaining = 16;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');

            if (id === correct) {
                answered = true;
                $('.question').text("The answer is: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true;
                $('.question').text("You chose: " + triviaGame[indexQandA].answer[id] + " but the correct answer is: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
}

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("The correct answer is: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('You have ' + timeRemaining + ' seconds to choose');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("You answered correctly").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("You answered incorrectly!").css({
            'color': '#3D414F'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("You didn't answe the question").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">');
        indexQandA++;
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000);
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>Correct Answers: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>Incorrect Answers: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>Unanswered Questions: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();
    });

});
