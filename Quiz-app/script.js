//create an array of questions
const Questions = [
  {
    question: "What is the capital city of Ethipia?",
    answers: [
      { text: "Finfine", correct: true },
      { text: "Adama", correct: false },
      { text: "Nairobi", correct: false },
      { text: "Dubai", correct: false },
    ],
  },
  {
    question: "What is the capital city of Kenya?",
    answers: [
      { text: "Finfine", correct: false },
      { text: "Abu Dhabi", correct: false },
      { text: "Nairobi", correct: true },
      { text: "Dubai", correct: false },
    ],
  },
  {
    question: "What is the capital city of UAE?",
    answers: [
      { text: "Finfine", correct: false },
      { text: "Dubai", correct: false },
      { text: "Legos", correct: false },
      { text: "Abu Dhabi", correct: true },
    ],
  },
  {
    question: "What is the capital city of Oromia?",
    answers: [
      { text: "Finfine", correct: true },
      { text: "Nekmte", correct: false },
      { text: "Washingten DC", correct: false },
      { text: "Dubai", correct: false },
    ],
  },
  {
    question: "What is the capital city of Uganda?",
    answers: [
      { text: "Cape town", correct: false },
      { text: "Kampala", correct: true },
      { text: "Akara", correct: false },
      { text: "Dubai", correct: false },
    ],
  },
  {
    question: "What was the first James Bond film?",
    answers: [
      { text: "Japan", correct: true },
      { text: "USA", correct: false },
      { text: "China", correct: false },
      { text: "Russia", correct: false },
    ],
  },
  {
    question: "What is the democratic ruling system of Oromo people?",
    answers: [
      { text: "Parental", correct: false },
      { text: "Royal", correct: false },
      { text: "Gadaa System", correct: true },
      { text: "Kalu", correct: false },
    ],
  },
  {
    question: "Which African country has never been colonized?",
    answers: [
      { text: "Kenya", correct: false },
      { text: "Rwanda", correct: false },
      { text: "Libya", correct: false },
      { text: "Ethipia", correct: true },
    ],
  },
  {
    question: "In which country you find the world's largest Dam?",
    answers: [
      { text: "France", correct: false },
      { text: "USA", correct: false },
      { text: "China", correct: true },
      { text: "Russia", correct: false },
    ],
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      { text: "Misisippi", correct: false },
      { text: "Amazon", correct: false },
      { text: "Nile", correct: true },
      { text: "Akobo", correct: false },
    ],
  },
];

//select an element from the html
const answerCont = document.getElementById("annswer-cont");
const questionText = document.getElementById("question-text");
const answers = document.querySelectorAll(".btn");
const nextButton = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const feedBackEl = document.getElementById("feed-back");
const scoreBoard = document.getElementById("score");
const scoreCont = document.getElementById("score-cont");
let currentIndex = 0;
let score = 0;
// window.addEventListener("DOMContentLoaded", (e) => {
//   //nextButton.style.display = "none";
function resetScore() {
  score = 0;
  currentIndex = 0;
}
// });
function startQuiz() {
  nextButton.style.display = "none";
  feedBackEl.style.display = "none";
  restartBtn.style.display = "none";
  const currentQuestion = Questions[currentIndex];
  const currentAnswers = currentQuestion.answers;
  const qText = currentQuestion.question;
  questionText.innerHTML = currentIndex + 1 + "." + " " + qText;
  answers.forEach((element, index) => {
    element.innerText = currentAnswers[index].text;
    element.dataset.correct = currentAnswers[index].correct;
  });
}
startQuiz();

//function to go to next question.

function nextQuestion() {
  if (currentIndex >= Questions.length - 1) {
    resetQuiz();
  } else if (currentIndex < Questions.length) {
    currentIndex += 1;
    startQuiz();
    answers.forEach((elem) => {
      elem.disabled = false;
      elem.classList.remove("correct");
      elem.classList.remove(
        "correct",
        "incorrect",
        "disabled",
        "selected-btn",
        "wrong"
      );
    });
  }
}
nextButton.addEventListener("click", () => {
  nextButton.style.display = "none";
  nextQuestion();
});
// check if the answer is correct or not

function checkAnswer() {
  answers.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (answer.dataset.correct == "true") {
        nextButton.style.display = "block";
        let audio = new Audio("correct.mp3");
        audio.play();
        score += 1;
        scoreBoard.innerText = score;
        answer.classList.add("correct", "selected-btn");
        answers.forEach((el) => {
          el.disabled = true;
          el.classList.add("disabled");
        });
      } else {
        let wrongAudio = new Audio("wrong-sound.mp3");
        wrongAudio.play();
        nextButton.style.display = "block";
        answer.classList.add("incorrect", "wrong");
        answers.forEach((elem) => {
          elem.classList.add("disabled");
          elem.disabled = true;
          if (elem.dataset.correct == "true") {
            elem.classList.add("correct", "selected-btn");
          }
        });
      }
    });
  });
}

checkAnswer();

function resetQuiz() {
  scoreCont.style.display = "none";
  feedBackEl.style.display = "block";
  feedBackEl.innerText = `Quiz Completed, You Scored ${score} out of ${Questions.length}`;
  questionText.style.display = "none";
  nextButton.style.display = "none";
  restartBtn.style.display = "block";
  answers.forEach((element) => {
    element.style.display = "none";
  });
  const message = document.createElement("p");
  message.innerHTML = `Quiz Completed, You Scored ${score} out of ${Questions.length}`;
  answerCont.appendChild("message");
  questionText.innerHTML = `Quiz Completed, You Scored ${score} out of ${Questions.length}`;
}

//restart the quiz
restartBtn.addEventListener("click", () => {
  scoreCont.style.display = "block";
  resetScore();
  currentIndex = 0;
  startQuiz();
  scoreBoard.innerHTML = score;
  questionText.style.display = "block";
  nextButton.style.display = "none";
  restartBtn.style.display = "none";
  answers.forEach((element) => {
    element.style.display = "block";
    element.classList.remove(
      "correct",
      "incorrect",
      "disabled",
      "selected-btn",
      "wrong"
    );
    element.disabled = false;
  });

  // nextQuestion();
});

//questions fom an api

async function collectData() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=20&type=multiple"
  );
  const data = await response.json();
  console.log(data.results);
}

collectData();
