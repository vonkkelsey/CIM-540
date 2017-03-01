var sprite;
var blasters;
var enemies;
var MARGIN = 40;
var lp = 15;
var score = 0;
var healths = [1, 2, 3];

function preload() {

}

function setup() {
  createCanvas(500,500);
  sprite = createSprite(50,height-70,50,50);
  sprite.maxSpeed = 3;
  sprite.friction = .8;
  sprite.setCollider("rect", 0, 0, 50,50);
  sprite.shapeColor = "#c773d6"
  
  blasters = new Group();
  enemies = new Group();
  for (var i = 0; i < 12; i++) {
    var xPos = random(width);
    var yPos = random(-500, 0);
    console.log(yPos);
    var hp = random(healths);
    createEnemies(hp, xPos, yPos);
  }
}

function draw() {
  background("#4a2351"); 
  
  if(keyDown("a")) {
    sprite.setSpeed(3, 180);
  } else if (keyDown("d")) {
    sprite.setSpeed(3, 0);
  }
  
  for(var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.y>height+MARGIN) {
      s.position.y = -MARGIN;
      score -= s.health;
    }
  }
  push();
  fill("#f8e5ff");
  text("score: " + score, 20, 20);
  pop();
  enemies.overlap(blasters, enemyHit);

  if(keyWentDown(" ")) {
    var blaster = createSprite(sprite.position.x, sprite.position.y, 5, 5);
    blaster.setSpeed(10,270);
    blaster.life = 30;
    blasters.add(blaster);
  }
  
  drawSprites();
}

function createEnemies(health, x, y) {
  var a = createSprite(x, y, 10 * health, 10 * health);
  a.setSpeed(3, 90);
  a.setCollider("rect", 0, 0, 10 * health, 10 * health);
  a.health = health;
  a.shapeColor = "#eed4f7";
  enemies.add(a);
  return a;
}

function enemyHit(enemy, blaster) {
  score += 10
  var eHealth = enemy.health-1;
  console.log(eHealth);
  if (eHealth > 0) {
    createEnemies(eHealth, enemy.position.x, enemy.position.y);
    console.log("created");
    console.log(enemies.length);
    drawSprites();
  } else if (eHealth === 0) {
    createEnemies(random(healths), random(width), random(-500,0));
  }
  
  blaster.remove();
  enemy.remove();
}