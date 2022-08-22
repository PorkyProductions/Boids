class Boid {
    constructor() {
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();
        this.angle = Math.random() * 360;

    }
    Draw() {
        ctx.save();
        ctx.beginPath();

        ctx.moveTo(this.x + Math.cos(this.angle * DEG_TO_RAD) * boidSize / 2, this.y + Math.sin(this.angle * DEG_TO_RAD) * boidSize / 2);
        ctx.lineTo(this.x + Math.cos((this.angle + 140) * DEG_TO_RAD) * boidSize / 2, this.y + Math.sin((this.angle + 140) * DEG_TO_RAD) * boidSize / 2)
        ctx.lineTo(this.x + Math.cos((this.angle + 220) * DEG_TO_RAD) * boidSize / 2, this.y + Math.sin((this.angle + 220) * DEG_TO_RAD) * boidSize / 2)
        ctx.fill();
        ctx.restore();
        console.log("ye");
    }
    Move() {
        this.x += Math.cos(this.angle * DEG_TO_RAD) * boidSpeed;
        this.y += Math.sin(this.angle * DEG_TO_RAD) * boidSpeed;

        if (this.x < -boidSize) {
            this.x = canvas.width + boidSize;
        }
        if (this.y < -boidSize) {
            this.y = canvas.height + boidSize;
        }
        if (this.x > canvas.width + boidSize) {
            this.x = -boidSize;
        }
        if (this.y > canvas.height + boidSize) {
            this.y = -boidSize;
        }
    }
}
const DEG_TO_RAD = Math.PI / 180;


const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const ctx = canvas.getContext("2d");

const boidSize = canvas.width / 30;
const numOfBoids = 50;
let boidSpeed = 3;

let boids = [];




function Start() {
    //create boids
    for (var i = 0; i < numOfBoids; i++) {
        boids.push(new Boid);
    }
}
function Update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    UpdateInputs();
    UpdateBoids();
    
}



let alwaysMove = false;


function UpdateBoids() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    boids.forEach(function (boid) {

        if (alwaysMove) {
            boid.Move();
        }
        boid.Draw();

    })
}
function UpdateInputs() {
    alwaysMove = document.querySelector('.checkboxMove:checked') != null;
}






































document.addEventListener('DOMContentLoaded', function () {
    Start();
}, false);
setInterval(function () {
    Update();
}, 5)





/////////////////////////////////////////////////////////////Basic Functions////////////////////////////////////////
function GetDistance(x1, y1, x2, y2) {
    var y = x2 - x1;
    var x = y2 - y1;
    return Math.sqrt(x * x + y * y);
}
/////////////////////////////////////////////////////////////Canvas Drawing Methods//////////////////////////////////
function DrawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}
function FillCircle(x, y, r, color) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}
function DrawRect(x, y, width, height, degrees, color) {
    // first save the untranslated/unrotated context
    ctx.save();
    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate(x, y);
    // rotate the rect
    ctx.rotate(degrees * Math.PI / 180);
    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.rect(-width / 2, -height / 2, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    // restore the context to its untranslated/unrotated state
    ctx.restore();
}