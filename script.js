let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Linhas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Colunas
  [0, 4, 8],
  [2, 4, 6], // Diagonais
];

function makeMove(cellIndex) {
  if (gameActive && board[cellIndex] === "") {
    board[cellIndex] = currentPlayer;
    document.getElementsByClassName("cell")[cellIndex].textContent =
      currentPlayer;
    checkResult();
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkResult() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      document.getElementById(
        "message"
      ).textContent = `Jogador ${board[a]} venceu!`;
      highlightCells(combination);
      break;
    }
  }

  if (!board.includes("") && gameActive) {
    gameActive = false;
    document.getElementById("message").textContent = "Empate!";
  }
}

function highlightCells(combination) {
  for (let index of combination) {
    document.getElementsByClassName("cell")[index].classList.add("win");
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("message").textContent = "";
  const cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.textContent = "";
    cell.classList.remove("win");
  }
}

// Event listeners
const cells = document.getElementsByClassName("cell");
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    makeMove(i);
  });
}
