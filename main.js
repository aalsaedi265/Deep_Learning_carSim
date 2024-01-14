
const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const N = 100

carCanvas.width = 400;
networkCanvas.width = 600;

carCanvas.height = window.innerHeight;
networkCanvas.height = window.innerHeight;


const road = new Road(carCanvas.width / 2, carCanvas.width * 0.94)
const cars = generateCar(N)
let bestCar = cars[0];

if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(5),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-1000,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(6),-1000,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(4), -900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(3),-400,30,50,"DUMMY",2),
    ]

animate();

function save() {
   localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}


function generateCar(N) {
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(3),100,30,50,"AI"));
    }
    return cars;
}

function animate(time) {
    // Clear the canvas
    carCtx.clearRect(0, 0, carCanvas.width, carCanvas.height);
    networkCtx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);

    // Update all traffic elements
    for (const element of traffic) {
        element.update(road.borders, []);
    }

    // Update all cars
    for (const car of cars) {
        car.update(road.borders, traffic);
    }

    // Determine the best performing car based on the 'y' position
    bestCar = cars.find(c => c.y === Math.min(...cars.map(c => c.y)));

    // Translate the canvas to focus on the best car
    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    // Draw the road and traffic
    road.draw(carCtx);
    for (const element of traffic) {
        element.draw(carCtx, "red");
    }

    // Draw all cars with lower opacity
    carCtx.globalAlpha = 0.2;
    for (const car of cars) {
        car.draw(carCtx, "green");
    }

    // Draw the best car with full opacity
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "green", true);

    // Restore the canvas state
    carCtx.restore();

    // Update neural network visualization
    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);

    // Request the next animation frame
    requestAnimationFrame(animate);
}