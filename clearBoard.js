const clearBoard = (start) => {
    let knightImage = document.createElement("img");
    knightImage.id = "knight-image";
    knightImage.src = `assets/chess-knight.png`;
    const allSquares = document.getElementsByClassName("cols");
    for (let i = 0; i < allSquares.length; i += 1) {
        if (allSquares[i].firstChild) {
            allSquares[i].removeChild(allSquares[i].firstChild);
        }
        console.log("clear ran");
    }
    const placeKnight = document.getElementById(`${start[0]}${start[1]}`);
    placeKnight.appendChild(knightImage);
    knightImage.id = "knight-image";
};

export default clearBoard;
