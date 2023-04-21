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

function nextQuestion(currentQ) {
    
    questionTitle.textContent += " " + questions[currentQ].title
    // Used to gain the choices array.
    var choices = questions[currentQ].choices

    // I want to take choices[i] and replace the innertext of questionchoices children, all in a loop.

    for (i = 0; i < choices.length; i++) {       
        questionChoices.children[i].innerHTML = choices[i]
    }

    var correctChoice = questions[currentQ].answer

    
    questionChoices.addEventListener("click", function(event) {
        event.preventDefault()
        console.log(choices)

    });
    
    // function selectChoice(x) {
    //     if (choices[x] === correctChoice) {
    //         console.log("Well done!")
    //     } else {
    //         console.log("WR")
    //     }
    // }


    // I want to take choices[i] and replace the innertext of questionchoices children, all in a loop.

    // When presented with my choices, i want to take the users choice and to test if it is true or false.


    // When I click start I am given a question and 4 paragraphs to place my question.

    // The question will be increased upon completion of the question and selection an answer.
}


// Function to select the current 


