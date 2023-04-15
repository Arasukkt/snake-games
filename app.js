const gameBoard = document.getElementById('gameBoard')
const context = gameBoard.getContext('2d');
const scoreText =document.getElementById('scoreVal');
const HEIGHT = gameBoard.height;
const WIDTH = gameBoard.width;
const UNIT =20;

let foodx;
let foody;
let xVel =25;
let yVel =0;
let score=0;
let active=true;

let started = false;
let snake =[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0},
]
window.addEventListener('keydown',keypress)
startGame();

function startGame(){
    context.fillStyle ='#212l21';
    context.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    displayFood();
    drawSnake();
  //  moveSnake();
    //clearBoard();
    //drawSnake();
    
}
 function clearBoard(){
    context.fillStyle = '#212121'
    context.fillRect(0,0,WIDTH,HEIGHT);
 }
function createFood(){
    foodx= Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foody= Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
    
}
function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(foodx,foody,UNIT,UNIT)
}
function drawSnake(){

    context.fillStyle ='aqua';
    context.strokestyle ='#212121';
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT)
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT)
    })
}
function moveSnake(){
    const head ={x:snake[0].x+xVel,
    y:snake[0].y+yVel}
    snake.unshift(head)
    
    if(snake[0].x==foodx && snake[0].y==foody){
        score +=1;
        scoreText.textContent =score;
        createFood();
    }
    else
       snake.pop();
}
function nextTick(){
    if(active){

    
    setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        checkGameover();
        drawSnake();
        nextTick(); 

    },400);
}
else{
    clearBoard();
    context.font ="bold 50px serif";
    context.fillStyle="white";
    context .textAlign ="center";
    context.fillText("Game Over !!",WIDTH/2,HEIGHT/2)
}
}
function keypress(event){
    if(!started){
        started=true;
        nextTick();
    }

    const LEFT =37
    const UP = 38
    const RIGHT =39
    const DOWN = 40

    switch(true){
        case(event.keyCode==LEFT && xVel !=UNIT):
        xVel=-UNIT;
        yVel=0;
        break;
        case(event.keyCode==RIGHT && xVel!=-UNIT):
        xVel=UNIT;
        yVel=0;
        break;
        case(event.keyCode==UP && yVel !=UNIT):
        xVel=0;
        yVel=-UNIT;
        break;
        case(event.keyCode==DOWN && yVel!=-UNIT):
        xVel=0;
        yVel=UNIT;
        break;

    }
}
function checkGameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
        active=false;
        break;
    }
}