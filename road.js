
class Road{
    constructor(x, width, laneCount = 8) {
        this.x = x
        this.width = width
        this.laneCount = laneCount

        this.left = x - width /2
        this.right = x + width /2
        
        const inf = 1000000000000000000000;
        this.top = -inf
        this.bottom = inf
    }
    
    draw(ctx) {
        const canvasHeight = ctx.canvas.height;

        this.top = 0; // top of the canvas
        this.bottom = canvasHeight; // bottom of the canva
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        // Draw left border
        ctx.beginPath();
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.left, this.bottom);
        ctx.stroke();

        // Draw right border
        ctx.beginPath();
        ctx.moveTo(this.right, this.top);
        ctx.lineTo(this.right, this.bottom);
        ctx.stroke();
    }
}