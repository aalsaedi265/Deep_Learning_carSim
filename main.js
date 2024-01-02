
const canvas = document.getElementById("myCanvas");

canvas.width = 400;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

// Calculate the center position
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Create the car object at the center
// Assuming the car's dimensions are 30 (width) and 50 (height)
const carWidth = 30;
const carHeight = 50;

const road = new Road(canvas.width/2, canvas.width*0.94)

const car = new Car(road.getLaneCenter(4), centerY-carHeight / 2, carWidth, carHeight);
car.draw(ctx);

animate();

function animate() {
    car.update();

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    road.draw(ctx)
    car.draw(ctx);
    requestAnimationFrame(animate);
}


