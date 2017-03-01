var topBoundary;
var bottomBoundary;
var middleBoundary;
var boundary;
var paintOrigin;
var interval;
var colorPickerHeight;
var nonColorWidth;
var paletteRadius;
var currentArea;
var ellipseColor = "black";
var brushSize = 20;
var eraserMidX;
var eraserMidY;
var colorArray = ["red", "orange", "yellow", "green", "blue", "purple"];
var hexArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
var randomHex;
var arrayPicker = 0;

function setup() {
  createCanvas(500,600);
  colorPickerHeight = 125;
  paletteRadius = (colorPickerHeight/2)*.8;
  topBoundary = height-colorPickerHeight;
  bottomBoundary = height;
  middleBoundary = (topBoundary + bottomBoundary)/2;
  boundary = new Array();
  nonColorWidth = 200;
  eraserMidX = (nonColorWidth*3)/4;
  eraserMidY = (topBoundary + bottomBoundary)/2;
  
  
  
  interval = floor((width-nonColorWidth)/3);
  for (var i = nonColorWidth; i <= width; i+= interval) {
    append(boundary, i);
    console.log(boundary);
  }
  
}

function draw() {
  strokeWeight(0);
  fill('#e6ffff');
  rect(0, topBoundary, width, colorPickerHeight);
  fill("red");
  ellipse((boundary[0] + boundary[1])/2, (topBoundary + middleBoundary)/2, paletteRadius, paletteRadius);
  fill("orange");
  ellipse((boundary[1] + boundary[2])/2, (topBoundary + middleBoundary)/2, paletteRadius, paletteRadius);
  fill("yellow");
  ellipse((boundary[2] + boundary[3])/2, (topBoundary + middleBoundary)/2, paletteRadius, paletteRadius);
  fill("green");
  ellipse((boundary[0] + boundary[1])/2, (bottomBoundary + middleBoundary)/2, paletteRadius, paletteRadius);
  fill("blue");
  ellipse((boundary[1] + boundary[2])/2, (bottomBoundary + middleBoundary)/2, paletteRadius, paletteRadius);
  fill("purple");
  ellipse((boundary[2] + boundary[3])/2, (bottomBoundary + middleBoundary)/2, paletteRadius, paletteRadius);
  fill("white");
  ellipse(nonColorWidth/4, (topBoundary + middleBoundary)/2, paletteRadius, paletteRadius);
  ellipse(nonColorWidth/4, (bottomBoundary + middleBoundary)/2, paletteRadius, paletteRadius);
  fill("gray");
  rect(nonColorWidth/4-3, (topBoundary + middleBoundary)/2 - paletteRadius/4, 6, paletteRadius/2);
  rect(nonColorWidth/4 - paletteRadius/4, (topBoundary + middleBoundary)/2 - 3, paletteRadius/2, 6);
  rect(nonColorWidth/4 - paletteRadius/4, (bottomBoundary + middleBoundary)/2 - 3, paletteRadius/2, 6);
  
  fill("pink");
  rect(eraserMidX - 20, eraserMidY - 35, 40, 70);
  fill("#ffe6e6")
  rect(eraserMidX - 20, eraserMidY + 10, 40, 25);
  
  //paintBrush
  fill('#e6ffff');
  rect(0,0,90,45);
  
  fill(ellipseColor);
  rect(0, 0, 40, 40);
  textSize(32);
  textStyle(BOLD);
  text("?", 55, 30);
  
  strokeWeight(0);
  if (mouseIsPressed && currentArea == "draw") {
    ellipse(mouseX, mouseY, brushSize, brushSize);
  }
  
  
  if (mouseY > topBoundary && mouseY < bottomBoundary) {
    if(mouseX > nonColorWidth) {
      if (mouseY < middleBoundary) {
        if (mouseX > boundary[0] && mouseX < boundary[1]) {
          console.log("red");
          currentArea = "red";
        } else if (mouseX > boundary[1] && mouseX < boundary[2]) {
          console.log("orange");
          currentArea = "orange";
        } else if (mouseX > boundary[2] && mouseX < boundary[3]) {
          console.log("yellow");
          currentArea = "yellow";
        } 
      } else if (mouseY > middleBoundary) {
        if (mouseX > boundary[0] && mouseX < boundary[1]) {
          console.log("green");
          currentArea = "green";
        } else if (mouseX > boundary[1] && mouseX < boundary[2]) {
          console.log("blue");
          currentArea = "blue";
        } else if (mouseX > boundary[2] && mouseX < boundary[3]) {
          console.log("purple");
          currentArea = "purple";
        } 
      }
    } else if (mouseX < nonColorWidth && mouseX > nonColorWidth/2) {
      console.log("eraser");
      currentArea = "white";
    } else if (mouseX < nonColorWidth/2 && mouseX > 0) {
      if (mouseY < middleBoundary) {
        console.log("plus");
        currentArea = "plus";
      } else if (mouseY > middleBoundary) {
        console.log("minus");
        currentArea = "minus";
      }
    }
  } else if (mouseY < topBoundary) {
    if (mouseY < 40 && mouseX < 40) {
      console.log("cycle");
      currentArea = "cycle";
    } else if (mouseY < 40 && mouseX > 45 && mouseX < 85) {
      console.log("random");
      currentArea = "random";
    } else {
      console.log("draw");
      currentArea = "draw";
    }
  }
  
}

function mouseClicked() {
  if (currentArea == "red") {
    ellipseColor = "red";
    arrayPicker=0;
  } else if (currentArea == "yellow") {
    ellipseColor = "yellow";
    arrayPicker=2;
  } else if (currentArea == "orange") {
    ellipseColor = "orange";
    arrayPicker = 1;
  } else if (currentArea == "green") {
    ellipseColor = "green";
    arrayPicker = 3;
  } else if (currentArea == "blue") {
    ellipseColor = "blue";
    arrayPicker = 4;
  } else if (currentArea == "purple") {
    ellipseColor = "purple";
    arrayPicker = 5;
  } else if (currentArea == "white") {
    ellipseColor = "white";
  } else if (currentArea == "cycle") {
    if (arrayPicker < 5) {
      arrayPicker ++;
    } else {
      arrayPicker = 0;
    }
    ellipseColor = colorArray[arrayPicker];
  }else if (currentArea == "random") {
    randomHex = "#" + random(hexArray) + random(hexArray) + random(hexArray) + random(hexArray) + random(hexArray) + random(hexArray);
    console.log(randomHex);
    ellipseColor = randomHex;
  }else if (currentArea == "plus") {
    if (brushSize == 1) {
      brushSize = 10;
    } else {
      brushSize += 10;
    }
  } else if (currentArea == "minus") {
    if (brushSize == 10 || brushSize == 1) {
      brushSize = 1;
    } else {
      brushSize -= 10;
    }
  }
}