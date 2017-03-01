var triangles = [];
var counter = 0;
var personCount = 0;
var direction = true;
var displace = 0;
var thisMove = 0;
var goUp = false;
var goDown = false;
var starCounter = 0;
var starHeight = 0;
var score = 0;
var starSpeed = [3,4,5,6,7];

function setup() {
  createCanvas(500,500);
  frameRate(50);
  var n = 0;
  for(var i = ceil(width/8); i >= 0; i--) {
    triangles.push(n);
    n += 8;
  }
  console.log(triangles);
}

function draw() {
  counter++;
  if (score <= 5) {
    starCounter+= starSpeed[0];
  } else if (score > 5 && score <= 10) {
    starCounter += starSpeed[1];
  } else if (score > 10 && score <= 20) {
    starCounter += starSpeed[2];
  } else if (score > 20 && score <= 30) {
    starCounter += starSpeed[3];
  } else if (score > 30) {
    starCounter += starSpeed[4];
  }
  if (counter == 9) {
    counter = 0;
  }
  if (direction == true) {
    personCount += 0.25;
  } else if (direction == false) {
    personCount -= 0.25;
  }
  if (personCount == 8) {
    direction = false;
  }
  if (personCount == 0) {
    direction = true;
  }
  if (starCounter >= width+10) {
    starCounter = 0;
    starHeight = random(500-120);
  }
  //sky
  strokeWeight(0);
  fill("#2a1c3d");
  rect(0,0,width,height);
  //grass
  fill("#5cd83a");
  rect(0,height-80,width,80);
  for(var i = 0; i < triangles.length; i++){
    triangle(0 + triangles[i]-counter, height-80, 4 + triangles[i]-counter, height-88, 8 + triangles[i]-counter, height - 80);
  }
  
  //score
  text("SCORE: " + score, 10, 20);
  
  //stars
  fill("white");
  rect(width-starCounter, starHeight + 10, 5,20);
  rect(width-starCounter - 7, starHeight + 17, 20, 5);
  
  //player
  fill("#3b2d4e");
  ellipse(120, height/2 - personCount - displace, 50,50);
  fill("#4c3e5f");
  ellipse(120, height/2 - personCount - displace, 45,45);
  fill("#6d5f7f");
  ellipse(120, height/2 - personCount - displace, 40,40);
  fill("#af9fbf");
  ellipse(120, height/2 - personCount - displace, 35,35);
  fill("#ffe6e6");
  ellipse(120, height/2 - personCount - displace, 30,30);
  fill("#ffd5d5");
  ellipse(120, height/2 - personCount - displace, 25,25);
  fill("pink");
  ellipse(120, height/2 - personCount - displace, 20,20);
  
  if (keyIsPressed && key==='w' && displace < height/2 - 30) {
    displace += 4;
  }
  if (keyIsPressed && key==='s' && displace > -(height/2 - 88 - 30)) {
    displace -= 4;
  }
  
  if (starCounter > width - 150 && starCounter < width - 100) {
    //console.log("TARGET ZONE");
    if ((height/2 - personCount - displace) > starHeight - 20 && (height/2 - personCount - displace) < starHeight + 50) {
      console.log("INTERSECT");
      starCounter = width+10;
      score++;
    } else {
      console.log("NOPE");
    }
  }
  
}