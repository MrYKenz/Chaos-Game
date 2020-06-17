const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// set inital points of equilateral triangle to plot against
const points_tri = [
    { x: 5, y: canvas.height - 5 },
    { x: canvas.width - 5, y: canvas.height - 5 },
    { x: canvas.width / 2, y: 5 }
];
// set inital points of square to plot against
const points_square = [
    { x: 5, y: canvas.height - 5 },
    { x: 5, y: 5 },
    { x: canvas.width - 5, y: canvas.height - 5 },
    { x: canvas.height - 5, y: 5 }
];

// plot dot based on x and y co-ords
function plot(xy) {
    ctx.beginPath();
    ctx.arc(xy.x, xy.y, 1, 0, 2 * Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

// update position of dot based on x and y co-ords
function update(x, y, point) {
    let X = Math.min(x, point.x) + 
            (Math.max(x, point.x) - Math.min(x, point.x)) / 2;
    let Y = Math.min(y, point.y) + 
          ( Math.max(y, point.y) - Math.min(y, point.y)) / 2;
    return { x: X, y: Y };
}

// loop and plot dot randomly inbetween 3 dots
function render_tri() {
    let x = canvas.width / 4;
    let y = canvas.height / 2;
    for (let i = 0; i < 400; i++) {
        plot({ x, y });
        let randomInt = Math.floor(Math.random() * 7);
        const currentDot =
        randomInt == 1 || randomInt == 2
        ? update(x, y, points_tri[0])
        : randomInt == 3 || randomInt == 4
        ? update(x, y, points_tri[1])
        : update(x, y, points_tri[2]);
        x = currentDot.x;
        y = currentDot.y;
    }
}

// loop and plot dot randomly inbetween 4 dots
function render_square() {
    let x = canvas.width / 4;
    let y = canvas.height / 2;
    for (let i = 0; i < 400; i++) {
        plot({ x, y });
        let randomInt = Math.floor(Math.random() * 14);
        const currentDot =
        randomInt == 1 || randomInt == 2
            ? update(x, y, points_square[0])
        : randomInt == 3 || randomInt == 4
            ? update(x, y, points_square[1])
        : randomInt == 5 || randomInt == 6
            ? update(x, y, points_square[2])
        : update(x, y, points_square[3]);
        x = currentDot.x;
        y = currentDot.y;
    }
}

function run_tri() {
    let time = 0;
    let timer = setInterval(() => {
        if (time >= 400) {
            return clearInterval(timer);
        }
        render_tri();
        time++;
    }, 200);
}

function run_square() {
    let time = 0;
    let timer = setInterval(() => {
        if (time >= 200) {
            return clearInterval(timer);
        }
        render_square();
        time++;
    }, 100);
}

