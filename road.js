
class Road{
    constructor(x, width, laneCount = 7) {
        this.x = x
        this.width = width
        this.laneCount = laneCount

        this.left = x - width /2
        this.right = x + width /2
        
        const inf = 1000000000000000000000;
        this.top = -inf
        this.bottom = inf
    }

    getLaneCenter(landeIndex) {
        const laneWidth = this.width / this.laneCount
        return this.left+laneWidth/2+landeIndex*laneWidth
    }
    
    draw(ctx) {
        const canvasHeight = ctx.canvas.height;

        this.top = 0; // top of the canvas
        this.bottom = canvasHeight; // bottom of the canvas
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        //lanes
        for (let i = 0; i <= this.laneCount; i++){
            // linear interplation
            const x = lerp(
                this.left,
                this.right,
                i/this.laneCount
            )
            //road dashes
            if (i > 0 && i < this.laneCount) {
                ctx.setLineDash([20,20])
            } else {
                ctx.setLineDash([])   
            }
            // Draw border
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    }
}

