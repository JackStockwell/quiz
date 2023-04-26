// Query Selectors

var welcomeDiv = document.querySelector("#welcome-card");
var gameStartDiv = document.querySelector("#question-card");
var formNameDiv = document.querySelector("#form-card");
var submitBttn = document.querySelector("#form-name-bttn")
var formName = document.querySelector("#form-name")
var tableDiv = document.querySelector(".table-body")

var questionTitleDiv = document.querySelector(".question");
var questionChoicesDiv = document.querySelector(".answers");
var questionResponseDiv = document.querySelector(".ans-response");

var timeEl = document.getElementById("timer");

// Global Variables

var currentQuestion = 0;
var currentTime = 45;
var currentScore = 0

// The array used to store the users name and score.

var userData = []

// Timer that is activated when the user presses start.

function timer() {
    var timerInterval = setInterval(function()  {
        currentTime--;
        timeEl.textContent = "Time left: " + currentTime + " seconds.";

        if (currentTime === 0) {
            clearInterval(timerInterval)
            startForm();
            timeEl.textContent = "Time's up!"
        }

    }, 1000);
}

// Used to generate the next question in a chain if there is one available.

function genQuestion(currentQ) {
    // Checks to see if the questions have been used, if so ends the game.
    if (currentQ >= questions.length) {
        startForm()
        currentTime = 1
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

// Function to generate a response, based upon the declaration from the select question function. Flashes text to say if the
// answer is correct or not.

function genResponse(response) {

    if (response === "correct") {
        response = "Correct!"
        questionResponseDiv.textContent = ""
    } else {
        response = "Incorrect! -5s from your time!"
        questionResponseDiv.textContent = ""
    }

    questionResponseDiv.textContent = (response)

    setTimeout(function () {
        questionResponseDiv.textContent = ""
    }, 1000)
}

// Added to <h1> element to link to home.

function returnHome() {
    open("index.html", "_self")
}

// Collects users' localstorage data, turns it into an arrray which allows it to be edited.

function getUserData() {
    var storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData !== null) {
        userData = storedData;
    }
}

// Stores and stringifies the userData array.

function storeUserData() {
    localStorage.setItem("userData", JSON.stringify(userData))
}

// Determines which question is clicked. Compares the answer to tell if it is correct or not, altering the response.

function selectAnswer(event) {

    if(event.target === event.currentTarget) {
        return;
    } else {
        var selectedAnswer = event.target.innerHTML;
        var correctChoice = questions[currentQuestion].answer
        // If statement to compared the selected answer against the correct choice.
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

// Used to save the user's name and user's score into local storage after playing the game.

function submitName(event) {
    event.preventDefault()
    getUserData();
    var name = formName.value
    var score = currentScore
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
        // Takes the userData array, pushes the new name and score into the array.
        var userEntry = {
            userName: name,
            userScore: score
        }

        userData.push(userEntry)
        console.log(userData)

    //     userData.push(name, score)
    //     // Stores the array and stringifies it.
        storeUserData();
    //     open("highscores.html", "_self")
    }

}

// Renders the scores on page load of highscores.

function renderHighscore() {
    // Retrieves users' data.
    getUserData();
    // Sorts based on score.
    userData.sort((a, b) => b.score - a.score)
    // Stores top 5.
    var top5 = userData
    top5.splice(5)
    console.log(top5)

    for (i = 0; i < top5.length; i++) {
        // Checks if it's even. Creates elements based on this, a new table row is needed on every name.
        if (i%2 == 0) {
            var trEl = document.createElement("tr");
            tableDiv.appendChild(trEl);
            var tdEl = document.createElement("td");
            trEl.appendChild(tdEl);
            username = top5
            tdEl.innerHTML = username
            console.log(top5)
        } else {
            var tdEl = document.createElement("td");
            trEl.appendChild(tdEl);
            tdEl.innerHTML = top5.score();
        }
    } 
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

// Shows the form page.

function startForm() {
    gameStartDiv.classList.replace("card", "hidden")
    formNameDiv.classList.replace("hidden", "card")
}