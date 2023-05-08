let GameBoard = (function () {
  let gameBoard = ["X", "O", "X", "X", "O", "X", "X", "O", "X"];

  const render = () => {
    const container = document.querySelector(".gridContainer");
    gameBoard.forEach((square) => {
      console.log(square);
      const newSquare = document.createElement("button");
      newSquare.innerHTML = square;
      newSquare.classList.add("gridBtn");
      container.appendChild(newSquare);
    });
  };

  return { render };
})();

const playerFactory = (name, digit) => {
  const getName = () => name;
  const getDigit = () => digit;
};

let game = (function () {})();

GameBoard.render();
