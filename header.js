const header = () => {
    const header = document.createElement("div");
    header.id = "header";
    const title = document.createElement("h1");
    title.innerHTML = "Knight Travails";
    header.appendChild(title);
    const instructions = document.createElement("h5");
    instructions.id = "instructions";
    instructions.innerHTML = "Click a starting point";
    header.appendChild(instructions);
    const startButton = document.createElement("button");
    startButton.id = "start-button";
    startButton.innerHTML = "start";
    startButton.disabled = true;
    header.appendChild(startButton);
    const resetButton = document.createElement("button");
    resetButton.id = "reset-button";
    resetButton.innerHTML = "reset";
    header.appendChild(resetButton);
    return header;
};

export default header();
