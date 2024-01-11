
class Car{
    constructor(x, y, width, height, controlType, maxSpeed=5) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.speed = 0
        this.acceleration = 0.5
        this.maxSpeed = maxSpeed
        this.friction = 0.06
        this.angle = 0
        this.damaged = false

        this.useBrain = controlType == "AI"
  
        if(controlType!="DUMMY"){
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
            // size of layer = rayCount  // layers: 6 (1hidden layer,1output) //neurons= 4 
        }
        this.controls = new Controls(controlType);
        
    }
    //BOX2D can replace the below
    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#aseessDamage(roadBorders, traffic);
        }
        if (this.sensor) {
            this.sensor.update(roadBorders, traffic);
            const offsets = this.sensor.readings.map(s => s == null ? 0 : 1 - s.offset);
            const outputs = NeuralNetwork.feedForward(offsets, this.brain);
// console.log(outputs)
            if (this.useBrain) {
                const threshold = 0.5; // Define a suitable threshold
                this.controls.forward = outputs[0] > threshold;
                this.controls.left = outputs[1] > threshold;
                this.controls.right = outputs[2] > threshold;
                this.controls.reverse = outputs[3] > threshold;
            }
        }
    }

    #aseessDamage(roadBorders,traffic){
        for(const element of roadBorders){
            if(polysIntersect(this.polygon,element)){
                return true;
            }
        }
        for(const element of traffic){
            if(polysIntersect(this.polygon,element.polygon)){
                return true;
            }
        }
    }

    #createPolygon() {
        const points=[];
        const rad=Math.hypot(this.width, this.height)/2;
        const alpha = Math.atan2(this.width, this.height);
        
        points.push({
        x: this.x-Math.sin(this.angle-alpha)*rad,
        y: this.y-Math.cos(this.angle-alpha)*rad,
        });
        points.push({
        x: this.x-Math.sin(this.angle+alpha)*rad,
        y: this.y-Math.cos(this.angle+alpha)*rad,
        });
        points.push({
        x: this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
        y: this.y-Math.cos(Math.PI+this.angle-alpha)*rad,
        });
        points.push({
        x: this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
        y: this.y-Math.cos(Math.PI+this.angle+alpha)*rad,
        });
        return points
    }
    
    #move() {
        // Handling for AI and keyboard controls
        if (this.useBrain || this.controls.type === "KEYS") {
            // Forward and reverse control
            if (this.controls.forward) {
                this.speed += this.acceleration;
            }
            if (this.controls.reverse) {
                this.speed -= this.acceleration;
            }

            // Speed adjustment and friction application
            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed;
            }
            if (this.speed < -this.maxSpeed / 2) {
                this.speed = -this.maxSpeed / 2;
            }
            if (this.speed > 0) {
                this.speed -= this.friction;
            }
            if (this.speed < 0) {
                this.speed += this.friction;
            }
            if (Math.abs(this.speed) < this.friction) {
                this.speed = 0;
            }

            // Steering control
            if (this.speed != 0) {
                const flip = this.speed > 0 ? 1 : -1;
                if (this.controls.left) {
                    this.angle += 0.03 * flip;
                }
                if (this.controls.right) {
                    this.angle -= 0.03 * flip;
                }
            }

            // Update the car's position based on angle and speed
            this.x -= Math.sin(this.angle) * this.speed;
            this.y -= Math.cos(this.angle) * this.speed;
        }

        // Handling for DUMMY control type
        if (this.controls.type === "DUMMY") {
            this.speed = this.maxSpeed;
            // Update position for DUMMY as well
            this.x -= Math.sin(this.angle) * this.speed;
            this.y -= Math.cos(this.angle) * this.speed;
        }
    }
    draw(ctx, color) {

        if (this.damaged) {
            ctx.fillStyle = 'gray'
        } else {
            ctx.fillStyle = color
        }
        ctx.beginPath()
        if (!this.polygon) return // check to make sure there is something before giving it try
        
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y)
        
        for (let i = 1; i < this.polygon.length; i++){
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill()
        if( this.sensor) this.sensor.draw(ctx)
    }
}

