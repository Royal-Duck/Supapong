let bg;
let paddle_x; let paddle_y; let paddle_width = 150; let paddle_height = 25; let paddle_speed = 500

function setup() { // p5.js initialisation function
    createCanvas(1024, 576);
    noSmooth();
    paddle_x = width / 2;
    paddle_y = height - 75;
    bg = loadImage("assets/bg.png");
}

function draw_background(offset = 0, scale = 1) {
    for (let x = -(offset % (bg.width * scale)); x < width; x += (bg.width * scale)){
        for (let y = -(offset % (bg.height * scale)); y < height; y += (bg.height * scale)){
            image(bg, x, y, bg.width * scale, bg.height * scale);
        }
    }
}

function draw_paddle() {
    fill(color(255, 249, 182))
    rectMode(CENTER);
    rect(paddle_x, paddle_y, paddle_width, paddle_height);
}

let going_left = false; let going_right = false;

let b = new Ball(10, 100, 300, [0, -1], 8, ()=>{}, ()=>{});

function draw() { // p5.js draw function
    draw_background(millis() / 25, 4);
    paddle_x += paddle_speed * deltaTime / 1000 * going_right;
    paddle_x -= paddle_speed * deltaTime / 1000 * going_left;
    paddle_x = clamp(paddle_x, paddle_width / 2, width - paddle_width / 2)
    draw_paddle();
    b.update();
}

window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
        going_right = true;
    }
    if (e.key == "ArrowLeft") {
        going_left = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight") {
        going_right = false;
    }
    if (e.key == "ArrowLeft") {
        going_left = false;
    }
});