// Query Selector's

var welcomeDiv = document.querySelector("#welcome-card")
var gameStartDiv = document.querySelector("#question-card")
var questionTitle = document.querySelector(".question")


var timeEl = document.getElementById("timer")

// Global Variables

var currentQuestion = 0
var currentTime = 60

// Starts the Game, removes welcome screen, renders question screen.
function startGame(event) {
    welcomeDiv.classList.replace("card", "hidden")
    gameStartDiv.classList.replace("hidden", "card")

    // When the timer starts. I am presented with the first question [0].

    timer()
    nextQuestion(currentQuestion)
    console.log(questionTitle)
    // Function to create a question.
}


function timer() {
    var timerInterval = setInterval(function()  {
        currentTime--;
        timeEl.textContent = "Time left: " + currentTime + " seconds.";

        if (currentTime === 0) {
            clearInterval(timerInterval)
            // Later function
        }

    }, 1000);
}

function nextQuestion(i) {
    
    questionTitle.textContent += " " + "Test"

    var questionHeader = document.querySelectorAll(".answers");






    // When I click start I am given a question and 4 paragraphs to place my question.

    // The question will be increased upon completion of the question and selection an answer.
}




