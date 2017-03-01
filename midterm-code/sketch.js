// TABLE OF CONTENTS:
// I.    GLOBAL VARIABLES      - 25
// II.   PRELOAD               - 49
// III.  SETUP                 - 67
// IV.   DRAW                  - 75
// V.    VARIABLE CALCULATIONS - 119
// VI.   EVENTS                - 130
//       A. EVENT 1
//       B. EVENT 2
// VII.  SPRITE                - 199
//       A. IDLE
//       B. WALKING
//       C. MOVING
//       D. BOP DAT SPRITE
// VIII. SKY                   - 238
//       A. SKY
//       B. GENERATE CLOUDS
//       C. CLOUDS
// IX.   GROUND                - 281
//       A. GRASS
//       B. PEBBLES
//       C. GENERATE PEBBLES


//ALL THE GLOBALS!!!
var counter = 0;
var cloudCounter = 0;
var clouds = [];
var cloudImages = [];
var curCloud = 0;

var pebbleCounter = 0;
var groundHeight = 0;
var pebbleHeight = 0;
var pebbleLengths = new Array(20, 30, 50, 80, 100);
var pebbles = [];

var inEvent = false;
var eventCounter = 0;

var idleSprite = [];
var walkSprite = [];
var sleepSprite = [];
var kelsey = new sprite(1);
var curSprite = 0;
var minSprite = 0;
var maxSprite = 5;
var spriteId = 0;
var spriteCounterBop = 0;
var spriteUp = true;
var wait = 0;

var fishy;
var spriteXCounter = 0;
var thisFishyPos = 0;
var gotFishies = 0;

var wakeUpKelsey = 0;

function preload() {
  //CLOUDS
  for (var frames = 0; frames < 5; frames++) {
    var frameString = "images/cloudAsset" + frames + ".png";
    cloudImages[frames] = loadImage(frameString);
    console.log("loaded clouds");
  }
  //IDLE SPRITE
  for (var frames = 0; frames < 2; frames++) {
    var frameString = "images/spriteAsset" + frames + ".png";
    idleSprite[frames] = loadImage(frameString);
    console.log("loaded sprite");
  }
  //WALK SPRITE
  for (var frames = 0; frames < 10; frames++) {
    var frameString = "images/spriteWalkAsset" + frames + ".png";
    walkSprite[frames] = loadImage(frameString);
    console.log("loaded sprite");
  }
  //SLEEP SPRITE
  for (var frames = 0; frames < 2; frames++) {
    var frameString = "images/spriteSleepAsset" + frames + ".png";
    sleepSprite[frames] = loadImage(frameString);
    console.log("loaded sprite");
  }
  
  //fish
  fishy = loadImage("images/fishAsset.png");
}

function setup() {
  createCanvas(700, 500);
  frameRate(60);
  calculateVars(width, height);
  generatePebbles(15);
  generateClouds(1);
}

function draw() {
  //GENERATION STATION
  var ground = new grass(groundHeight);
  var sky = new generateSky();
  sky.display();
  ground.display();
  if ((!keyIsPressed || key != 'd') && !inEvent) {
    kelsey.displayIdle();
  }
  
  //LET'S COUNT SOME THINGS
  cloudCounter += 0.2;
  if (keyIsPressed && !inEvent) {
    if (key == 'd') {
      //COUNTERS
      counter++;
      pebbleCounter += 2;
      cloudCounter += 0.2;
      //SPRITE
      bopDatSprite();
      kelsey.displayWalk();
    }
  }
  //console.log(counter);
  
  //LET'S TRIGGER SOME EVENTS
  if (counter >= 200 && counter < 203) {
    if (counter == 200) {
      eventCounter = 200;
      counter++;
    }
    event1();
  }
  
  if (counter >= 400 && counter < 403) {
    if (counter == 400) {
      eventCounter = 400;
       wakeUpKelsey = random(50,100);
      counter++;
    }
    event2();
  }
}

function calculateVars(tempX, tempY) {
  this.w = tempX;
  this.h = tempY;
  
  //groundHeight
  groundHeight = ceil(this.h/8);
  
  //pebbleHeight
  pebbleHeight = height/70;
}

//LET'S HAVE SOME FUN

function event1() {
  inEvent = true;
  
  textSize(32);
  fill("#fcdc50");
  textStyle(BOLD);
  text("Eat the goldfish!", width/2 - 40, height/2);
  
  if (gotFishies >= 5) {
    kelsey.flipRight();
    inEvent = false;
    counter = 202;
  }
  
  if (inEvent === true) {
  if (eventCounter === 200) {
    thisFishyPos = random(width - 50);
  }
  kelsey.displayMoving();
  eventCounter += 2;
  if (keyIsPressed) {
    bopDatSprite();
    if (key == 'd') {
      kelsey.flipRight();
      spriteXCounter += 2;
    } else if (key == 'a') {
      kelsey.flipLeft();
      spriteXCounter -= 2;
    }
  }
  image(fishy, thisFishyPos, -200 + eventCounter);
    if (thisFishyPos <= 100 + spriteXCounter + 70 && thisFishyPos >= 100 + spriteXCounter) {
      if ((-200 + eventCounter) <= (height - groundHeight) && (-200 + eventCounter) >= (height - 270)) {
        gotFishies++;
        eventCounter = 200;
        thisFishyPos = random(width - 50);
      }
    }
    if (-200 + eventCounter > height - groundHeight) {
      eventCounter = 200;
      thisFishyPos = random(width - 50);
    }
  }
}

function event2() {
  inEvent = true;
  if (wakeUpKelsey >= 0) {
    snore();
    kelsey.displaySleep();
  }
  
  if (mouseX < 300 && mouseX > 50 && mouseY < height-groundHeight+20 && mouseY > height-250) {
    console.log("inTheZone");
    if (mouseIsPressed) {
      wakeUpKelsey--;
      console.log("pressed" + wakeUpKelsey);
    }
  }
  
  if (wakeUpKelsey <= 0) {
    inEvent = false;
    counter = 402;
  }
}

//HEY LOOK IT'S ME

function sprite(tempS) {
  this.s = tempS;
  
  this.displayIdle = function() {
    scale(this.s);
    curSprite = 0;
    image(idleSprite[curSprite], 100, height-groundHeight-150);
  }
  this.displayWalk = function() {
    scale(this.s);
    image(walkSprite[curSprite], 100, height-groundHeight-150-spriteCounterBop);
    walk();
  }
  this.displayMoving = function() {
    scale(this.s);
    if (keyIsPressed) {
      image(walkSprite[curSprite], 100 + spriteXCounter, height-groundHeight-150-spriteCounterBop);
      walk();
      console.log(curSprite);
      console.log(wait);
    } else {
      image(idleSprite[spriteId], 100 + spriteXCounter, height-groundHeight-150-spriteCounterBop);
    }
  }
  this.displaySleep = function() {
    scale(this.s);
    snore();
    image(sleepSprite[curSprite], 100, height-groundHeight-60);
  }
  this.flipLeft = function() {
    minSprite = 5;
    maxSprite = 10;
    if (curSprite >= maxSprite) {
      curSprite = minSprite;
    }
    spriteId = 1;
  }
  this.flipRight = function() {
    minSprite = 0;
    maxSprite = 5;
    if (curSprite >= maxSprite) {
      curSprite = minSprite;
    }
    spriteId = 0;
  }
}

function walk() {
  wait++;
  if (wait >= 6) {
    wait = 0;
    curSprite++;
    if (curSprite == maxSprite) {
      curSprite = minSprite;
    }
  }
}

function snore() {
  if (curSprite >= 2) {
    curSprite = 0;
  }
  wait++;
  if (wait >= 35) {
    wait = 0;
    curSprite++;
    if (curSprite == 2) {
      curSprite = 0;
    }
  }
}

function bopDatSprite() {
  if (spriteUp) {
    spriteCounterBop += .3;
    if (spriteCounterBop >= 3) {
      spriteUp = false;
    }
  } else if (!spriteUp) {
    spriteCounterBop -= .3;
    if (spriteCounterBop <= 0) {
      spriteUp = true;
    }
  }
}

//LOOK AT THE SKY

function generateSky() {
  this.display = function() {
    fill("#8ad5ec");
    rect(0,0,width,height);
    for (var i = 0; i < clouds.length; i++){
      clouds[i].display();
      //console.log(clouds[i].xPos);
      if (clouds[i].check() === false) {
        curCloud ++;
        if (curCloud == 5) {
          curCloud = 0;
        }
        clouds[i] = new cloud(random(width, (width*2) - (width*.667)) + cloudCounter, random(height- (groundHeight * 2)));
      }
    }
  }
}

function generateClouds(tempX) {
  this.amount = tempX;
  while (clouds.length < this.amount) {
    var c = new cloud(random(width), random(height - 200));
    clouds.push(c);
  }
}

function cloud(tempXPos, tempYPos) {
  this.xPos = tempXPos;
  this.yPos = tempYPos;
  
  this.display = function() {
    image(cloudImages[curCloud], this.xPos - cloudCounter, this.yPos);
  }
  
  this.check = function() {
    if (this.xPos - cloudCounter < 0 - 400) {
      return false;
    }
  }
}

//THE GROUND BENEATH OUR FEET

function grass(tempX) {
  this.h = tempX;
  this.w = width;
  this.dirtH = this.h/2;
  
  this.display = function(){
    strokeWeight(0);
    fill("#a2ce56")
    rect(0, height - this.h-5, this.w, this.h);
    fill("#75c043");
    rect(0, height - this.h, this.w, this.h);
    fill("#4c301e");
    rect(0, height - this.dirtH, this.w, this.dirtH);
    fill("#332013");
    rect(0, height - this.dirtH - 8, this.w, 12);
    //pebbles
    for (var i = 0; i < pebbles.length; i++){
      pebbles[i].display();
      if (pebbles[i].check() === false) {
        var newH = random(height - (groundHeight/2) - 14, height-pebbleHeight);
        pebbles[i] = new pebble(pebbleHeight, random(width, width*2 + 100) + pebbleCounter, newH);
      }
    }
    fill("#000000");
  }
}

function pebble(tempY, tempXPos, tempYPos) {
  this.h = tempY;
  this.w = random(pebbleLengths);
  this.xPos = tempXPos;
  this.yPos = tempYPos;

  this.display = function() {
    rect(this.xPos-pebbleCounter, this.yPos, this.w, this.h);
  }
  
  this.check = function() {
    if(this.xPos-pebbleCounter < 0 - this.w) {
      return false;
    } else {
      return true;
    }
  }
}

function generatePebbles(tempX) {
  this.amount = tempX;
  while (pebbles.length < amount) {
    var peb = new pebble(pebbleHeight, random(width+100), random(height - (groundHeight/2) - 14, height-pebbleHeight));
    pebbles.push(peb);
    }
}