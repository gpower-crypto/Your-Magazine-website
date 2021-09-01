
/*

The Game Project 7

*/

//declaring all necessary variables

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var gameChar_width;

var trees;
var coluds;
var mountains;
var collectables;
var canyons;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var game_score;
var flagpole;
var lives;

var jumpSound;
var collectSound;
var fallSound;
var winSound;
var hitByEnemySound;

var soundReady;
var soundLoadCounter;

var emitters;
var fireHolders;

var platforms;
var onPlatform;

var enemies;
var hitByEnemy;


function preload() {
  soundFormats("mp3");
  jumpSound = loadSound("assets/jump.mp3", soundLoaded);
  collectSound = loadSound("assets/collect.mp3", soundLoaded);
  fallSound = loadSound("assets/fall.mp3", soundLoaded);
  winSound = loadSound("assets/win.mp3", soundLoaded);
  hitByEnemySound = loadSound("assets/hit-by-enemy.mp3", soundLoaded);
  soundReady = false;
  soundLoadCounter = 0;
}

function soundLoaded() {
  soundLoadCounter++;
  if (soundLoadCounter == 4) {
    soundReady = true;
  }
}

function setup() {
  createCanvas(1024, 576);
  floorPos_y = height * 3 / 4;
  lives = 3;
  startGame();
}

function startGame() {
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
  gameChar_width = 50;
  game_score = 0;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  onPlatform = false;
  hitByEnemy = false;
  scrollPos = 0;

  gameChar_world_x = gameChar_x - scrollPos;

  clouds = [];
  for (i = 0; i < 50; i++) {
    clouds.push(new cloud(random(-15000, width + 15000), random(0.5, 0.7), random(0.5, 2)));
  }

  trees = [];
  trees.push(new tree(770, 282));
  trees.push(new tree(2000, 283));
  trees.push(new tree(-1700, 283));
  trees.push(new tree(-1500, 283));
  trees.push(new tree(-880, 283));
  trees.push(new tree(2200, 283));
  trees.push(new tree(2400, 283));


  mountains = [];
  mountains.push(new mountain(300, 342, 60));
  mountains.push(new mountain(1330, 342, 60));
  mountains.push(new mountain(-530, 342, 50));
  mountains.push(new mountain(-1330, 342, 50));
  mountains.push(new mountain(-1530, 342, 60));

  collectables = [];
  collectables.push(new collectable(450, 418, 1, false));
  collectables.push(new collectable(890, 418, 1, false));
  collectables.push(new collectable(-260, 418, 1, false));
  collectables.push(new collectable(-840, 418, 1, false));
  collectables.push(new collectable(-1100, 418, 1, false));
  collectables.push(new collectable(-1840, 418, 1, false));
  collectables.push(new collectable(1300, 418, 1, false));
  collectables.push(new collectable(2040, 418, 1, false));
  collectables.push(new collectable(1580, 418, 1, false));
  collectables.push(new collectable(650, floorPos_y-214, 1, false));
  collectables.push(new collectable(-450, floorPos_y-214, 1, false));
  collectables.push(new collectable(2650, floorPos_y-175, 1, false));


  canyons = [];
  canyons.push(new canyon(136, 1.0));
  canyons.push(new canyon(1145, 1.0));
  canyons.push(new canyon(-724, 1.0));
  canyons.push(new canyon(-1924, 1.0));
  canyons.push(new canyon(2636, 1.0));

  flagpole = {
    x_pos: 2850,
    isReached: false
  };

    emitters = [];
    emitter1 = new Emitter(240,         //xPos
                         floorPos_y-50, //yPos
                         0,             //xSpeed
                         -1,            //ySpeed
                         8,             //size
                         color(200,0,200));
    emitters.push(emitter1);

    emitter2 = new Emitter(1000,floorPos_y-50,0,-1,8,color(200,0,200));
    emitters.push(emitter2);

    emitter3 = new Emitter(1700,floorPos_y-50,0,-1,8,color(200,0,200));
    emitters.push(emitter3);

    emitter4 = new Emitter(40,floorPos_y-50,0,-1,8,color(200,0,200));
    emitters.push(emitter4);

    emitter5 = new Emitter(-1000,floorPos_y-50,0,-1,8,color(200,0,200));
    emitters.push(emitter5);

    emitter6 = new Emitter(2350,floorPos_y-50,0,-1,8,color(200,0,200));
    emitters.push(emitter6);

    for(var i=0;i<emitters.length;i++){
        emitters[i].startEmitter(200,100);
    }

    fireHolders = [];
    fireHolders.push(new createFireHolder(240));
    fireHolders.push(new createFireHolder(1000));
    fireHolders.push(new createFireHolder(1700));
    fireHolders.push(new createFireHolder(2350));
    fireHolders.push(new createFireHolder(40));
    fireHolders.push(new createFireHolder(-1000));

    platforms = [];
    platforms.push(createPlatform(400,floorPos_y-100,100));
    platforms.push(createPlatform(600,floorPos_y-200,130));
    platforms.push(createPlatform(-400,floorPos_y-100,100));
    platforms.push(createPlatform(-500,floorPos_y-200,100));
    platforms.push(createPlatform(1180,floorPos_y-100,100));
    platforms.push(createPlatform(1500,floorPos_y-150,200));
    platforms.push(createPlatform(2600,floorPos_y-160,150));

    enemies = [];
    enemies.push(new Enemy(380,floorPos_y-10,100));
    enemies.push(new Enemy(1200,floorPos_y-10,130));
    enemies.push(new Enemy(-400,floorPos_y-10,140));
    enemies.push(new Enemy(-970,floorPos_y-10,130));
    enemies.push(new Enemy(1560,floorPos_y-10,120));
    enemies.push(new Enemy(2060,floorPos_y-10,110));
    enemies.push(new Enemy(2600,floorPos_y-170,100));
    enemies.push(new Enemy(630,floorPos_y-210,100));
}

function draw() {
  if (!soundReady) {
    return;
  }

  drawSky();
  drawGround();

  push();
  translate(scrollPos, 0);
  drawClouds();
  drawMountains();
  drawTrees();
  drawcanyons();
  checkIfGameCharFallIntocanyon();
  drawcollectables();
  checkcollectable();
  drawFireHolders();
  drawFire();
  drawPlatforms();
  drawEnemies();
  checkIfGameCharInContactWithEnemies();
  renderFlagpole();
  checkFlagpole();
  pop();

  drawLifeTokens();
  drawGameScore();
  drawGameChar();

  if (checkIsGameOver()) {
    drawGameOver();
    return;
  }

    //check if game char is hit by enemy
    if(hitByEnemy == true){
      if(lives>0){
        startGame();
       }
        return;
    }

    //Game character falls in the canyon
    if(isPlummeting == true) {
      gameChar_y += 10;
      checkPlayerDie();
      return;
    }

    // Logic to make the game character rise and fall.
    if (gameChar_y < floorPos_y) {
      // gameChar_y += 2;
      isFalling = true;
    } else {
      isFalling = false;
    }


  // Logic to make the game character move or the background scroll.
  if (isLeft) {
    if (gameChar_x > width * 0.2) {
      gameChar_x -= 5;
    } else {
      scrollPos += 5;
    }
  }

// Logic to make the game character move or the background scroll.
  if (isRight) {
    if (gameChar_x < width * 0.8) {
      gameChar_x += 5;
    } else {
      scrollPos -= 5; // negative for moving against the background
    }
  }

  if(isFalling){
       var isContact = false;
       onPlatform = false;
       for(var i=0;i<platforms.length;i++){
           isContact = platforms[i].checkContact(gameChar_world_x,gameChar_y);
           if(isContact){
               onPlatform = true;
               break;
           }
       }
       if(!isContact){
           gameChar_y += 1.5;
       }
   }

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;
}


function drawGameChar() {
  // draw game character
  stroke(0);
  strokeWeight(.5);
  if (isLeft && isFalling) {
    drawJumpingLeft();
  } else if (isRight && isFalling) {
    drawJumpingRight();
  } else if (isLeft) {
    drawWalkingLeft();
  } else if (isRight) {
    drawWalkingRight();
  } else if ((isFalling || isPlummeting) && onPlatform == false) {
    drawJumpingFacingForwards();
  } else {
    drawStandingFrontFacing();
  }
}

function drawJumpingLeft() {
  fill(95, 158, 160);
  ellipse(gameChar_x, gameChar_y - 57, 25, 25);
  fill(0, 0, 0);
  ellipse(gameChar_x - 5, gameChar_y - 60, 5, 3);
  fill(0, 128, 128);
  rect(gameChar_x - 7, gameChar_y - 44.7, 15, 30);
  fill(192, 192, 192);
  rect(gameChar_x - 5, gameChar_y - 15, 5, 15);
  rect(gameChar_x + 3, gameChar_y - 15, 5, 15);
  fill(192, 192, 192);
  rect(gameChar_x - 21, gameChar_y - 40, 15, 5);
  rect(gameChar_x, gameChar_y - 40, 5, 20);
}

function drawJumpingRight() {
  fill(95, 158, 160);
  ellipse(gameChar_x, gameChar_y - 57, 25, 25);
  fill(0, 0, 0);
  ellipse(gameChar_x + 4, gameChar_y - 60, 5, 3);
  fill(0, 128, 128);
  rect(gameChar_x - 7, gameChar_y - 44.7, 15, 30);
  fill(192, 192, 192);
  rect(gameChar_x - 7, gameChar_y - 15, 5, 15);
  rect(gameChar_x + 1, gameChar_y - 15, 5, 15);
  fill(192, 192, 192);
  rect(gameChar_x + 7, gameChar_y - 40, 15, 5);
  rect(gameChar_x - 4, gameChar_y - 40, 5, 20);
}

function drawWalkingLeft() {
  fill(95, 158, 160);
  ellipse(gameChar_x, gameChar_y - 57, 25, 25);
  fill(0, 0, 0);
  ellipse(gameChar_x - 5, gameChar_y - 60, 5, 3);
  fill(0, 128, 128);
  rect(gameChar_x - 7, gameChar_y - 44.7, 15, 30);
  fill(192, 192, 192);
  rect(gameChar_x - 5, gameChar_y - 15, 5, 15);
  rect(gameChar_x + 3, gameChar_y - 15, 5, 15);
  fill(192, 192, 192);
  rect(gameChar_x, gameChar_y - 40, 5, 20);
}

function drawWalkingRight() {
  fill(95, 158, 160);
  ellipse(gameChar_x, gameChar_y - 57, 25, 25);
  fill(0, 0, 0);
  ellipse(gameChar_x + 4, gameChar_y - 60, 5, 3);
  fill(0, 128, 128);
  rect(gameChar_x - 7, gameChar_y - 44.7, 15, 30);
  fill(192, 192, 192);
  rect(gameChar_x - 7, gameChar_y - 15, 5, 15);
  rect(gameChar_x + 1, gameChar_y - 15, 5, 15);
  fill(192, 192, 192);
  rect(gameChar_x - 4, gameChar_y - 40, 5, 20);
}

function drawJumpingFacingForwards() {
  fill(95, 158, 160);
  ellipse(gameChar_x, gameChar_y - 57, 25, 25);
  fill(0, 0, 0);
  ellipse(gameChar_x - 5, gameChar_y - 60, 3, 3);
  ellipse(gameChar_x + 4, gameChar_y - 60, 3, 3);
  fill(0, 128, 128);
  rect(gameChar_x - 9, gameChar_y - 44.7, 20, 30);
  fill(192, 192, 192);
  rect(gameChar_x - 7, gameChar_y - 15, 5, 15);
  rect(gameChar_x + 4, gameChar_y - 15, 5, 15);
  fill(192, 192, 192);
  rect(gameChar_x - 23, gameChar_y - 40, 15, 5);
  rect(gameChar_x + 10, gameChar_y - 40, 15, 5);
}

function drawStandingFrontFacing() {
  fill(95, 158, 160);
  ellipse(gameChar_x, gameChar_y - 57, 25, 25);
  fill(0, 0, 0);
  ellipse(gameChar_x - 5, gameChar_y - 60, 3, 3);
  ellipse(gameChar_x + 4, gameChar_y - 60, 3, 3);
  fill(0, 128, 128);
  rect(gameChar_x - 9, gameChar_y - 44.7, 20, 30);
  fill(192, 192, 192);
  rect(gameChar_x - 7, gameChar_y - 15, 5, 15);
  rect(gameChar_x + 4, gameChar_y - 15, 5, 15);
  fill(192, 192, 192);
  rect(gameChar_x - 15, gameChar_y - 40, 5, 20);
  rect(gameChar_x + 12, gameChar_y - 40, 5, 20);
}

function drawSky() {
  background(173,216,230);
}
//
function drawClouds() {
  for (i = 0; i < clouds.length; i++) {
    clouds[i].draw();
    clouds[i].move();
  }
}

function cloud(x_pos, size, speed) {
  this.x_pos = x_pos;
  this.size = size;
  this.speed = speed;

  this.draw = function() {
    fill(255);
    ellipse(this.x_pos, 80, 90 * this.size, 80 * this.size);
    ellipse(this.x_pos - 40, 80, 90 * this.size, 60 * this.size);
    ellipse(this.x_pos - 40, 80, 60 * this.size, 60 * this.size);
    ellipse(this.x_pos + 40, 80, 90 * this.size, 60 * this.size);
    ellipse(this.x_pos + 60, 40, 90 * this.size, 80 * this.size);
    ellipse(this.x_pos + 30, 40, 90 * this.size, 60 * this.size);
    ellipse(this.x_pos + 30, 40, 60 * this.size, 60 * this.size);
    ellipse(this.x_pos + 100, 40, 90 * this.size, 60 * this.size);
  }

  this.move = function() {
    //move cloud to right
    this.x_pos += this.speed;

    //shift back to the left and continue animate
    if (this.x_pos > width + 15000) {
      this.x_pos = -4000;
    }
  }
}

function drawMountains() {
  for (i = 0; i < mountains.length; i++) {
    mountains[i].draw();
  }
}

function mountain(x_pos, y_pos, size) {
  this.x_pos = x_pos;
  this.y_pos = y_pos;
  this.size = size;

  this.draw = function() {
    fill(91, 104, 109);
    triangle(this.x_pos, 430, (this.x_pos + 160), (this.y_pos) - (this.size + 100), (this.x_pos + 250) + (this.size + 55), 430);
    fill(108, 96, 90);
    triangle(this.x_pos + 132, 430, (this.x_pos + 280), (this.y_pos) - (this.size + 100), (this.x_pos + 349) + (this.size + 55), 430);
  }
}

function drawTrees() {
  for (var i = 0; i < trees.length; i++) {
    trees[i].draw();
  }
}

function tree(pos_x, pos_y) {
  this.pos_x = pos_x,
    this.pos_y = pos_y,

    this.draw = function() {
      noStroke();
      fill(120, 100, 40);
      rect(this.pos_x, this.pos_y, 60, 150);
      fill(0, 155, 0);
      ellipse(this.pos_x - 15, this.pos_y, 100, 100);
      ellipse(this.pos_x + 70, this.pos_y, 100, 100);
      triangle(this.pos_x - 40, this.pos_y + 40, this.pos_x + 25, this.pos_y, this.pos_x + 90, this.pos_y + 40);
      triangle(this.pos_x - 40, this.pos_y, this.pos_x + 25, this.pos_y - 100, this.pos_x + 90, this.pos_y);
    }
}

function drawPlatforms(){
    for(var i=0;i<platforms.length;i++){
        platforms[i].draw();
    }
}

function createPlatform(x,y,length){
    var p = {
        x:x,
        y:y,
        length:length,
        draw: function(){
            fill(169,169,169);
            rect(this.x,this.y,this.length,20);
        },
        checkContact: function(gc_x,gc_y){
            if(gc_x+15>this.x && gc_x<this.x + 15 + this.length){
                var d = this.y - gc_y;
                if(d>=0 && d<2){
                    return true;
                }
            }
            return false;
        }
    }
    return p;
}

function drawGround() {
  noStroke();
  fill(139, 69, 19);
  rect(0, floorPos_y, width, height / 4);
  fill(0,130,0);
  rect(0, floorPos_y-3, width, 10);
}

function checkIfGameCharFallIntocanyon() {
  for (var i = 0; i < canyons.length; i++) {
    canyons[i].check();
  }
}

function drawcanyons() {
  for (var i = 0; i < canyons.length; i++) {
    canyons[i].draw();
  }
}

function canyon(x_pos, width) {
  this.x_pos = x_pos;
  this.width = width;

  this.draw = function() {
    noStroke();
    fill(0, 191, 255);
    ellipse(this.x_pos, 488, 250 * this.width, 120);
    ellipse(this.x_pos, 560, 150 * this.width, 50);
  }


  this.check = function() {
    if (checkIsGameOver()) {
      return;
    }
    if ((gameChar_world_x < this.x_pos + 29 && gameChar_y == floorPos_y) &&
      (gameChar_world_x > this.x_pos - 19 && gameChar_y == floorPos_y)) {
      isPlummeting = true;
      lives--;
      fallSound.play();
    }
  }
}

//check if game character comes in contact with any collectable
function checkcollectable() {
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      collectables[i].check();
    }
  }
}

//draw each collectable from the collectables array
function drawcollectables() {
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      collectables[i].draw();
    }
  }
}

//factory pattern for creating collectables
function collectable(x_pos, y_pos, size, isFound) {
  this.x_pos = x_pos;
  this.y_pos = y_pos;
  this.size = size;
  this.isFound = isFound;

  //draw the collectable item
  this.draw = function() {
    fill(123, 104, 238);
    ellipse(this.x_pos, this.y_pos, 30 * this.size, 30 * this.size);
    fill(165, 42, 42);
    rect(this.x_pos - 1, (this.y_pos - 21) - (30 * this.size / 2 - 15), 3 * this.size, 10 * this.size);
    fill(0, 128, 0);
    ellipse((this.x_pos + 3) + (10 * this.size / 2), (this.y_pos - 20) - (30 * this.size / 2 - 15), 15 * this.size, 5 * this.size);
  }

  //check if game character is in contact with collectable
  this.check = function() {
    if (dist(gameChar_world_x, gameChar_y, this.x_pos, this.y_pos) < 20) {
      this.isFound = true;
      game_score++; // update game score every time collectable is collected
      collectSound.play(); // play sound effect when collectable is collected
    }
  }
}

//draw the fire
function drawFire(){
    for(var i=0;i<emitters.length;i++){
        var emitter = emitters[i];
        var d = dist(gameChar_world_x,floorPos_y,emitter.pos.x,emitter.pos.y);
        if(d<width){
            emitter.drawAndUpdateParticles(); // call drawAndUpdateParticles to draw and update emitter particles
        }
    }
}

//draw each fire-holder from fireHolders array
function drawFireHolders(){
  for(var i=0;i<fireHolders.length;i++){
    fireHolders[i].draw();
  }
}

//usee factory pattern for fire-holders
function createFireHolder(x){
    this.x = x;

    this.draw = function(){
      fill(165,42,42 );
      rect(this.x-10,floorPos_y-50,13,50);
    }
}

//check if game character in contact with enemies
function checkIfGameCharInContactWithEnemies(){
    //if game is over exit the function
    if(checkIsGameOver()){
        return;
    }

    //check if in contact with enemies
    for(var i=0;i<enemies.length;i++){
        var isContact = enemies[i].checkContact(gameChar_world_x,gameChar_y);
        if(isContact){
            hitByEnemy = true;
            lives--; // decrease life when hit by enemy
            hitByEnemySound.play(); // play sound when hit by enemy
            break;
        }
    }
}

// draw each enemy from the enemies array
function drawEnemies(){
    for(var i=0;i<enemies.length;i++){
        enemies[i].draw(); //accessing the draw method from the 'Enemy' constructor function
    }
}

// constructor function to create enemy
function Enemy(x,y,range){
    this.x = x;
    this.y = y;
    this.range =range;

    this.currentX = x;
    this.inc = 1;

    // update the enemy position along the plane (move left and right)
    this.update = function(){
        this.currentX += this.inc;
        if(this.currentX > this.x + this.range){
            this.inc = -1;
        }
        else if(this.currentX < this.x){
            this.inc = 1;
        }
    }

    //function to draw the enemy
    this.draw = function(){
        this.update();
        fill(240,128,128);
        ellipse(this.currentX,this.y,20,20);
        fill(220,20,60);
        ellipse(this.currentX-8,this.y-9,4,10);
        ellipse(this.currentX+8,this.y-9,4,10);
        fill(0);
        ellipse(this.currentX-4,this.y-1,4,2);
        ellipse(this.currentX+4,this.y-1,4,2);
    }

    //function to check if game character is in contact with enemies
    this.checkContact = function(gc_x,gc_y){
        var d = dist(gc_x,gc_y,this.currentX,this.y);
        if(d<20){
            return true;
        }
        return false;
    }
}

//draw the game score as the game character collects the collectables
function drawGameScore() {
  textSize(20);
  fill(64,64,64);
  text("Score:" + game_score, 13, 25);
}

//draw flagpole
function renderFlagpole() {
  fill(0);
  rect(flagpole.x_pos, floorPos_y - 200, 5, 200);
  fill(200, 0, 0);
  if (flagpole.isReached) {
    rect(flagpole.x_pos, floorPos_y - 200, 80, 50); //raise flag if game character has reached flagpole
  } else {
    rect(flagpole.x_pos, floorPos_y - 50, 80, 50); //else keep flag at bottom
  }
}

//check if game character reaches flagpole
function checkFlagpole() {
  if (flagpole.isReached == false) {
    var d = dist(gameChar_world_x, gameChar_y, flagpole.x_pos, floorPos_y);
    if (d < 10) {
      flagpole.isReached = true;
      winSound.play(); // play winning sound effct
    }
  }
}

//draw life tokens for the game character
function drawLifeTokens() {
  textSize(20);
  for (var i = 0; i < lives; i++) {
    fill(64,64,64);
    text("Lives: ",835,26);
    fill(65,105,225);
    rect(35 * i + 900, 10, 18, 18);
  }
}

//check if player dies
function checkPlayerDie() {
  //if player falls into canyons or gets hit by enemy
  if (gameChar_y > height || hitByEnemy) {
    if (lives > 0) {
      startGame(); // restart game if there are still lives left
    }
  }
}

// check if game is over
function checkIsGameOver() {
  var gameOver = false;
  if (lives < 1 || flagpole.isReached) {
    gameOver = true;
  }
  return gameOver;
}

// display game results
function drawGameOver() {
  fill(0);
  textSize(100);
  text("Game Over", 250, height / 2 - 100); //display Game over

  if (lives > 0) {
    text("You Win!", 300, height / 2); //display if character wins game
  } else {
    text("You Lose!", 300, height / 2); //display if character loses game
  }
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {

   // if statements to control the animation of the character when
   // keys are pressed.

  if (keyCode == 37) {
    console.log("left arrow");
    isLeft = true;
  }
  else if (keyCode == 39) {
    console.log("right arrow");
    isRight = true;
  }
  else if (keyCode == 38) {
    if (gameChar_y >= floorPos_y || onPlatform) {
      console.log("up arrow");
      gameChar_y -= 180;
      jumpSound.play();
    }
  }
}

function keyReleased() {

  // if statements to control the animation of the character when
  // keys are released.

  if (keyCode == 37) {
    console.log("left arrow");
    isLeft = false;
  }
  else if (keyCode == 39) {
    console.log("right arrow");
    isRight = false;
  }
}
