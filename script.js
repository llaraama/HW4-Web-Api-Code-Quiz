var sec = 15;
(function() {
    
    function startTimer(){
        console.log('timer suppose to go')
        var timer = setInterval(function(){
            sec--;
            document.getElementById('timerDisplay').innerHTML='00:'+sec;
            if (sec <= 0) {
                clearInterval(timer);
                alert("Time is up!")
                showScores();
            }
        }, 1000);
    }
        document.getElementById('timerDisplay').innerHTML='00:'+sec;
    startTimer();
})();



function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
 


}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        alert("Correct!");
        
        
      

        
        
        
    }else if (this.getQuestionIndex().isNotCorrectAnswer(answer)){
        alert("Incorrect!");
        sec -=5
     
        
        
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

Question.prototype.isNotCorrectAnswer=function(choice){
    return this.answer !== choice;
}
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 


function showScores() {
    var gameOverHTML = "<h1>All Done!</h1>";
    gameOverHTML += "<h4 id='score'> Your final score: " + quiz.score + "</h4>";
    gameOverHTML +="<form method 'get' action='highscores-page.html'><input placeholder='initials' id='initials'/><button id='sumbit'> submit</button></form>"
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;

};




// questions 
var questions = [
    new Question("which of the following function of string object  returns the calling string value converted to lower case while respecting the current locale ?", ["toLocaleLowerCase()", "toLowerCase()","toString()", "substring()"], "toLocaleLowerCase()"),
    new Question("Which of the following function of Array object removes the last element from an array and returns that element?", ["pop()", "push()", "join()", "map()"], "pop()"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("What are variables used for in JavaScript Programs?", ["storing numbers, dates, or other values", "varying randomly", "causing high-school algebra flashbacks", "none of the above"], "storing numbers, dates, or other values"),
    new Question("The _______ method of an Array object adds and/or removes elements from an array.", ["reverse", "shift", "slice", "splice"], "splice")

];

//  quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();
