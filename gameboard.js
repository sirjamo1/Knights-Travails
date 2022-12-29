const gameboard = () => {
    const border = document.createElement("div");
    localStorage.setItem("startValue", []);
    localStorage.setItem("endValue", []);
    border.id = "chessboard-border";
    for (let i = 0; i < 8; i += 1) {
        let row = document.createElement("div");
        row.className = "rows";
        border.appendChild(row);
        for (let j = 0; j < 8; j += 1) {
            let col = document.createElement("div");
            col.className = "cols";
            if (j % 2 === 0 && i % 2 === 0) {
                col.classList = "cols black";
            } else if (j % 2 !== 0 && i % 2 !== 0) {
                col.classList = "cols black";
            } else {
                col.classList = "cols";
            }
            col.id = `${j}${i}`;
            col.onclick = () => {
                let instructions = document.getElementById("instructions");
                let start = localStorage.getItem("startValue");
                let end = localStorage.getItem("endValue");
                console.log(start.length, start);
                if (start.length === 0) {
                    localStorage.setItem("startValue", [j, i]);
                    start = [j, i];
                    col.classList.add("green-background");
                    return (instructions.innerHTML = `Start: X:${start[0]} Y:${start[1]} Click a end point.`);
                }
                if (end.length === 0) {
                    localStorage.setItem("endValue", [j, i]);
                    end = [j, i];
                    let startButton = document.getElementById("start-button");
                    col.classList.add("red-background");
                    startButton.disabled = false;
                    localStorage.setItem("endValue", end);

                    return (instructions.innerHTML = `Start: X:${start[0]} Y:${start[1]} End: X:${end[0]} Y:${end[1]}.`);
                }
            };
            row.appendChild(col);
        }
    }
    return border;
};

export default gameboard();
