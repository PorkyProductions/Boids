class Boid {
    constructor() {
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();
        this.angle = Math.random() * 360;

    }
    Draw() {
        DrawRect(this.x, this.y, boidSize, 2 * boidSize, this.angle, "red");
    }
}

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const ctx = canvas.getContext("2d");

const boidSize = canvas.width / 100;
const numOfBoids = 50;

let boids = [];
for (var i = 0; i < 50; i++) {
    boids.push(new Boid);
}



function Start() {

}
function Update() {
    DrawAll();
}
function DrawAll() {
    boids.forEach(function (boid) {
        boid.Draw();
    })
}




































document.addEventListener('DOMContentLoaded', function () {
    Start();
}, false);
setInterval(function () {
    Update();
}, 50)





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