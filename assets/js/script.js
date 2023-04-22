// Query Selector's

var welcomeDiv = document.querySelector("#welcome-card")
var gameStartDiv = document.querySelector("#question-card")
var questionTitle = document.querySelector(".question")
var questionChoices = document.querySelector(".answers")


var timeEl = document.getElementById("timer")



// Global Variables

var currentQuestion = 0
var currentTime = 60

// Starts the Game, removes welcome screen, renders question screen.


function timer() {
    
    // Function to create a question.

    genQuestion(currentQuestion)

    var timerInterval = setInterval(function()  {
        currentTime--;
        timeEl.textContent = "Time left: " + currentTime + " seconds.";

        if (currentTime === 0) {
            clearInterval(timerInterval)
            // Later function
        }

    }, 1000);
}

// Used to generate the question, will return the correctChoice

function genQuestion(currentQ, correctChoice) {

    var choices = questions[currentQ].choices

    questionTitle.textContent = questions[currentQ].title
    
    // Used to gain the choices array.

    // I want to take choices[i] and replace the innertext of questionchoices children, all in a loop.
    for (i = 0; i < choices.length; i++) {       
        questionChoices.children[i].innerHTML = choices[i]
    }

    // function correctAnswer(event, selectedAnswer) {
    //     selectedAnswer = event.target.innerHTML

    //     if (selectedAnswer === correctChoice) {
    //         console.log("yes")
    //         console.log(currentQuestion)
    //     } else {
    //         console.log("nope")
    //         console.log(currentQuestion)
    //     }
    // }
    return correctChoice;
}

function correctAnswer(currentQ, correctChoice) {
    var correctChoice = questions[currentQ].answer
    console.log(correctChoice)
    return correctChoice;
}


questionChoices.addEventListener("click", function(event, selectedAnswer, correctChoice) {
    event.stopPropagation();
    if(event.target === event.currentTarget) {
        return;
    } else {
        var selectedAnswer = event.target.innerHTML;
        correctAnswer(currentQuestion, choice)
        console.log(choice)


    }
});

    // I want to take choices[i] and replace the innertext of questionchoices children, all in a loop.

    // When presented with my choices, i want to take the users choice and to test if it is true or false.


    // When I click start I am given a question and 4 paragraphs to place my question.

    // The question will be increased upon completion of the question and selection an answer.

function endScreen() {
    console.log("all over :(")
}

// Starts the Game, removes welcome screen, renders question screen.

function startGame(event) {
    welcomeDiv.classList.replace("card", "hidden")
    gameStartDiv.classList.replace("hidden", "card")

    // When the timer starts. I am presented with the first question [0].
    timer()
    // Function to create a question.
}