const GameBoard = (() => {
  let gameBoard = [];

  const squareFactory = (index) => {
    let value = "";

    const setValue = (playerValue) => (value = playerValue);
    const getValue = () => value;
    const getIndex = () => index;

    return { setValue, getValue, getIndex };
  };

  for (let i = 0; i < 9; i++) {
    const square = squareFactory(i);
    gameBoard.push(square);
  }

  const isTie = () => {
    for (let i = 0; i < 9; i++) {
      if (gameBoard[i].getValue() == "") {
        return false;
      }
    }
    return true;
  };

  const getBoard = () => gameBoard;

  return { getBoard, isTie };
})();

const playerFactory = (name, digit) => {
  const getName = () => name;
  const getDigit = () => digit;

  return { getName, getDigit };
};

const gameController = (() => {
  let player1;
  let player2;
  let end = false;
  const board = GameBoard.getBoard();

  let currentPlayer;

  const getCurrentPlayer = () => currentPlayer;

  const getEndStatus = () => end;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const noPlayer = () => {
    currentPlayer = "";
  };

  const endGame = () => {
    const squares = document.querySelectorAll(".gridBtn");
    squares.forEach((square) => {
      square.disabled = true;
    });
    end = true;
  };

  const announceWinner = () => {
    const container = document.querySelector(".playersContainer");
    container.innerText = `The winner is ${currentPlayer.getName()}!`;
    endGame();
  };

  const checkWinnerRow = (index) => {
    const first = board[index].getValue();
    const second = board[index + 1].getValue();
    const third = board[index + 2].getValue();

    if (first && second && third) {
      if (first == second && second == third) {
        announceWinner();
      }
    }
  };

  const checkWinnerColumn = (index) => {
    const first = board[index].getValue();
    const second = board[index + 3].getValue();
    const third = board[index + 6].getValue();

    if (first && second && third) {
      if (first == second && second == third) {
        announceWinner();
      }
    }
  };

  const checkWinnerDiagonals = () => {
    const firstLeft = board[0].getValue();
    const firstRight = board[2].getValue();
    const second = board[4].getValue();
    const thirdLeft = board[8].getValue();
    const thirdRight = board[6].getValue();

    if (
      (firstLeft && second && thirdLeft) ||
      (firstRight && second && thirdRight)
    ) {
      if (
        (firstLeft == second && second == thirdLeft) ||
        (firstRight == second && second == thirdRight)
      ) {
        announceWinner();
      }
    }
  };

  const checkWinner = () => {
    for (let i = 0; i < 9; i += 3) {
      checkWinnerRow(i);
    }
    for (let i = 0; i < 3; i++) {
      checkWinnerColumn(i);
    }
    checkWinnerDiagonals();
  };

  const playTurn = (e) => {
    const digit = currentPlayer.getDigit();
    const index = e.target.dataset.index;
    board[index].setValue(digit);
    checkWinner();
    if (GameBoard.isTie() == true) {
      endGame();
    }
  };

  const startGame = () => {
    const nameInput1 = document.getElementById("input1");
    const nameInput2 = document.getElementById("input2");
    player1 = playerFactory(nameInput1.value, "X");
    player2 = playerFactory(nameInput2.value, "O");
    currentPlayer = player1;
  };

  return {
    getCurrentPlayer,
    getEndStatus,
    switchPlayer,
    playTurn,
    startGame,
    noPlayer,
  };
})();

const displayController = (() => {
  const container = document.querySelector(".gridContainer");
  const startGameBtn = document.querySelector("#startBtn");
  const board = GameBoard.getBoard();

  const updateBoard = (e) => {
    const player = gameController.getCurrentPlayer();
    e.target.innerText = player.getDigit();
    gameController.switchPlayer();
  };

  const clickHandler = (e) => {
    if (e.target.innerText == "") {
      gameController.playTurn(e);
      updateBoard(e);
      if (gameController.getEndStatus() == true) {
        gameController.noPlayer();
      } else updatePlayingDisplay();
    }
  };

  const updatePlayingDisplay = () => {
    const container = document.querySelector(".playersContainer");
    if (gameController.getCurrentPlayer != "") {
      container.innerText =
        gameController.getCurrentPlayer().getName() + "'s Turn";
    }
  };

  const playingDisplay = () => {
    const container = document.createElement("div");
    const main = document.querySelector("main");

    container.classList.add("playersContainer");
    main.insertBefore(container, main.firstChild);
    updatePlayingDisplay();
  };

  //Start button event listener
  startGameBtn.addEventListener("click", function () {
    const nameInput1 = document.getElementById("input1");
    const nameInput2 = document.getElementById("input2");
    const playersDiv = document.querySelector(".players");
    if (nameInput1 != "" && nameInput2 != "") {
      gameController.startGame();

      const buttons = document.querySelectorAll(".gridBtn");
      buttons.forEach((button) => {
        button.classList.remove("no-click");
      });

      playersDiv.remove();
      startGameBtn.remove();

      playingDisplay();
    }
  });

  //Initialize board
  board.forEach((square) => {
    const newSquare = document.createElement("button");
    newSquare.classList.add("gridBtn");
    newSquare.classList.add("no-click");
    newSquare.dataset.index = square.getIndex();
    newSquare.textContent = square.getValue();
    newSquare.addEventListener("click", clickHandler);
    container.appendChild(newSquare);
  });
})();
