var fairies = new Array();
var counter = 0;
var countDirect = true;

function setup() {
  createCanvas(500,500);
  for (var i = 10; i >= 0; i--) {
    fairies.push(new fairy(random(width), random(height), random(20,80), random(255), random(255), random(255)));
  }
}

function draw() {
  if (countDirect == true) {
    counter+= .4;
  } else if (countDirect == false) {
    counter-= .4;
  }
  if (counter >= 20) {
    countDirect = false;
  }
  if (counter <= 0) {
    countDirect = true;
  }
  console.log(counter);
  background("#290f33");
  for (var i = 0; i < fairies.length; i ++) {
    fairies[i].display();
    fairies[i].follow(mouseX, mouseY);
  }
  
  
}

function fairy(tempX, tempY, tempS, tempC1, tempC2, tempC3) {
  this.x = tempX;
  this.y = tempY;
  this.diameter = tempS;
  this.r = tempC1;
  this.g = tempC2;
  this.b = tempC3;
  
  this.display = function() {
    colorMode(RGB, 255, 255, 255, 1);
    strokeWeight(0);
    fill(255, 255, 255, .05);
    for (var i = 1; i >= 0.45; i -= 0.05) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
    for (var i = .8; i >= 0.45; i -= 0.1) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
    fill(this.r, this.g, this.b, .05);
    for (var i = 1; i >= 0.4; i -= 0.05) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
    for (var i = 1; i >= 0.45; i -= 0.1) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
    for (var i = .7; i >= 0.3; i -= 0.05) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
    for (var i = .6; i >= 0.2; i -= 0.05) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
    for (var i = .4; i >= 0.1; i -= 0.05) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
    fill(255, 255, 255, .05);
    for (var i = .7; i >= 0.1; i -= 0.05) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
    for (var i = .6; i >= 0.1; i -= 0.05) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
    for (var i = .5; i >= 0.1; i -= 0.05) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
    for (var i = .4; i >= 0.1; i -= 0.05) {
      ellipse(this.x, this.y + counter, this.diameter*i, this.diameter*i);
    }
  }
  
  this.follow = function(sumX, sumY) {
    this.targetX = sumX;
    this.targetY = sumY;
    var Xdist = abs(this.x - this.targetX);
    var Ydist = abs(this.y - this.targetY);
    if (Xdist > 50 && Ydist > 50) {
      if (this.targetX < this.x && this.targetX > 1 && this.targetX < width && this.targetY > 1 && this.targetY < width) {
        this.x -= .5;
      }
      if (this.targetX > this.x && this.targetX > 1 && this.targetX < width && this.targetY > 1 && this.targetY < width) {
        this.x += .5;
      }
      if (this.targetY < this.y && this.targetY > 1 && this.targetY < width && this.targetX > 1 && this.targetX < width) {
        this.y -= .5;
      }
      if (this.targetY > this.y && this.targetY > 1 && this.targetY < width && this.targetX > 1 && this.targetX < width) {
        this.y += .5;
      }
    } else if (Xdist < 50 && Ydist < 50) {
      if (this.targetX < this.x && this.targetX > 1 && this.targetX < width && this.targetY > 1 && this.targetY < width) {
        this.x += .5;
      }
      if (this.targetX > this.x && this.targetX > 1 && this.targetX < width && this.targetY > 1 && this.targetY < width) {
        this.x -= .5;
      }
      if (this.targetY < this.y && this.targetY > 1 && this.targetY < width && this.targetX > 1 && this.targetX < width) {
        this.y += .5;
      }
      if (this.targetY > this.y && this.targetY > 1 && this.targetY < width && this.targetX > 1 && this.targetX < width) {
        this.y -= .5;
      }
    }
  }
}