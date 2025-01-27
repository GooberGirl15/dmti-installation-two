let pxSize;

function setup() {
let w = displayHeight
let h = displayWidth
  createCanvas(windowWidth/2, windowHeight/2);
  capture = createCapture(VIDEO,{flipped:true});
  
  //capture setting
  capture.size(windowHeight,windowWidth)
  capture.hide();
  
}



function draw() {
  background(0,0,0,100);
  
   
  
  push();
  //drawing capture - top left
  translate(0,width/2-200)
  rotate(HALF_PI * 3)
  // image(capture,0,0, displayHeight,displayWidth);
  Threshold(3)
  pop();
  
  push();
  //drawing capture - top right
  translate(width/2,height/2+10)
  rotate(HALF_PI * 3)
  Threshold(8)
  pop();
  
  push();
  //drawing capture - bottom right
  translate(width/2,height+250)
  rotate(HALF_PI * 3)
  Threshold(15)
  pop();
  
  push();
  //drawing capture - bottom left
  translate(0,height+250)
  rotate(HALF_PI * 3)
  Threshold(50)
  pop();
  
 
 

  
}

  function Threshold(pxSize){
   capture.loadPixels();
  pxSize = pxSize;
  var thresholdAmount = 130;
  
  for (var x = 0; x < capture.width; x+= pxSize){
    for (var y = 0; y < capture.height; y+= pxSize){
      var i = (y * (capture.width) + x)*4;
      var redVal = capture.pixels[i];
      var greenVal = capture.pixels[i+1];
      var blueVal = capture.pixels[i+2];
      
      if (redVal <=thresholdAmount){
        redVal = 0;
      }
      
      if (redVal >= thresholdAmount){
        redVal = 255;
        greenVal=255;
        blueVal=255;
      }
      
      if (greenVal <=thresholdAmount){
        greenVal = 0;
        
      }
      
      if (greenVal >= thresholdAmount){
        greenVal = 255;
        redVal = 255;
        blueVal=255;
      }
      
      if (blueVal <=thresholdAmount){
        blueVal = 0;
      }
      
      if (blueVal >= thresholdAmount){
        blueVal = 255;
        redVal = 255;
        greenVal=255;
      }
      
            
      noStroke();
      fill(redVal,greenVal,blueVal);
      rectMode(CENTER);
      rect(x,y, pxSize);
    
  }
  }
  
}

function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


  
