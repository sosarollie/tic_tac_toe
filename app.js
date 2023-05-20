let GameBoard = (() => {
  let gameBoard = [];

  const squareFactory = (index) => {
    let value = 0;

    const setValue = (playerValue) => (this.value = playerValue);
    const getValue = () => value;
    const getIndex = () => index;

    return { setValue, getValue, getIndex };
  };

  for (let i = 0; i < 9; i++) {
    const square = squareFactory(i);
    gameBoard.push(square);
  }

  const getBoard = () => gameBoard;

  return { getBoard };
})();

const playerFactory = (name, digit) => {
  const getName = () => name;
  const getDigit = () => digit;

  return { getName, getDigit };
};

let displayController = (() => {
  const container = document.querySelector(".gridContainer");

  for (let i = 0; i < 9; i++) {
    const newSquare = document.createElement("button");
    newSquare.classList.add("gridBtn");
    newSquare.dataset.index = i;
    newSquare.addEventListener(
      "click",
      currentPlayer.markSquare(newSquare.dataset.index, currentPlayer.digit)
    );
    container.appendChild(newSquare);
  }

  const render = () => {
    const buttons = document.querySelectorAll(".gridBtn");
  };
})();

let gameController = (() => {
  const player1 = playerFactory("player1", "x");
  const player2 = playerFactory("player2", "O");
  let currentPlayer = player1;
})();
