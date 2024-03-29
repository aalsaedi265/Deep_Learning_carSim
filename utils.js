function lerp(A, B, t) {
  return A + (B - A) * t;
}

function getIntersection(A,B,C,D){ 
  const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
  const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
  const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
  
  if(bottom!=0){
      const t=tTop/bottom;
      const u=uTop/bottom;
      if(t>=0 && t<=1 && u>=0 && u<=1){
          return {
              x:lerp(A.x,B.x,t),
              y:lerp(A.y,B.y,t),
              offset:t
          }
      }
  }

  return null;
}

function polysIntersect(poly1,poly2){
  for(let i=0;i<poly1.length;i++){
    for(let j=0;j<poly2.length;j++){
      // check if they're touch or not
      // comparing points against every points in the polygon
      const touch = getIntersection(
        poly1[i],
        poly1[(i+1)%poly2.length], //modular: make this value = zero, so that the last & first point of the polygon=(0,0) when they're conected
        poly2[j],
        poly2[(j+1)%poly2.length],
      );
      if(touch){
        return true;
      }
    }
  }
  return false;
}

function getRGBA(value){
  const alpha=Math.abs(value);
    // const R=value<0?0:205;
    // const G=R;
    // const B=value>0?0:205;
  // return "rgba("+R+","+G+","+B+","+alpha+")";
  let R, G, B;
  if (value > 0) {
        // Positive weights (keep your existing color, assuming green)
        R = 0;
        G = 255;
        B = 0;
  } else {
        // Negative weights (pink)
        R = 255; // high red
        G = 105; // lower green
        B = 255; // high blue to create pink
  }
  return `rgba(${R},${G},${B},${alpha})`;
}
  