let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turno=true;//player x, player o
let count=0;
let mode="";

const themeToggle = document.getElementById("themeBtn");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
        document.querySelector("body").style.backgroundColor="black";
        document.querySelector("body").style.color="white";
    } else {
        themeToggle.textContent = "🌙";
        document.querySelector("body").style.backgroundColor="white";
        document.querySelector("body").style.color="black";
    }
});

const frndBtn=document.querySelector("#friendBtn");
const compBtn=document.querySelector("#computerBtn");
const menu=document.querySelector(".menu");
const gameContainer=document.querySelector(".game");
console.log(friendBtn);
console.log(computerBtn);
console.log(resetBtn);

const winPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
frndBtn.addEventListener("click",()=>{
    mode="friend";
    menu.classList.add("hide");
    gameContainer.classList.remove("hide");
    resetBtn.classList.remove("hide");
});

compBtn.addEventListener("click",()=>{
    mode="computer";
    menu.classList.add("hide");
    gameContainer.classList.remove("hide");
    resetBtn.classList.remove("hide");
});

function computerMove(){
    let emptyBoxes = [];
    boxes.forEach((box,index)=>{
        if(box.innerText===""){
            emptyBoxes.push(index);
        }
    });
    if(emptyBoxes.length>0){
        let randomIndex =
        emptyBoxes[Math.floor(Math.random()*emptyBoxes.length)];
        boxes[randomIndex].innerText="O";
        boxes[randomIndex].disabled=true;
    }
}

const resetGame=()=>{
count=0;
turno=true;
enableBoxes();
msgContainer.classList.add("hide");
count=0;
menu.classList.remove("hide");
gameContainer.classList.add("hide");
resetBtn.classList.add("hide")
};

boxes.forEach((box)=> {
box.addEventListener("click",()=>{
    console.log("box was clicked");
    if(mode==="friend"){
    if(turno===true){
    box.innerText="O";
    turno=false;
}
else{
    box.innerText="X";
    turno=true;
}
}
else if(mode==="computer"){
    box.innerText="X";
    box.disabled=true;
    let isWinner=checkWinner();
    if(!isWinner){
    computerMove();
    checkWinner();
    }
}
box.disabled=true;
count++;
let isWinner=checkWinner();
if(count===9&&!isWinner){
    gameDraw();
}
});
});

const gameDraw=()=>{
    msg.innerText=`Game was a draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes=()=>{
for(let box of boxes){
    box.disabled=true;
}
};

const enableBoxes=()=>{
for(let box of boxes){
    box.disabled=false;
    box.innerText="";
}
};

const showWinner= (winner) => {
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner=()=>{
    for(let pattern of winPatterns){
            let pos1Val=boxes[pattern[0]].innerText;
            let pos2Val=boxes[pattern[1]].innerText;
            let pos3Val=boxes[pattern[2]].innerText;
            if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
                if(pos1Val===pos2Val&&pos2Val===pos3Val){
                    console.log("winner", pos1Val);
                    showWinner(pos1Val);
                    return true;
                }
            }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

