// ---------- FORMULAIRE DE CONTACT ----------
const form = document.getElementById("contact-form");
const messageBox = document.getElementById("form-message");

if (form && messageBox) {
  form.addEventListener("submit", function (event) {
    if (form.checkValidity()) {
      messageBox.textContent = "Votre message est prêt à être envoyé.";
      messageBox.style.display = "block";
      messageBox.style.color = "#16a34a"; // vert
      // Le mailto s'ouvre ensuite normalement
    } else {
      event.preventDefault();
      messageBox.textContent = "Veuillez remplir tous les champs correctement.";
      messageBox.style.display = "block";
      messageBox.style.color = "#dc2626"; // rouge
    }
  });
}

// ---------- COMPTEUR ----------
const countBtn = document.getElementById("count-btn");
const countSpan = document.getElementById("click-count");
let count = 0;

if (countBtn && countSpan) {
  countBtn.addEventListener("click", () => {
    count = count + 1;
    countSpan.textContent = count;
  });
}

// ---------- MINI CALCULATRICE ----------
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const resultSpan = document.getElementById("result");

const btnAdd = document.getElementById("add");
const btnSub = document.getElementById("sub");
const btnMul = document.getElementById("mul");
const btnDiv = document.getElementById("div");

function getNumbers() {
  return {
    a: parseFloat(num1.value) || 0,
    b: parseFloat(num2.value) || 0,
  };
}

if (btnAdd && btnSub && btnMul && btnDiv && resultSpan && num1 && num2) {
  btnAdd.addEventListener("click", () => {
    const { a, b } = getNumbers();
    resultSpan.textContent = a + b;
  });

  btnSub.addEventListener("click", () => {
    const { a, b } = getNumbers();
    resultSpan.textContent = a - b;
  });

  btnMul.addEventListener("click", () => {
    const { a, b } = getNumbers();
    resultSpan.textContent = a * b;
  });

  btnDiv.addEventListener("click", () => {
    const { a, b } = getNumbers();
    if (b === 0) {
      resultSpan.textContent = "Erreur";
    } else {
      resultSpan.textContent = a / b;
    }
  });
}

// ---------- JEU : PILE OU FACE ----------
let userChoice = null; // "Pile" ou "Face"

const btnChoosePile = document.getElementById("choose-pile");
const btnChooseFace = document.getElementById("choose-face");
const userChoiceSpan = document.getElementById("user-choice");
const coinResultSpan = document.getElementById("coin-result");
const gameMessage = document.getElementById("game-message");
const playCoinBtn = document.getElementById("play-coin");

if (
  btnChoosePile &&
  btnChooseFace &&
  userChoiceSpan &&
  coinResultSpan &&
  gameMessage &&
  playCoinBtn
) {
  // Choix Pile
  btnChoosePile.addEventListener("click", () => {
    userChoice = "Pile";
    userChoiceSpan.textContent = "Pile";
    gameMessage.textContent = "Tu as choisi Pile, lance la pièce !";
  });

  // Choix Face
  btnChooseFace.addEventListener("click", () => {
    userChoice = "Face";
    userChoiceSpan.textContent = "Face";
    gameMessage.textContent = "Tu as choisi Face, lance la pièce !";
  });

  // Lancer la pièce
  playCoinBtn.addEventListener("click", () => {
    if (!userChoice) {
      gameMessage.textContent = "Choisis d’abord Pile ou Face.";
      return;
    }

    const random = Math.random();
    const result = random < 0.5 ? "Pile" : "Face";

    coinResultSpan.textContent = result;

    if (result === userChoice) {
      gameMessage.textContent = "Bravo, tu as gagné ! 🎉";
    } else {
      gameMessage.textContent = "Raté… essaie encore 😁";
    }
  });
}

// ---------- TODO LIST ----------
const todoInput = document.getElementById("todo-input");
const todoAddBtn = document.getElementById("todo-add-btn");
const todoList = document.getElementById("todo-list");

function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    alert("Veuillez entrer une tâche.");
    return;
  }

  const li = document.createElement("li");
  li.classList.add("todo-item");

  li.innerHTML = `
    <span class="todo-text">${text}</span>
    <button class="todo-delete">×</button>
  `;

  // Cocher la tâche
  li.querySelector(".todo-text").addEventListener("click", () => {
    li.querySelector(".todo-text").classList.toggle("completed");
  });

  // Supprimer la tâche
  li.querySelector(".todo-delete").addEventListener("click", () => {
    li.remove();
  });

  todoList.appendChild(li);
  todoInput.value = "";
}

if (todoInput && todoAddBtn && todoList) {
  // Ajouter une tâche avec le bouton
  todoAddBtn.addEventListener("click", addTodo);

  // Ajouter avec Entrée
  todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  });
}

// ---------- QUIZ INTERACTIF ----------
const quizData = [
  {
    question: "Que fait JavaScript dans une page web ?",
    answers: [
      "Mets en forme la page",
      "Ajoute des interactions",
      "Stocke les fichiers",
    ],
    correct: 1,
  },
  {
    question: "Comment déclare-t-on une variable ?",
    answers: ["var", "let", "const", "Toutes les réponses"],
    correct: 3,
  },
  {
    question: "Que signifie DOM ?",
    answers: [
      "Document Object Model",
      "Digital Online Mode",
      "Data Object Machine",
    ],
    correct: 0,
  },
];

let quizIndex = 0;

const quizQuestion = document.getElementById("quiz-question");
const quizAnswers = document.getElementById("quiz-answers");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");

if (quizQuestion && quizAnswers && quizFeedback && quizNext) {
  function loadQuiz() {
    const data = quizData[quizIndex];
    quizQuestion.textContent = data.question;

    quizAnswers.innerHTML = "";
    quizFeedback.textContent = "";
    quizNext.style.display = "none";

    data.answers.forEach((answer, index) => {
      const btn = document.createElement("button");
      btn.classList.add("quiz-answer");
      btn.textContent = answer;

      btn.addEventListener("click", () => {
        if (index === data.correct) {
          quizFeedback.textContent = "Correct ! 🎉";
          quizFeedback.style.color = "#16a34a";
        } else {
          quizFeedback.textContent = "Incorrect 😅";
          quizFeedback.style.color = "#dc2626";
        }

        quizNext.style.display = "inline-block";
      });

      quizAnswers.appendChild(btn);
    });
  }

  quizNext.addEventListener("click", () => {
    quizIndex++;

    if (quizIndex >= quizData.length) {
      quizQuestion.textContent = "🎉 Fin du quiz ! Bien joué !";
      quizAnswers.innerHTML = "";
      quizFeedback.textContent = "";
      quizNext.style.display = "none";
      return;
    }

    loadQuiz();
  });

  // Charger la première question
  loadQuiz();
}

// ---------- MODE CLAIR / SOMBRE ----------
const themeToggleBtn = document.getElementById("theme-toggle");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      themeToggleBtn.textContent = "Mode sombre";
    } else {
      themeToggleBtn.textContent = "Mode clair";
    }
  });
}
