const STORE = [
    {
        question: 'Where was Madonna Born?',
        answers: [
            'New York, New York',
            'Bay City, Michigan',
            'Columbus, Ohio',
            'McComb, Mississippi'
        ],
        correctAnswer:
            'Bay City, Michigan',
        answerImage: '<img src="images/madonna1.jpg" alt="Madonna squatting on the ground surrounded by Grammys" class="answerImage">',
    },
    {
        question: 'How did Madonna once refer to her hometown?',
        answers: [
            'A little smelly town in northern Michigan.',
            'A cute place with nice people.',
            'Beautiful small town, I loved playing in Lake Huron.',
            'Most boring place on Earth.'
        ],
        correctAnswer:
            'A little smelly town in northern Michigan.',
        answerImage: '<img src="images/madonna2.jpg" alt="Madonna laying on green exercise ball" class="answerImage">',
    },
    {
        question: 'How much money did Madonna say she had in her pocket when she moved to New York City?',
        answers: [
            '$35',
            '$49',
            '$74',
            '$100'
        ],
        correctAnswer:
            '$35',
        answerImage: '<img src="images/madonna3.jpg" alt="Madonna wearing a red kimono holding a a can of pop" class="answerImage">',
    },
    {
        question: 'How many world records does Madonna hold?',
        answers: [
            '10',
            '12',
            '14',
            '16'
        ],
        correctAnswer:
            '16',
        answerImage: '<img src="images/madonna.jpg" alt="Madonna wearing a tuxedo leaning on a cane" class="answerImage">',
    },
    {
        question: 'Zoologists named what species of animal after Madonna in 2006?',
        answers: [
            'A type of Water Bear',
            'A type of Song Bird',
            'A type of Fish',
            'A type of Butterfly'
        ],
        correctAnswer:
            'Water Bear',
        answerImage: '<img src="images/madonna6.jpg" alt="Madonna standing in front of giant sunflower" class="answerImage">',
    },
]
//variables to store the quiz score and question number
let score = 0;
let questionNumber = 0;
//to generate each question
function generateQuestion() {
    if (questionNumber < STORE.length) {
        return createThing(questionNumber);
    } else {
        $('.questionBox').hide();
        finalScore();
        $('.questionNumber').text(5);
    }
    }
//increments the "score" variable by one
function updateScore() {
    score++;
    $('.score').text(score);
    }
//increments the value of the question number by one
function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
    }
//resets the value of the question number and score variables
function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
    }
//starts the quiz
function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event) {
        $('.startQuiz').hide();
        $('.questionNumber').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(generateQuestion);
    });
    }
//submits a selected answer and checks it against the correct answer
function submitAnswer() {
    $('.mainBox').on('submit', function (event) {
        event.preventDefault();
        $('.altBox').hide();
        $('.response').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct) {
            $('.response').html(correctAnswer);
            updateScore();
        } else {
            $('.response').html(wrongAnswer);
        }
    });
}
//creates html for question form
function createThing(questionIndex) {
    let options = "";
    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
        options += `<label class="counter" for="${answerIndex}">
                        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
                        <span>${answerValue}</span>
                    </label>`;
    });
    return `<form>
                <fieldset>
                    <legend class="questionText">${STORE[questionIndex].question}</legend>
                    ${options}
                    <button type="submit" class="submitButton button"> Submit</button >
                </fieldset>
            </form>`;
}
//if a selected answer is correct add 1 to score
function correctAnswer() {
    return `<h3>Correct!</h3>
            <p class="counter">${STORE[questionNumber].correctAnswer}</p>
            <p class="resize">${STORE[questionNumber].answerImage}</p>
            <button type="button" class="nextButton button">Next</button>`;
}
//if a selected answer is incorrect
function wrongAnswer() {
    return `<h3>Incorrect!</h3>
            <p class="counter">${STORE[questionNumber].correctAnswer}</p>
            <p class="resize">${STORE[questionNumber].answerImage}</p>
            <button type="button" class="nextButton button">Next</button>`;
}
//generates the next question
function nextQuestion() {
    $('.mainBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion);
});
}
//determines final score
function finalScore() {
    $('.final').show();
    return $('.final').html(
        `<h3>Your score is ${score} / 5</h3>
        <button type="submit" class="restartButton button">Restart</button>`
    );
}
//takes user back to the starting view to restart the quiz
function restartQuiz() {
    $('.mainBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
    });
}
//runs the functions
function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}
$(makeQuiz);