// Sample data to store quizzes
let quizzes = [];

// Function to display quizzes
function displayQuizzes() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    quizzes.forEach((quiz, index) => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');
        quizCard.innerHTML = `
            <h2>Quiz ${index + 1}</h2>
            <p>${quiz.question}</p>
            <form id="quiz-form-${index}">
                <ul>
                    ${quiz.choices.map((choice, i) => `
                        <li>
                            <input type="radio" name="quiz-${index}" value="${choice}" id="q${index}-option${i}">
                            <label for="q${index}-option${i}">${choice}</label>
                        </li>
                    `).join('')}
                </ul>
                <button type="button" onclick="checkQuiz(${index})">Submit</button>
            </form>
        `;
        quizContainer.appendChild(quizCard);
    });
}

// Function to create a new quiz
function createQuiz(question, choices, correctAnswer) {
    const quiz = {
        question,
        choices,
        correctAnswer
    };
    quizzes.push(quiz);
    displayQuizzes();
}

// Function to check a quiz
function checkQuiz(index) {
    const form = document.getElementById(`quiz-form-${index}`);
    const selectedOption = form.querySelector('input[type="radio"]:checked');

    if (!selectedOption) {
        alert('Please select an answer.');
        return;
    }

    const userAnswer = selectedOption.value;
    const correctAnswer = quizzes[index].correctAnswer;

    if (userAnswer === correctAnswer) {
        alert('Correct! You got it right.');
    } else {
        alert(`Incorrect. The correct answer is ${correctAnswer}.`);
    }

    // Reset the form after checking
    form.reset();
}

// Function to render the quiz creation form
function renderQuizForm() {
    const quizForm = document.getElementById('quiz-form');
    quizForm.innerHTML = `
        <h2>Create a Quiz</h2>
        <label for="question">Question:</label>
        <input type="text" id="question" required>
        <label for="choices">Choices (comma-separated):</label>
        <input type="text" id="choices" required>
        <label for="correct-answer">Correct Answer:</label>
        <input type="text" id="correct-answer" required>
        <button onclick="submitQuiz()">Create Quiz</button>
    `;
}

// Function to submit the quiz creation form
function submitQuiz() {
    const questionInput = document.getElementById('question');
    const choicesInput = document.getElementById('choices');
    const correctAnswerInput = document.getElementById('correct-answer');

    const question = questionInput.value;
    const choices = choicesInput.value.split(',').map(choice => choice.trim());
    const correctAnswer = correctAnswerInput.value;

    createQuiz(question, choices, correctAnswer);

    // Clear the form inputs
    questionInput.value = '';
    choicesInput.value = '';
    correctAnswerInput.value = '';
}

// Initial setup
renderQuizForm();
displayQuizzes();
