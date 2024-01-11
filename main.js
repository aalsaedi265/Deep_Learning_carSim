
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 400;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 600;

carCanvas.height = window.innerHeight;
networkCanvas.height = window.innerHeight;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.94)
//                                      cen, wid, hight
const car = new Car(road.getLaneCenter(3), 100, 30, 50, "AI");

const traffic = [
    new Car(road.getLaneCenter(3), -100, 30, 50, "DUMMY",2 )
    ]

animate();

function animate() {
    for (const element of traffic){
        element.update(road.borders, [])
    }
    car.update(road.borders, traffic);

    carCtx.clearRect(0, 0, carCanvas.width, carCanvas.height);
    carCtx.save();
    carCtx.translate(0, -car.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (const element of traffic){
        element.draw(carCtx, "red")
    }
    car.draw(carCtx, "blue");

    carCtx.restore();

    Visualizer.drawNetwork(networkCtx, car.brain)
    requestAnimationFrame(animate);
}


