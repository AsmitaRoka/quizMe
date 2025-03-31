// Event Listener for Start Quiz Button
document.getElementById('startQuizButton').addEventListener('click', startQuiz);

// Start the quiz process by hiding the start button and showing the quiz selection
function startQuiz() {
    document.getElementById('startQuizButton').style.display = 'none';  // Hide start button
    document.getElementById('quizSelectionTitle').style.display = 'block'; // Show quiz selection title
    document.querySelector('.buttons').style.display = 'block'; // Show quiz selection buttons
    document.getElementById('quizContent').style.display = 'block'; // Show quiz content area
    document.getElementById('menuBar').style.display = 'block'; // Show menu bar
}

// Event Listeners for Quiz Selection Buttons
const quizButtons = ['mathButton', 'swedishButton', 'englishButton'];
quizButtons.forEach(buttonId => {
    document.getElementById(buttonId).addEventListener('click', () => showQuestions(buttonId.replace('Button', 'Questions')));
});

// Event Listeners for Menu Bar Buttons
const menuButtons = ['menuMathButton', 'menuSwedishButton', 'menuEnglishButton'];
menuButtons.forEach(buttonId => {
    document.getElementById(buttonId).addEventListener('click', () => showQuestions(buttonId.replace('menu', '').replace('Button', 'Questions')));
});
// Show quiz questions and hide quiz selection
function showQuestions(quizType) {
    // Hide quiz selection and any previous quiz content
    document.getElementById('quizSelectionTitle').style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';
    const questionContainers = document.querySelectorAll('.question');
    questionContainers.forEach(container => container.style.display = 'none');  // Hide all questions first
    
    // Show selected quiz questions
    document.getElementById(quizType).style.display = 'block';
}


// Handle form submissions dynamically for each quiz
const quizzes = ['mathQuiz', 'swedishQuiz', 'englishQuiz'];
quizzes.forEach(quizId => {
    document.getElementById(quizId).addEventListener('submit', (event) => handleQuizSubmission(event, quizId));
});

// Handle quiz submission
function handleQuizSubmission(event, quizId) {
    event.preventDefault();  // Prevent form from reloading the page
    const quizName = quizId.replace('Quiz', '');
    const answers = getQuizAnswers(quizName);
    const totalQuestions = Object.keys(answers).length;
    const score = calculateScore(quizId, answers);
    showFeedback(score, quizName, totalQuestions);
    showNextQuiz(quizName); // Navigate to the next quiz after completion
}

// Get answers dynamically based on the quiz type
function getQuizAnswers(quizName) {
    const answerKey = {
        math: {
            math1: 'b', math2: 'd', math3: 'a', math4: 'c', math5: 'b',
            math6: 'b', math7: 'b', math8: 'b', math9: 'b', math10: 'b',
            math11: 'c', math12: 'b'
        },
        swedish: {
            swedish1: 'e', swedish2: 'b', swedish3: 'c', swedish4: 'b', swedish5: 'a',
            swedish6: 'e', swedish7: 'e', swedish8: 'b', swedish9: 'b', swedish10: 'e',
            swedish11: 'd', swedish12: 'c', swedish13: 'e', swedish14: 'd', swedish15: 'd', swedish16: 'd' }, 
            english: { english1: 'b', english2: 'a', english3: 'b', english4: 'a', english5: 'b', english6: 'c', english7: 'b' }
    };
    return answerKey[quizName] || {}; // Return empty object if quizName is not found
}

// Calculate the score based on form answers
function calculateScore(quizId, answers) {
    let score = 0;
    const formData = new FormData(document.getElementById(quizId));
    formData.forEach((value, key) => {
        if (answers[key] === value) {
            score++;
        }
    });
    return score;
}

// Show feedback dynamically based on score
function showFeedback(score, quizName, totalQuestions) {
    let feedback = '';

    if (totalQuestions === 0) {
        feedback = `No questions were found for ${quizName}.`;
    } else if (score === totalQuestions) {
        feedback = `Fantastic job! You scored ${score} out of ${totalQuestions}. Perfect!`;
    } else if (score >= totalQuestions / 2) {
        feedback = `Good effort! You scored ${score} out of ${totalQuestions}. Keep practicing!`;
    } else {
        feedback = `Keep trying! You scored ${score} out of ${totalQuestions}. You'll improve!`;
    }

    // Display feedback
    const scoreSection = document.getElementById('scoreSection');
    scoreSection.innerHTML = `<strong>${quizName} Feedback:</strong> ${feedback}`;
    scoreSection.style.display = 'block'; // Show feedback section
}

// Show the next quiz after the current one
function showNextQuiz(currentQuizType) {
    const quizOrder = ['mathQuestions', 'swedishQuestions', 'englishQuestions'];
    const currentIndex = quizOrder.indexOf(currentQuizType + 'Questions');
    const nextQuizType = quizOrder[currentIndex + 1];

    if (nextQuizType) {
        showQuestions(nextQuizType); // Show the next quiz
    } else {
        alert("You've completed all quizzes!"); // Final message after the last quiz
    }
}

// Accessibility and focus improvements for buttons
document.querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-label', button.innerText);  // Provide better accessibility labels
    button.addEventListener('focus', () => button.style.outline = '2px solid blue');  // Highlight focused buttons
    button.addEventListener('blur', () => button.style.outline = 'none');  // Remove focus outline when lost
});



