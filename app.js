const GameBoard = (() => {
  let gameBoard = [];

  const squareFactory = (index) => {
    let value = "";

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

const gameController = (() => {
  const player1 = playerFactory("player1", "x");
  const player2 = playerFactory("player2", "O");
  
  let currentPlayer = player1;

  const getCurrentPlayer = () => currentPlayer;

  return { getCurrentPlayer }
})();

const displayController = (() => {
  const container = document.querySelector(".gridContainer");
  const board = GameBoard.getBoard();
  const player = gameController.getCurrentPlayer();

  const updateBoard = (e) => {
    const digit = player.getDigit();
    board[e.target.dataset.index].setValue(digit);
    e.target.textContent = digit;

  };
  
  //Initialize board
  board.forEach(square => {
    const newSquare = document.createElement("button");
    newSquare.classList.add("gridBtn");
    newSquare.dataset.index = square.getIndex();
    newSquare.textContent = square.getValue();
    newSquare.addEventListener('click', updateBoard);
    container.appendChild(newSquare);
  });

})();