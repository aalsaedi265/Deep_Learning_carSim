
const canvas = document.getElementById("myCanvas");
canvas.width = 400;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.94)
//                                      cen, wid, hight
const car = new Car(road.getLaneCenter(3), 100, 30, 50, "KEYS");

const traffic = [
    new Car(road.getLaneCenter(3), -100, 30, 50, "DUMMY",2 )
    ]

animate();

function animate() {
    for (let i = 0; i < traffic.length; i++){
        traffic[i].update(road.borders)
    }
    car.update(road.borders);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for (let i = 0; i < traffic.length; i++){
        traffic[i].draw(ctx)
    }
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}


