const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let debug = false
const width = 500;
const height = 500;

function consoleDebug(input){
    console.log(input);
}

class Sprite {
    constructor(x, y, width, height, color){
        this.position = {
            x : x,
            y : y
        }
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Snake {
    constructor(x, y, size, speed){
        this.size = size;
        this.speed = speed;
        this.head = new Sprite(x, y, this.size, this.size, 'green');
        this.body = [this.head]; 
        this.bodyInit();
    }
    getX(){
        return this.head.position.x;
    }
    getY(){
        return this.head.position.y;
    }

    bodyInit(){
        for(let i = 1; i < 5; i++){
            this.body.push(new Sprite(
                this.body[i-1].position.x-this.size, this.body[i-1].position.y, this.size, this.size, 'green'))
        }
    }
    draw(){
        for(let i = 0; i<this.body.length; i++){
            this.body[i].draw();
        }
    }
    update(direction){
        switch(direction){
            case 2: 
                this.movehead(-this.speed, 0);
                break;
            case 3: 
                this.movehead(this.speed, 0);
                break;
            case 0: 
                this.movehead(0, -this.speed);
                break;
            case 1: 
                this.movehead(0, this.speed);
                break;
        }
        for(let x of this.body){
            //checks if the snake is outside of the border;
            if(x.position.x > width){
                x.position.x -= width;
            } else if (x.position.x < 0){
                x.position.x += width;
            }
            if(x.position.y > height){
                x.position.y -= height;
            } else if (x.position.y < 0){
                x.position.y += height;
            }
        }
    }
    movehead(x, y){
        this.head.position.x += x;
        this.head.position.y += y;
    }
}





//__init__
let snake = new Snake(200, 200, 20, 10);
snake.draw();

//adds controls to the game
let mode = 0;


function update(){
    snake.update(mode);
}
function draw(){
    ctx.clearRect(0, 0, 500, 500);
    snake.draw();
}
//variables for game loop
var then = Date.now();
var now;
const fps = 30;
function gameLoop(){
    now = Date.now();
    let difference = now - then;
    if(difference > 1000/fps){
        update();
        draw();
        then = now;
    }
    requestAnimationFrame(gameLoop);
}

gameLoop()

document.addEventListener("keydown", (e) =>{
    if(snake.getX()%10==0 && snake.getY()%10==0){
        console.log(e.code);
        console.log(snake.getX())
        console.log(snake.getX()%20)
        if(e.code==="KeyW" && mode!=1){
            mode = 0;
        } else if(e.code==="KeyS" && mode!=0){
            mode = 1;
        } else if(e.code==="KeyA" && mode!=3){
            mode = 2;
        } else if(e.code==="KeyD" && mode!=2){
            mode = 3;
        }
    }
    }
})

//let bob = new Sprite(100, 100, 100, 100, "red");
//bob.draw();