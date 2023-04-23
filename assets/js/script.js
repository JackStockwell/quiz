// Query Selector's

var welcomeDiv = document.querySelector("#welcome-card")
var gameStartDiv = document.querySelector("#question-card")
var questionTitleDiv = document.querySelector(".question")
var questionChoicesDiv = document.querySelector(".answers")
var questionResponseDiv = document.querySelector(".response")


var timeEl = document.getElementById("timer")



// Global Variables

var currentQuestion = 0
var currentTime = 60
var score = 0

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

function genQuestion(currentQ) {

    if (currentQ >= 5) {
        endScreen()
    } else {
        // Sets the title div to be the current question title.
        questionTitleDiv.textContent = questions[currentQ].title
        
        // Used to gain the choices array.
        var choices = questions[currentQ].choices

        // I want to take choices[i] and replace the innertext of questionchoices children, all in a loop.
        for (i = 0; i < choices.length; i++) {       
            questionChoicesDiv.children[i].innerHTML = choices[i]
        }
    }
}

function genResponse(response) {
    
    var correctChoice = questions[currentQuestion].answer

    var alertTime = 2;
    var timerInterval = setInterval(function()  {
        alertTime--;

        if (currentTime !== 0) {
            questionResponseDiv.textContent = ""
        } else {
            clearInterval(timerInterval)

        }

    }, 1000);
}






questionChoicesDiv.addEventListener("click", function(event, selectedAnswer) {
    event.stopPropagation();
    if(event.target === event.currentTarget) {
        return;
    } else {
        var selectedAnswer = event.target.innerHTML;
        var correctChoice = questions[currentQuestion].answer

        if (correctChoice === selectedAnswer) {
            console.log("Yippe!")
            currentQuestion++;
            genQuestion(currentQuestion)
        } else {
            console.log("Woops")
            currentQuestion++;
            genQuestion(currentQuestion)
        }

        genResponse()

        // var genResponse = function() {

        //     var response = 
    
        //     if (response === "correct") {
        //         response = "Correct!"
        //     } else {
        //         response = "Incorrect!"
        //     }

        //     var alertTime = 2;
        //     var timerInterval = setInterval(function()  {
        //         alertTime--;
        
        //         if (currentTime > 0) {
        //             questionResponseDiv.textContent = response
        //         } else {
        //             clearInterval(timerInterval)
        //             questionResponseDiv.textContent = ""
        //         }
        
        //     }, 1000);
        }
    }
});

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