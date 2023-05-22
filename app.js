const GameBoard = (() => {
  let gameBoard = [];

  const squareFactory = (index) => {
    let value = "";

    const setValue = (playerValue) => value = playerValue;
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
  const player1 = playerFactory("player1", "X");
  const player2 = playerFactory("player2", "O");
  const board = GameBoard.getBoard();
  
  let currentPlayer = player1;

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  const playTurn = (e) => {
    const digit = currentPlayer.getDigit();
    const index = e.target.dataset.index;
    board[index].setValue(digit);
  }

  return { getCurrentPlayer, switchPlayer, playTurn }
})();

const displayController = (() => {
  const container = document.querySelector(".gridContainer");
  const board = GameBoard.getBoard();
  
  const updateBoard = (e) => {
    const player = gameController.getCurrentPlayer();
    e.target.innerText = player.getDigit();
    gameController.switchPlayer();
  };
  
  const clickHandler = (e) => {
    if (e.target.innerText == ""){
      gameController.playTurn(e);
      updateBoard(e);
    }
    
  }
  //Initialize board
  board.forEach(square => {
    const newSquare = document.createElement("button");
    newSquare.classList.add("gridBtn");
    newSquare.dataset.index = square.getIndex();
    newSquare.textContent = square.getValue();
    newSquare.addEventListener('click', clickHandler);
    container.appendChild(newSquare);
  });

})();