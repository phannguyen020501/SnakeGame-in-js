const snakeboard=document.getElementById("snake");
const snakeboard_ctx=snakeboard.getContext("2d");

const board_bg="WHITE";
const board_border="BLACK";
const snake_color="LIGHTBLUE";
const snake_border="DARKBLUE";

let snake=[
    {x:200,y:200},
    {x:190,y:200},
    {x:180,y:200},
    {x:170,y:200},
    {x:160,y:200}
]
let changing_direction=false;

let food_x;
let food_y;
let score=0;
//start game
const framePerSecond=10;
main();
gen_food();
document.addEventListener("keydown",change_direction);
//main function called repeatedly to keep the game running

function main(){
    
    setInterval(function onTick(){
    if(has_ended_game()) return;
    clearCanvas();
    move_snake();
    drawSnake();
    changing_direction=false;
    draw_food();
    },1000/framePerSecond);

};
//draw a border around the canvas
function clearCanvas(){
    //select color to fill the drawing
    snakeboard_ctx.fillStyle=board_bg;
    //select color for the border of the canvas
    snakeboard_ctx.strokeStyle=board_border;
    //draw a rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0,0,snakeboard.clientWidth,snakeboard.clientHeight);
    //draw a border around the entire canvas
    snakeboard_ctx.strokeRect(0,0,snakeboard.clientWidth,snakeboard.clientHeight);
}
//draw snake on the canvas
function drawSnake(){
    snake.forEach(drawSnakePart);
}
//draw one snake part
function drawSnakePart(snakePart){
    //set the color of the snake part
    snakeboard_ctx.fillStyle=snake_color;
    //set the border color of the snake part
    snakeboard_ctx.strokeStyle=snake_border;
    //draw rectangle to represent the snake part
    snakeboard_ctx.fillRect(snakePart.x,snakePart.y,10,10);
    //draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x,snakePart.y,10,10);
}
let dx=10;
let dy=0;
function move_snake(){
    //create new snake's head
    const head={x:snake[0].x +dx, y:snake[0].y+dy};
    //add the new head to the beginning of the snake
    snake.unshift(head);

    const has_eaten_food= snake[0].x===food_x && snake[0].y===food_y;
    if(has_eaten_food){
        score+=10;
        document.getElementById("score").innerHTML=score;
        gen_food();
    }else{
        snake.pop();
    }
}
//changing direction
function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
    }
}

//game ended

function has_ended_game(){
    for(let i=4;i<snake.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y) return true;
    }
    const hitLeftWall=snake[0].x <0;
    const hitRightWall=snake[0].x+10>snakeboard.clientWidth;
    const hitTopWall=snake[0].y<0;
    const hitBottomWall=snake[0].y+10>snakeboard.clientHeight;
    return hitLeftWall || hitRightWall || hitBottomWall || hitTopWall;
}

function random_food(min,max){
    return Math.round((Math.random()*(max-min)+min)/10)*10;
}

function gen_food(){
    food_x=random_food(0,snakeboard.clientWidth-10);
    food_y=random_food(0,snakeboard.clientHeight-10);
    //if the new food location in where the snake currently is, generate a new food
    snake.forEach(function has_snake_eaten(part){
        const has_eaten=part.x===food_x && part.y===food_y;
        if(has_eaten) return gen_food(); 
    });
}
function draw_food(){
    snakeboard_ctx.fillStyle="lightgreen";
    snakeboard_ctx.strokeStyle="darkgreen";
    snakeboard_ctx.fillRect(food_x,food_y,10,10);
    snakeboard_ctx.strokeRect(food_x,food_y,10,10);
}
