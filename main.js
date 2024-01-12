
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 400;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 600;

carCanvas.height = window.innerHeight;
networkCanvas.height = window.innerHeight;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.94)
const N = 100
const cars = generateCar(N)

const traffic = [
    new Car(road.getLaneCenter(3), -100, 30, 50, "DUMMY",2 )
    ]

animate();

function generateCar(N) {
    const cars = []
    for (let i = 1; i < N; i++){
        cars.push(new Car(road.getLaneCenter(3), 100, 30, 50,"AI"))
    }
    return cars;
}

function animate(time) {
    for (const element of traffic){
        element.update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++){
        cars[i].update(road.borders, traffic);
    }
    
    // Find the best performing car
    const bestCar = cars.find(
        c => c.y == Math.min(...cars.map(c => c.y))
    );

    carCtx.clearRect(0, 0, carCanvas.width, carCanvas.height);
    
    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (const element of traffic){
        element.draw(carCtx, "red");
    }

    carCtx.globalAlpha = 0.2;
    for (const car of cars){
        car.draw(carCtx, "green");
    }

    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "green", true); // Draw only the best car with full opacity

    carCtx.restore();

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}
