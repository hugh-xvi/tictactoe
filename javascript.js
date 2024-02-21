const block = document.querySelectorAll(".block")
const statusP = document.querySelector(".status")
const replay = document.querySelector("#play-again")
const winCon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],  
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "" ,"" , "", "", "", "", ""]
let player="X";
let running=false;

startGame();

function startGame(){
    block.forEach(block => block.addEventListener("click", clickBlock));
    replay.addEventListener("click",restart);
    statusP.textContent= `${player}'s turn`;
    running=true;
}

function clickBlock(){
    const blockIndex = this.getAttribute("blockIndex");
    if(options[blockIndex] != "" || !running){
        return;
    }
    
    updateBlock(this,blockIndex);
    changePlayer();
    checkWinner();

}

function updateBlock(block,index){
    options[index]=player;
    block.textContent=player;
}

function changePlayer(){
    player = (player=="X") ? "O" : "X";
    statusP.textContent= `${player}'s turn`;
}

function checkWinner(){
    let roundWon=false;
    changePlayer();
    for(let i=0;i<winCon.length;i++){
        const condition=winCon[i];
        const blockA = options[condition[0]];
        const blockB = options[condition[1]];
        const blockC = options[condition[2]];

        if(blockA == "" || blockB == "" || blockC == ""){
            continue;
        }
        if(blockA == blockB && blockB==blockC){
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        statusP.textContent = `${player} wins`;
        running = false;
    }
    else if(!options.includes("")){
        statusP.textContent= `Draw`;
        running=false;
    }
    else{
        changePlayer();
    }
}

function restart(){
    player="X";
    options = ["", "", "" ,"" , "", "", "", "", ""];
    statusP.textContent=`${player}'s turn`;
    block.forEach(block => block.textContent="");
    running=true;
}
