
const canvas = document.getElementById("myCanvas");
canvas.width = 400;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.94)
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for (const element of traffic){
        element.draw(ctx, "red")
    }
    car.draw(ctx, "blue");

    ctx.restore();
    requestAnimationFrame(animate);
}


