class Road {
  constructor(x, width, laneCount = 7) {
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
    //Road {x: 100, width: 180, laneCount: 3, left: 10, right: 190}
    // road.borders
    // (2) [Array(2), Array(2)]
    // 0: [ {x: 10, y: -1000000} 
    //      {x: 10, y: 1000000 } ]
    // 1: [ {x: 190, y: -1000000} 
    //      {x: 190, y: 1000000 } ]
  }

  //define the center of each lane
  getLaneCenter(laneIndex) {
    // laneIndex=[0,1,2,3]
    const laneWidth=this.width / this.laneCount;
    
    return this.left+laneWidth/2+
      Math.min(laneIndex,this.laneCount-1)*laneWidth;
   
  }
  // draw a road
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
      ctx.moveTo(x, this.top); 
      ctx.lineTo(x, this.bottom); 
      ctx.stroke();
    }

    ctx.setLineDash([]);
    this.borders.forEach(border=>{
        ctx.beginPath(); 
        ctx.moveTo(border[0].x, border[0].y);
        ctx.lineTo(border[1].x, border[1].y);
        ctx.stroke(); 
    });
  }
}