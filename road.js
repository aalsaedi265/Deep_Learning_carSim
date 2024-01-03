
class Road{
  constructor(x, width, laneCount = 7) {//American lane number
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    //make top of the road goes infinity
    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft={x: this.left, y:this.top}
    const topRight={x: this.right, y:this.top}
    const bottomLeft={x: this.left, y:this.bottom}
    const bottomRight={x: this.right, y:this.bottom}
    this.borders=[
        [topLeft,bottomLeft],
        [topRight,bottomRight]
    ];
    for(let y=-1000;y<=0;y++){
          const x=Math.sin(y*0.01)*50;
          this.borders[0].push({x:x+this.left,y:y});
          this.borders[1].push({x:x+this.right,y:y});
       }
    this.borders[0].push(bottomLeft);
    this.borders[1].push(bottomRight);

  }

  //define the center of each lane
  getLaneCenter(laneIndex) {
    // laneIndex=[0,1,2,3]
    const laneWidth=this.width / this.laneCount;
    // this.left+laneWidth/2 --> starts from the middle of theleft lane
    // Math.min(laneIndex,this.laneCount-1)*laneWidth --> the car always goes to the right most possible lane
    
    return this.left+laneWidth/2+
      Math.min(laneIndex,this.laneCount-1)*laneWidth;
    // Return us the (laneCount) different lane indicies, an offset of laneWidth away from the middle of the first lane
    }
    
      draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for (let i = 0; i <= this.laneCount; i++) {
      //lerp - linear interpolation - utils.js
      const x = lerp(
        this.left, 
        this.right, 
        i / this.laneCount
      );

        ctx.setLineDash([20,20]);
        ctx.beginPath(); //starts a new path by emptying the list of sub-paths
        ctx.moveTo(x, this.top); //moves the current window to the specified coordinates.
        ctx.lineTo(x, this.bottom); //adds a straight line to the current sub-path by connecting the sub-path's last point to the specified (x, y) coordinates.
        ctx.stroke(); //outlines the current or given path with the current stroke style
        }
        ctx.setLineDash([])
        this.borders.forEach(border=>{
          ctx.beginPath();
          ctx.moveTo(border[0].x,border[0].y);
          for(let i=1;i<border.length;i++){
             ctx.lineTo(border[i].x,border[i].y);
          }
          ctx.stroke();
       });
       ctx.setLineDash([]);
    }
}

