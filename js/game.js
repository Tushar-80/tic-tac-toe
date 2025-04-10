const board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let turn = 1;
let gameOver = false;        

const cellClass = {
1: "cell-p1",
2: "cell-p2",
};

const playerImage = {
    1: "circle.png",
    2: "cross.png",
};

function renderBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";

    const playerElement = document.getElementById("player-element");
    if (!gameOver) {
        playerElement.innerHTML = `Player ${turn}'s Turn`;
    } else {
        playerElement.innerHTML = "Game Over!";
    }

    board.forEach((cellValue, index) => {
        const cellPlayerImage = playerImage[cellValue];
        const cellImage = cellPlayerImage ? `<img src="${cellPlayerImage}" />` : "";

        const cellClassName = cellValue === -1 ? "" : cellClass[cellValue] || "";
        boardElement.innerHTML += `
            <div class="cell ${cellClassName}" onclick="handleTurn(${index})">
                ${cellImage}
            </div>
        `;
    });

    checkWinner();
}