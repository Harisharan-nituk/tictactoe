let boxes = document.querySelectorAll(".box")
let reset_btn = document.querySelector('#reset_button');
let newgame_btn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");
let turnO = true;
let moveCounter = 0;
const maxMovesForDraw = 6;

const winpatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    moveCounter = 0;
}
const disableBoxes = () => {
    for (let box of boxes)
        box.disabled = true;
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const displayDraw = () => {
    msg.innerText = "!!! Draw";
    msgContainer.classList.remove("hide");
    moveCounter = 0;
    disableBoxes();
}
const willBeDraw = () => {
    msg.innerText = "Game will Draw";
    msgContainer.classList.remove("hide");
}

const showWinner = (val1) => {

    msg.innerText = "'"+val1+"'" + " win ";

    msgContainer.classList.remove("hide");
    disableBoxes();

}
boxes.forEach((box) => {

    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
        moveCounter++;
    });

});
const checkPotentialWin = () => {
    // Check if there is a potential win on the board
    for (let pattern of winpatterns) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if ((val1 === "" && val2 === "O" && val3 === "O") ||
            (val1 === "O" && val2 === "" && val3 === "O") ||
            (val1 === "O" && val2 === "O" && val3 === "")) {
            return true;
        }
    }

    return false;
}


let checkWinner = () => {
    for (let pattern of winpatterns) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;
        if (val1 != "" && val2 != "" && val3 != "") {

            if (val1 == val2 && val2 == val3) {

                showWinner(val1);
                return;
            }

        }
       if (moveCounter === maxMovesForDraw && !checkPotentialWin()) {
            willBeDraw();

        }
        if (Array.from(boxes).every(box => box.innerText !== "")) {
            displayDraw();
        }
    }
}

reset_btn.addEventListener("click", resetGame);
newgame_btn.addEventListener("click", resetGame);