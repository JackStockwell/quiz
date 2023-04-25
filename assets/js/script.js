// Query Selectors

var welcomeDiv = document.querySelector("#welcome-card");
var gameStartDiv = document.querySelector("#question-card");
var formNameDiv = document.querySelector("#form-card");
var submitBttn = document.querySelector("#form-name-bttn")
var formName = document.querySelector("#form-name")

var questionTitleDiv = document.querySelector(".question");
var questionChoicesDiv = document.querySelector(".answers");
var questionResponseDiv = document.querySelector(".ans-response");

var timeEl = document.getElementById("timer");

// Global Variables

var currentQuestion = 0;
var currentTime = 60;
var currentScore = 0

// 

var userData = []

// Starts the Game, removes welcome screen, renders question screen.


function timer() {
    


    var timerInterval = setInterval(function()  {
        currentTime--;
        timeEl.textContent = "Time left: " + currentTime + " seconds.";

        if (currentTime === 0) {
            clearInterval(timerInterval)
            startForm();
        }

    }, 1000);
}

// Used to generate the next question in a chain if there is one available.

function genQuestion(currentQ) {

    if (currentQ >= questions.length) {
        startForm()
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

// Function to generate a response, based upon the declaration from the event listener

function genResponse(response) {

    if (response === "correct") {
        response = "Correct!"
        console.log(response)
        questionResponseDiv.textContent = ""
    } else {
        response = "Incorrect! -5s from your time!"
        console.log(response)
        questionResponseDiv.textContent = ""
    }

    questionResponseDiv.textContent = (response)

    setTimeout(function () {
        questionResponseDiv.textContent = ""
    }, 1000)


}

function returnHome() {
    open("index.html", "_self")
}

function getUserData() {
    var storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData !== null) {
        userData = storedData;
    }
}

function storeUserData() {
    localStorage.setItem("userData", JSON.stringify(userData))
}

function selectQuestion(event) {

    if(event.target === event.currentTarget) {
        return;
    } else {
        var selectedAnswer = event.target.innerHTML;
        var correctChoice = questions[currentQuestion].answer

        if (correctChoice === selectedAnswer) {
            currentQuestion++;
            currentScore++;
            genResponse("correct")
            genQuestion(currentQuestion)
        } else {
            currentQuestion++;
            currentTime -=5
            genResponse("incorrect")
            genQuestion(currentQuestion)
        }
    }
};

// Used to get the value of the form name and turn it into an object that can be saved to.

function submitName(event) {
    event.preventDefault()
    getUserData();
    var name = formName.value
    var score = currentScore
    console.log(userData)
    // if statement to check for a valid name
    if (name === "") {
        alert("You must enter a name!")
        return;
    } else if (name.length > 20) {
        alert("Please use less that 20 characters.")
        return;
    } else if (!isNaN(name)) {
        alert("Please use letters only!")
        return;
    } else {

        userData.push(name, score)
        storeUserData();
        open("highscores.html", "_self")
    }
    // when a valid name is entered I WANT to store that name to be stored in an array object so WHEN i call upon on it later, I CAN gather both name and score
}



// Starts the Game, removes welcome screen, renders question screen.

function startGame(event) {
    welcomeDiv.classList.replace("card", "hidden")
    gameStartDiv.classList.replace("hidden", "card")

    // When the timer starts. I am presented with the first question [0].
    timer()
    
    // Function to create a question.

    genQuestion(currentQuestion)
}

function startForm() {
    gameStartDiv.classList.replace("card", "hidden")
    formNameDiv.classList.replace("hidden", "card")
}
