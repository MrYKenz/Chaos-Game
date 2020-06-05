const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// set inital points of equilateral triangle to plot against
const points = [
    { x: 5, y: canvas.height - 5 },
    { x: canvas.width - 5, y: canvas.height - 5 },
    { x: canvas.width / 2, y: 5 }
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

// loop and plot dot in random position
function render() {
    let x = canvas.width / 4;
    let y = canvas.height / 2;
    for (let i = 0; i < 400; i++) {
        plot({ x, y });
        let randomInt = Math.floor(Math.random() * 7);
        const currentDot =
        randomInt == 1 || randomInt == 2
            ? update(x, y, points[0])
            : randomInt == 3 || randomInt == 4
            ? update(x, y, points[1])
            : update(x, y, points[2]);
        x = currentDot.x;
        y = currentDot.y;
    }
}

function run() {
    let time = 0;
    let timer = setInterval(() => {
        if (time >= 400) {
            return clearInterval(timer);
        }
        render();
        time++;
    }, 200);
}
run();