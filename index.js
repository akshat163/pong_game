const gameBoard=document.querySelector("#gameBoard");
const ctx=gameBoard.getContext("2d");
const scoreText=document.querySelector("#scoreText");
const resetBtn=document.querySelector("#resetBtn");
const gamewidth=gameBoard.width;
const gameheight=gameBoard.height;
const paddle1Color="lightblue";
const boardBackground="forestgreen";
const paddle2Color="red";
const paddleborder="black";
const ballcolor="yellow";
const ballbordercolor="black";
const ballRadius=12.5;
const paddlespeed=50;
let intervalId;
let ballspeed=1;
let ballx=gamewidth/2;
let bally=gameheight/2;
let ballxdirection=0;
let ballydirection=0;
let player1score=0;
let player2score=0;
let paddle1={
    width:25,
    height:100,
    x:0,
    y:0
};
let paddle2={
    width:25,
    height:100,
    x:gamewidth-25,
    y:gameheight-100
};
window.addEventListener("keydown",changedirection);
resetBtn.addEventListener("click",resetgame);
gamestart();

function gamestart(){
   createball();
   nexttick();
};
function nexttick(){
    intervalId=setTimeout(()=>{
        clearboard();
        drawpaddles();
        moveball();
        drawball(ballx,bally);
        checkcollision();
        nexttick();
    },10)
};
function clearboard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gamewidth,gameheight);

};
function drawpaddles(){
    ctx.strokeStyle=paddleborder;
    ctx.fillStyle=paddle1Color;
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
    ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);

    ctx.strokeStyle=paddleborder;
    ctx.fillStyle=paddle2Color;
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
};
function createball(){
    ballspeed=1;
    if(Math.round(Math.random())==1){
       ballxdirection=1; 
    }
    else{
        ballxdirection=-1;
    }
    if(Math.round(Math.random())==1){
        ballydirection=1; 
     }
     else{
         ballydirection=-1;
     }
    ballx=gamewidth/2;
    bally=gameheight/2;
    drawball(ballx,bally);
};
function moveball(){
    ballx+=(ballspeed*ballxdirection);
    bally+=(ballspeed*ballydirection);
};
function drawball(ballx,bally){
    ctx.fillStyle=ballcolor;
    ctx.strokeStyle=ballbordercolor;
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.arc(ballx,bally,ballRadius,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkcollision(){
    if(bally<=0+ballRadius){
        ballydirection*=-1;
    }
    if(bally>=gameheight-ballRadius){
        ballydirection*=-1;
    }
    if(ballx<=0){
        player2score+=1;
        updatescore();
        createball();
        return;
    }
    if(ballx>=gamewidth){
        player1score+=1;
        updatescore();
        createball();
        return;
    }
    if(ballx<=(paddle1.x+paddle1.width+ballRadius)){
        if(bally>paddle1.y&&bally<paddle1.y+paddle1.height){
            ballx=(paddle1.x+paddle1.width)+ballRadius;
            ballxdirection*=-1;
            ballspeed++;
        }

    }
    if(ballx>=(paddle2.x-ballRadius)){
        if(bally>paddle2.y&&bally<paddle2.y+paddle2.height){
            ballx=paddle2.x-ballRadius;
            ballxdirection*=-1;
            ballspeed++;
        }
        
    }
};
function changedirection(event){
    const keypressed=event.keyCode;
    const paddle1up=87;
    const paddle1down=83;
    const paddle2up=38;
    const paddle2down=40;
    switch(keypressed){
        case(paddle1up):
           if(paddle1.y>0){
           paddle1.y-=paddlespeed;}
           break;
        case(paddle1down):
           if(paddle1.y<gameheight-paddle1.height){
           paddle1.y+=paddlespeed;}
           break;
        case(paddle2up):
           if(paddle2.y>0){
           paddle2.y-=paddlespeed;}
           break;
        case(paddle2down):
           if(paddle2.y<gameheight-paddle2.height){
           paddle2.y+=paddlespeed;}
           break;

    }

};
function updatescore(){
    scoreText.textContent=`${player1score}:${player2score}`;
};
function resetgame(){
    player1score=0;
    player2score=0;
    paddle1={
        width:25,
        height:100,
        x:0,
        y:0
    };
    paddle2={
        width:25,
        height:100,
        x:gamewidth-25,
        y:gameheight-100
    };
    ballspeed=1;
    ballx=0;
    bally=0;
    ballxdirection=0;
    ballydirection=0;
    updatescore();
    clearInterval(intervalId);
    gamestart();
};

