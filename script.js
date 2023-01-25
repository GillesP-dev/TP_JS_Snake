// function draw() {
//     const canvas = document.getElementById('canvas');
//     if (canvas.getContext) {
//       const ctx = canvas.getContext('2d');

//       ctx.beginPath();
//       ctx.arc(100,100,60,0,Math.PI*2,true);
//       ctx.moveTo(140,100);
//       ctx.arc(100,100,40,0,Math.PI,false);
//       ctx.moveTo(80,75);
//       ctx.arc(75,75,5,0,Math.PI*2,true);
//       ctx.moveTo(130,75);
//       ctx.arc(125,75,5,0,Math.PI*2,true);
//        ctx.moveTo(100,75);
//       ctx.lineTo(100,100);
//       ctx.stroke();

//     }}
//     draw();

let dx = 10;
let dy = 0;
let foodX;
let foody;
let score = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }, { x: 170, y: 200 }, { x: 160, y: 200 }];
let changing_direction = false;

main();
creationBouffe();
document.addEventListener("keydown", changeDirection);

function main() {
  if (finDuJeux()) return;

  changing_direction = false;

  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 100)
}

function clearCanvas() {

  ctx.fillStyle = "lightgrey";
  ctx.strokestyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach(drawsnakePart);
}
function drawsnakePart(snakePart) {

  ctx.fillStyle = 'lightblue';
  ctx.strokeStyle = 'darkblue';
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
function drawFood(){
  ctx.fillStyle = 'lightgreen';
  ctx.strokeStyle = 'darkgreen';
  ctx.fillRect(foodX, foody, 10, 10);
  ctx.strokeRect(foodX, foody, 10, 10);
 }




function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const snakeBouffe = snake[0].x === foodX && snake[0].y === foody;
  if(snakeBouffe){
    score += 10;
    document.querySelector("#score").innerText = score;
    creationBouffe();
  }else {
    snake.pop();
  }  
}







function changeDirection(event) {
  const left = 37;
  const right = 39;
  const up = 38;
  const down = 40;

  if (changing_direction) return;
  changing_direction = true;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === left && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === right && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === up && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === down && !goingUp) {
    dx = 0;
    dy = 10;
  }

}

function finDuJeux() {
  for (let i = 4; i < snake.length; i++) {
    const collision = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (collision) {
      return true;
    }
  }
  const murGauche = snake[0].x < 0;
  const murDoite = snake[0].x > canvas.width - 10;
  const murHaut = snake[0].y < 0;
  const murBas = snake[0].y > canvas.height - 10;

  return murGauche || murDoite || murHaut || murBas
}

function bouffeAleatoire(min,max){
  return Math.round((Math.random()*(max-min)+min)/10)*10;
}
 function creationBouffe() {
  foodX = bouffeAleatoire(0,canvas.width - 10);
  
  foody = bouffeAleatoire(0,canvas.height -10);

  snake.forEach(function snakeEat(part){
    const manger = part.x == foodX && part.y == foody;
    if(manger){creationBouffe();}
  });
 }

 
