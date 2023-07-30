import { setupSwipeListener, startX, startY, endX, endY, swipeThreshold } from './swipe.js';

const cols = 4;
const rows = 4;

let board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
let previous_board = board;
let score = 0;
let firstRound = true;

const setGame = () => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // <div id="0-0"></div>
            let tile = document.createElement('div');
            tile.id = `${r}-${c}`;
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
    firstRound = false;
}


function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;
    let twoOrFour = Math.random(); // 90% for 2, 10% for 4
    while (!found) { // Use 'found' as the loop condition
        if (firstRound || !areBoardsEqual(board, previous_board)) {
            // Generate a new tile (2 or 4) if a merge occurred
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * rows);
            if (board[r][c] === 0) {
                board[r][c] = (twoOrFour > 0.9) ? 4 : 2;
                let tile = document.getElementById(`${r}-${c}`);
                tile.innerText = `${board[r][c]}`;
                tile.classList.add(`x${board[r][c]}`);
            }
        }

        // Update the previous_board with the current state of the board
        previous_board = JSON.parse(JSON.stringify(board));
        found = true;
    }
    function hasEmptyTile() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (board[r][c] === 0){
                    return true;
                }
            }
        }
    }
}
function areBoardsEqual(board1, board2) {
    return JSON.stringify(board1) === JSON.stringify(board2);
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add(`x${num}`);
        } else {
            tile.classList.add("x8192");
        }
    }
    document.getElementById("score").innerText = score;
}

document.addEventListener("keyup", (e) => {

    switch (e.code) {
        case "ArrowLeft":
            slideLeft();
            setTwo();
            return;
        case "ArrowRight":
            slideRight();
            setTwo();
            return;
        case "ArrowUp":
            slideUp();
            setTwo();
            return;
        case "ArrowDown":
            slideDown();
            setTwo();
            return;
        default:
            return;
    }

});

function filterZero(row) {
    return row.filter(num => num !== 0);
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);
    while (row.length < cols) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(`${r}-${c}`)
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(`${r}-${c}`)
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < cols; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(`${r}-${c}`)
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < cols; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(`${r}-${c}`)
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
document.addEventListener("swipe", (event) => {
    const swipeDirection = event.detail;
    switch (swipeDirection) {
        case "swipeleft":
            console.log("Swiped left!");
            slideLeft();
            setTwo();
            break;
        case "swiperight":
            console.log("Swiped right!");
            slideRight()
            setTwo();
            break;
        case "swipeup":
            console.log("Swiped up!");
            slideUp();
            setTwo();
            break;
        case "swipedown":
            console.log("Swiped down!");
            slideDown();
            setTwo();
            break;
        default:
        return;
    }
});

window.onload = () => {
    setGame();
    setupSwipeListener();
}