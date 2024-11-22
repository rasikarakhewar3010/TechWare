let quizData = [
    {
        question: "The 'dot matrix and 'solid font printers are examples of",
        options: ["line printers","of-band printer","character printer","ink printers"],
        correct: "character printer",
    },
    {
        question: "The 'ink-jet printers or 'band printers are classified as",
        options: ["character printer","ink printers","line printers","of band printer"],
        correct: "line printers",
    },
    {
        question: "Per minute printing speed of large laser printer is",
        options: ["150 pages","200 pages","250 pages","300 pages"],
        correct: "150 pages",
    },
    {
        question: "Printing technique in which the characters are produced using metals pieces is called",
        options: ["matrix font","solid fonts","page font","paragraph font"],
        correct: "solid fonts",
    },
    {
        question: "Printer in which printing head and paper is forced together to form the letters is called",
        options: ["impact printer","non impact printer","page printers","line printers"],
        correct: "impact printer",
    },
];

const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
let questionNumber = 0;
let score = 0;
const Max_Questions = 5;
let timerInterval;

const shuffleArray = array => {
    return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
    for (let i = 0; i < Max_Questions; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if (userAnswer == quizData[questionNumber].correct) {
        score++;
        e.target.classList.add("correct");
    } else {
        e.target.classList.add("incorrect");
    }
    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach(o => {
        o.classList.add("disabled");
    });
};

const createQuestion = () => {
    clearInterval(timerInterval);

    let secondsLeft = 9;
    const timerDisplay = document.querySelector(".quiz-container .timer");
    timerDisplay.classList.remove("danger");

    timerDisplay.textContent = `Timer Left: 10 seconds`;
    
    timerInterval = setInterval(() => {
        timerDisplay.textContent = `Time Left: ${secondsLeft.toString().padStart(2,0)} seconds`;
        secondsLeft--;

        if(secondsLeft <3){
            timerDisplay.classList.add("danger");
        }

        if(secondsLeft<0){
            clearInterval(timerInterval);
            displayNextQuestion();
        }

    },1000);

    options.innerHTML = '';
    questionElement.innerHTML = `<span class='question-number'> ${questionNumber + 1}/${Max_Questions}</span>${quizData[questionNumber].question}`;

    const shuffledOptions = shuffleArray(quizData[questionNumber].options);

    shuffledOptions.forEach((o) => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) => {
            checkAnswer(e);
        });
        options.append(option);
    });
};

const retakeQuiz = () =>{
    questionNumber =0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();

    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";

}
const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${score} out of ${Max_Questions}.`;
    quizResult.appendChild(resultHeading);

    for (let i = 0; i < Max_Questions; i++) {
        const resultItem = document.createElement("div");
        resultItem.classList.add("question-container");

        const userAnswer = localStorage.getItem(`userAnswer_${i}`);
        const correctAnswer = quizData[i].correct;

        let answeredCorrectly = userAnswer == correctAnswer;

        if (answeredCorrectly) {
            resultItem.classList.add("correct");
        } else {
            resultItem.classList.add("incorrect");
        }

        resultItem.innerHTML = `
            <div class="question">Question ${i + 1}: ${quizData[i].question}</div>
            <div class="user-answer">Your answer: ${userAnswer || "Not answered"}</div>
            <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

        quizResult.appendChild(resultItem);
    }

    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = 'Retake Quiz';
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
};

createQuestion();

const displayNextQuestion = () => {
    if (questionNumber >= Max_Questions - 1) {
        displayQuizResult();
        return;
    }
    questionNumber++;
    createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion);
