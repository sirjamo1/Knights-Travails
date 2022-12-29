import header from "./header.js";
import gameboard from "./gameboard.js";
import clearBoard from "./clearBoard.js";

const gameboardContainer = document.getElementById("gameboard-container");
gameboardContainer.appendChild(header);
gameboardContainer.appendChild(gameboard);
const knightLocation = "00";
const knightSquare = document.getElementById(knightLocation);
let knightImage = document.createElement("img");
knightImage.id = "knight-image";
knightImage.src = `assets/chess-knight.png`;
knightSquare.appendChild(knightImage);

const changeKnightLocation = (start, end, moveNum) => {
    const startLocation = `${start[0]}${start[1]}`;
    const endLocation = `${end[0]}${end[1]}`;
    let prevLocation = document.getElementById(startLocation);
    prevLocation.removeChild(document.getElementById("knight-image"));
    const moveIndex = document.createElement("h2");
    moveIndex.classList = "move-index";
    moveIndex.innerHTML = moveNum;
    prevLocation.appendChild(moveIndex);
    let newLocation = document.getElementById(endLocation);
    newLocation.appendChild(knightImage);
    knightImage.id = "knight-image";
};

class Node {
    // construct node, if no parent is supplied let it = null
    constructor(x, y, parent = null) {
        this.x = x;
        this.y = y;
        this.parent = parent;
    }
}

const knightMoves = (start, end) => {
    const boardLength = 7;
    const rows = [2, 2, -2, -2, 1, 1, -1, -1];
    const cols = [-1, 1, 1, -1, 2, -2, 2, -2];
    const x = start[0];
    const y = start[1];
    const endX = end[0];
    const endY = end[1];
    const queue = [];
    const visited = [];
    clearBoard(start);
    const validMoves = (x, y, node) => {
        const steps = [];
        for (let i = 0; i < boardLength; i += 1) {
            const row = rows[i];
            const col = cols[i];
            if (x + row >= 0 && x + row <= 7 && y + col >= 0 && y + col <= 7) {
                steps.push(new Node(x + row, y + col, node));
            }
        }
        return steps;
    };

    const consoleResult = (node) => {
        let tempNode = node;
        let arr = [];
        // cycle through nodes parents while they exist, add their x, y to the start of arr
        while (tempNode.parent !== null) {
            arr.unshift([tempNode.x, tempNode.y]);
            tempNode = tempNode.parent;
        }
        // add starting point to the start after cycle
        arr.unshift(start);

        let loops = arr.length - 1;
        let i = 0;
        const moveKnightLoop = () => {
            setTimeout(() => {
                changeKnightLocation(arr[i], arr[i + 1], i);
                i += 1;
                if (i < loops) {
                    moveKnightLoop();
                }
            }, 2000);
        };
        moveKnightLoop();

        // a = '', v = arr[0] => '' += `[arr[0]] linebreak`
        const instructions = document.getElementById("instructions");

        return (instructions.innerHTML = `You made it in ${
            arr.length - 1
        } moves! Here's your path: ${arr.reduce(
            (a, v) => (a += `[${v}] `),
            ""
        )}`);
    };
    // create new node with user given x, y to the queue
    queue.push(new Node(x, y));
    // while queue has length, take first node (remove from queue)
    while (queue.length) {
        const node = queue.shift();
        //check to see if this nodes x,y === end x,y if so print results
        if (node.x === endX && node.y === endY) {
            return consoleResult(node);
        }
        //if not check if this nodes x, y is already in visited array, if not look from valid moves, add nodes x,y (coord) to visited list and add the valid moves to then end of the queue
        if (!visited.some((coord) => `${node.x},${node.y}` === coord)) {
            const moves = validMoves(node.x, node.y, node);
            visited.push(`${node.x},${node.y}`);
            queue.push(...moves);
        }
    }
};
const startButton = document.getElementById("start-button");
startButton.onclick = () => {
    let start = localStorage.getItem("startValue");
    let end = localStorage.getItem("endValue");
    let startXY = [Number(start[0]), Number(start[2])];
    let endXY = [Number(end[0]), Number(end[2])];
    knightMoves(startXY, endXY);
    startButton.disabled = true;
};
const resetButton = document.getElementById("reset-button");
resetButton.onclick = () => {
    let start = localStorage.getItem("startValue");
    let end = localStorage.getItem("endValue");
    let startSquare = document.getElementById(`${start[0]}${start[2]}`);
    startSquare.classList.remove("green-background");
    let endSquare = document.getElementById(`${end[0]}${end[2]}`);
    if (end.length !== 0) {
        endSquare.classList.remove("red-background");
    }
    localStorage.setItem("startValue", []);
    localStorage.setItem("endValue", []);
    let instructions = document.getElementById("instructions");
    instructions.innerHTML = "Click a starting point";
    clearBoard([0, 0]);
};

//    0 1 2 3 4 5 6 7 X
//  0|_|_|_|_|_|_|_|_|
//  1|_|_|_|_|_|_|_|_|
//  2|_|_|_|_|_|_|_|_|
//  3|_|_|_|x|y|_|_|_|
//  4|_|_|_|_|_|_|_|_|
//  5|_|_|_|_|_|_|_|_|
//  6|_|_|_|_|_|_|_|_|
//  7|_|_|_|_|_|_|_|_|
//  Y
