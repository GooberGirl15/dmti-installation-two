var capture;
let faceMesh;
let options = {maxFaces: 1, refineLandmarks: false, flipped: true};
let faces = [];
let fil;
let cols, row; let step = 8;

function preload(){
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  let w = windowHeight
  let h = windowWidth
  createCanvas(w, h);
  
  capture = createCapture(VIDEO, {flipped:true});
  capture.hide();
  faceMesh.detectStart(capture, gotFaces);
}

function draw() {
  background(0,0,0);
  
  let aspect = capture.height / capture.width
  let canvasAspect = height/width
  
  let videoWidth, videoHeight;
  if (aspect > canvasAspect) {
    videoWidth = height;
    videoHeight = height / aspect;
  } else {
    videoHeight = width;
    videoWidth = width * aspect;
  }
  
  
  push();
  translate(0,height)
  rotate(HALF_PI * 3)
  if (faces.length == 0){
     initialDisplay();} else{
  image(capture,0,0,windowHeight, windowWidth);
  random
  
  capture.loadPixels();
  if (capture.pixels.length > 0) {
    scaleX = Math.floor(videoWidth / capture.width);
    scaleY = Math.floor(videoHeight / capture.height);
      faceBox();
  }
 pop(); 
}
}

function faceBox(){
  // capture.loadPixels();
  // console.log("Pixels outside loop:" + capture.pixels[0])
  for (let i = 0; i < faces.length; i++){
    let face = faces[i];
    
    let x0 = Math.floor(face.box.xMin);
    let y0 = Math.floor(face.box.yMin);
    let x1 = Math.floor(face.box.xMax);
    let y1 = Math.floor(face.box.yMax);
    
    let faceWidth = x1 - x0;
    let faceHeight = y1 - y0;
    
    
    for (let i=x0; i<x1; i+=step) {
      for (let j=y0; j<y1; j+=step) {
        let index = round((j * capture.width + i) * 4);
        let r = capture.pixels[index];
        let g = capture.pixels[index+1];
        let b = capture.pixels[index+2];
        

        
        
        
        
        let c = color(r,g,b);
        
        // console.log(c);
       
        // let c2 = capture.get(i, j);
        // console.log(c2);
        
        push()
        scale(2,2)
        fill(c);
        noStroke();
        rectMode(CENTER);
        rect(i+50, j, step, step);
        pop()
        
      }
    }
    // scale(2,2)
    // rectMode(CORNERS);
    // noFill();
    // stroke(0);
    // rect(x0, y0, x1, y1);
    // pop()
    }
    
    
    
  
}
function gotFaces(results){
  faces = results;
}

function initialDisplay(){
   
  // rect(0,0,width,height)
  textSize(50)
  noStroke()
  fill(255,255,255)
  rect(0,0,windowHeight,windowWidth)
  
  push()
  textStyle(BOLD);
  fill(0,0,0)
  text('SHOW ME YOUR FACE!', height/2- (height *0.3), width/2);
  pop()
  
}

function randomDisplay(){
  textSize(50)
  noStroke()
  fill(255,255,255)
  // rect(0,0,windowHeight,windowWidth)
  
  push()
  textStyle(BOLD);
  fill(0,0,0)
  text('WHO DO YOU SEE?!', height/2- (height *0.3), width/2);
  pop()
  
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}


function mousePressed() {
  fullscreen(true)
}



