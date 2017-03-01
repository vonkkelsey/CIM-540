var mouthTop;
var mouthHeight;
var mouthWidth;
var mouthLeft;
var mouthGrid;
var headWidth;
var i;
var centerX;
var centerY;
var coloringRadius = 70;
var rgb;
var r;
var g;
var b;
var k;
var cc = 0;
var c;
var mapX;
var mapY;


function setup() {
  createCanvas(700,700);
  centerX = width/2;
  centerY = height/2;
  headWidth = 200;
  eyeDistance = (headWidth*2)/4;
  mouthTop = centerY+70;
  mouthHeight = 40;
  mouthWidth = 250;
  mouthLeft = centerX-(mouthWidth/2);
  mouthGrid = mouthWidth/10;
  background('#222');
}

function draw() {
  rgb = color((255*mouseX)/700,150,(255*mouseY)/700);
  b = color((255*mouseX)/700,((255*mouseY)/700)+((255*mouseX)/700)/2, (255*mouseY)/700); //BLUE/ORANGE SPECTRUM
  g = color(((255*mouseY)/700)+((255*mouseX)/700)/2,(255*mouseY)/700,(255*mouseX)/700); //PURPLE/YELLOW SPECTRUM
  r = color(((255*mouseY)/700)+((255*mouseX)/700)/2,(255*mouseX)/700,((255*mouseY)/700)/4); //RED/GREEN SPECTRUM
  k = color((255*mouseX)/700,(255*mouseX)/700,(255*mouseX)/700);
  if (cc == 0) {
    c = rgb;
  } else if (cc == 1) {
    c = r;
  } else if (cc == 2) {
    c = g;
  } else if (cc == 3) {
    c = b;
  } else if (cc == 4) {
    c = k;
  }
  //headbutton
  strokeWeight(6);
  stroke('#004570');
  fill('#206590');
  ellipse(centerX,centerY-headWidth,50,50);
  //ears
  ellipse(centerX-headWidth,350,50,200);
  ellipse(centerX+headWidth,350,50,200);
  //head
  strokeWeight(8);
  fill('#ccd');
  stroke('#99a');
  rect(centerX-headWidth,centerY-headWidth,400,400,30);
  //eyes
  fill('#ff5');
  ellipse(centerX-eyeDistance,centerY-50,100,100);
  ellipse(centerX+eyeDistance,centerY-50,100,100);
  //mouth
  fill('#ff5');
  rect(mouthLeft,mouthTop,mouthWidth,mouthHeight);
  for (i = mouthLeft; i < (mouthLeft + mouthWidth); i += mouthGrid) {
    line(i,mouthTop,i,mouthTop+mouthHeight);
  }
  //antenna
  strokeWeight(6);
  stroke('#004570');
  line(centerX,125,centerX+10,100);
  line(centerX+10,100,centerX-5,90);
  line(centerX-5,90,centerX,70);
  fill('#206590');
  ellipse(centerX,60,20,20);
  ellipse(centerX,centerY+15,50,50)
  fill(c);
  strokeWeight(0);
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, coloringRadius, coloringRadius);
  }
  //pupils
  //translate(((20*mouseX)/700)-10, ((20*mouseY)/700)-10);
  mapX = map(mouseX, 0, width, -10, 10);
  mapY = map(mouseY, 0, height, -10, 10);
  ellipse(centerX-eyeDistance+mapX,centerY-50+mapY,50,50);
  ellipse(centerX+eyeDistance+mapX,centerY-50+mapY,50,50);
}

function keyTyped() {
    if (key === ']') {
      coloringRadius += 10;
    } else if (key === '[' && coloringRadius > 10) {
      coloringRadius -=10;
    } else if (key === 'r') {
      cc = 1;
    } else if (key === 'g') {
      cc = 2;
    } else if (key === 'b') {
      cc = 3;
    } else if (key === 'k') {
      cc = 4;
    } else if (key === 'm') {
      cc = 0;
    } else if (key === 'c') {
      background('#222');
    }
    
  }