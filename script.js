const rulesBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const canvas = document.getElementById('canvas1');
const scoreEl = document.getElementById('score');
const winEl = document.getElementById('win');
const ctx = canvas.getContext('2d');

//button handling------------------------------
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
    rulesBtn.style.display = 'none';
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
    setTimeout(()=>{
      rulesBtn.style.display = 'block';
    },1000);    
});
//----------------------------------------------

canvas.width = innerWidth;
canvas.height = innerHeight;
window.addEventListener('resize',()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

function main() {
    setInterval(()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ball.draw();
        ball.update();
        drawPaddle();  
        showAllBricks(); 
        if (score==20) {
            canvas.style.display = 'none';
            rightBtn.style.display = 'none';
            leftBtn.style.display = 'none';
            score=20;
            winEl.innerHTML = `<h2>Congratulations..<br> You Win.......</h2>`;
            bricks=[];         
        } 
                  
    },1000/60);
}
let score=0;
function showAllBricks() {
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].draw();
        bricks[i].update();  
        if (ball.y + ball.size > canvas.height) {
            bricks[i].visible = true;
            score = 0;
            scoreEl.innerHTML = `score : ${score}`; 
        }            
    }
}
 
main();

class Ball{
    constructor(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size =  10;
        this.xspeed = 4;
        this.yspeed = -4;
        this.visible = true;
    }
    draw(){
      
        ctx.beginPath();
        ctx.fillStyle = this.visible ? 'rgb(223, 61, 255)' : 'transparent';
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        this.x += this.xspeed;
        this.y += this.yspeed;
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.xspeed *= -1; 
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.yspeed *= -1;
        }
        if (
            this.x + this.size > paddle.x &&
            this.x - this.size < paddle.x + paddle.w &&
            this.y + this.size > paddle.y 
          ) {
            this.yspeed *= -1;
          }  
    }
}
let ball = new Ball();

const paddle = {
    x: canvas.width / 2-40,
    y: canvas.height -15,
    w: canvas.width/5,
    h: 30,
    visible: true
  };
  
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? 'rgb(223, 61, 255)' : 'transparent';
    ctx.fill();
    ctx.closePath();
}
leftBtn.addEventListener('click',()=>{
      paddle.x += -95;     
      if (paddle.x < 0) {
        paddle.x = 0;
        }
});
rightBtn.addEventListener('click',()=>{
    paddle.x += 95;   
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
});

class Briks{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width =canvas.width/6;
        this.height = 20;
        this.padding = 10;
        this.offsetX = 45;
        this.offsetY = 60;
        this.visible = true;
    }
    draw(){
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.visible ? 'rgb(232, 245, 142)' : 'transparent';
      ctx.fill();
      ctx.closePath();
    }
    update(){
        if (this.visible) {
            if (
              ball.x - ball.size > this.x &&
              ball.x + ball.size < this.x +this.width && 
              ball.y + ball.size > this.y && 
              ball.y - ball.size < this.y + this.height
            ) {
              ball.yspeed *= -1;
              this.visible = false;
    
              score++;
              scoreEl.innerHTML = `score : ${score}`; 
            }
          }
    }
}


const brickRowCount = 4;
const brickColumnCount = 5;

let bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * canvas.width/4+15;
    const y = j * canvas.height/15;
    bricks.push(new Briks(x,y));
  }
}
