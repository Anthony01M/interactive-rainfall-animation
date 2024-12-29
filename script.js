const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
const intensitySlider = document.getElementById('intensity');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let raindrops = [];
let intensity = intensitySlider.value;

class Raindrop {
    constructor(x, y, length, speed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.speed = speed;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = Math.random() * -canvas.height;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
}

function createRaindrops() {
    raindrops = [];
    for (let i = 0; i < intensity; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const length = Math.random() * 20 + 10;
        const speed = Math.random() * 5 + 2;
        raindrops.push(new Raindrop(x, y, length, speed));
    }
}

intensitySlider.addEventListener('input', (event) => {
    intensity = event.target.value;
    createRaindrops();
});

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    raindrops.forEach(raindrop => {
        raindrop.update();
        raindrop.draw();
    });
}

createRaindrops();
animate();