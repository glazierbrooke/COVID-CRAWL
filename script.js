/* global imageMode, CORNER, loop, noLoop, dist, noFill, arc, HALF_PI, QUARTER_PI, PI, TAU, rectMode, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          textAlign, LEFT, CENTER, createButton, rect, ellipse, stroke, image, loadImage, text, 
          mouseX, mouseY, fontTitle, fontSmall, loadFont, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyIsPressed, triangle,keyCode,playerpic, viruspic, textFont,slime, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, PI, position, mousePressed, floor, 
          checkKeyPressed, playerRow, soundFormats, loadSound, song */


function preload() {

 //load picture of player
  playerpic = loadImage(
    "https://cdn.glitch.com/33996fc5-f519-4e77-b206-53ea2362c6b3%2FCovid%20Boy%20Final.png?v=1595957871793"
  );
// load picture of virus
 viruspic = loadImage(
"https://cdn.glitch.com/33996fc5-f519-4e77-b206-53ea2362c6b3%2F27-279533_-clipart-boy-school-clipart-drawing-for-kids-removebg-preview.png?v=1596044038192"
  );  
// load picture for into
slime = loadImage(
  "https://cdn.glitch.com/33996fc5-f519-4e77-b206-53ea2362c6b3%2Flight-blue-splash-md.png?v=1596132862232"
  );
//title font for start page
  fontTitle = loadFont(
  "https://cdn.glitch.com/e79ccfb7-a831-4d6a-a74b-6fa2c0499846%2FUrban%20Heroes.ttf?v=1596048010272"
);
//font for instructions at start page
  fontSmall = loadFont(
  "https://cdn.glitch.com/33996fc5-f519-4e77-b206-53ea2362c6b3%2Fcoolvetica%20condensed%20rg.ttf?v=1596050372800"
  );
  
  song = loadSound(
    'https://cdn.glitch.com/33996fc5-f519-4e77-b206-53ea2362c6b3%2FBackground.mp3?v=1596133325007'
  );

}

let currLevelNum,
  currLevel,
  currMap,
  levelList,
  gameIsOver,
  tileWidth,
  tileHeight,
  pRow,
  pCol,
  mRow,
  mCol,
  playerX,
  playerY,
  mummyX,
  mummyY,
  win,
  lose,
  endTimer,
  moveTimer,
  button,
  isPlayerTurn,
  mummyMoved,
  mummyTurn,
  targetRow,
  targetCol,
  increment,
  startGame,
  restartX,
  restartY,
  nextX,
  nextY,
  startX,
  startY,
  transitionPage,
  song;

/* Key for the Levels
  0 = open tile
  1 = unreachable tile
  2 = exit tile
  3 = wall to the right
  4 = wall to the bottom
  5 = walls to the right and bottom
*/

function setup() {
  console.log("ran setup");
  colorMode(HSB, 360, 100, 100); // setting the color mode to HSB
  // Later on --> startPage, but for now just load the first map
  
  
  createCanvas(600, 600);
  background(220);
  startPage();
  /*
  colorMode(HSB, 360, 100, 100);
  image(slime, 0, 50, 600, 400);
  startPage();
  
  textSize(30);
  textFont(fontTitle);
  text("COVID CRAWL!", 190, 240);
  fill(0);
  
  textSize(15)
  textFont(fontSmall);
  text("Use your arrow keys to move around!",10, 500)
  fill(0);
  
  textSize(15)
  textFont(fontSmall);
  text("Practice social distancing from others!",330, 550)
  fill(0);
   
  //next level button on start page
  fill(25, 72, 100);
  noStroke();
  startX = 260;
  startY = 500;
  ellipse(startX, startY, 100);
  //added stuff
  fill(100);
  triangle(265, 500, 235, 480, 235, 520);
  triangle(295, 500, 265, 480, 265, 520);
  */
  
//   button = createButton('Lets Play');
//   button.position(280, 500);
  startGame = false;
  
  levelList = [];
  levelList.push( // first level
    new Level(3, 4, 1, 5, [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 3, 0, 0, 4, 1],
      [1, 0, 3, 0, 4, 4, 0, 1],
      [1, 0, 0, 4, 0, 0, 0, 1],
      [2, 3, 4, 0, 0, 0, 4, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 3, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ])
  );
  levelList.push( // second level
    new Level(4, 2, 3, 6, [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 4, 0, 0, 0, 0, 1],
      [1, 0, 4, 0, 3, 0, 4, 1],
      [1, 0, 3, 0, 5, 0, 0, 1],
      [1, 0, 0, 0, 0, 3, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 2],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ])
  );
  levelList.push( // third level
    new Level(3, 3, 4, 6, [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 3, 4, 0, 0, 4, 1],
      [1, 3, 0, 5, 3, 0, 0, 1],
      [1, 3, 4, 4, 0, 3, 4, 1],
      [1, 0, 0, 4, 3, 3, 0, 2],
      [1, 0, 4, 0, 5, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ])
  );
  levelList.push( // fourth level
    new Level(2, 2, 4, 2, [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 4, 0, 4, 0, 0, 1],
      [1, 0, 5, 4, 4, 0, 0, 1],
      [1, 0, 4, 0, 0, 5, 0, 1],
      [1, 3, 3, 4, 0, 0, 4, 1],
      [1, 0, 4, 4, 4, 4, 0, 1],
      [1, 0, 0, 3, 0, 0, 0, 1],
      [1, 1, 1, 2, 1, 1, 1, 1]
    ])
  );
  levelList.push( // fifth level
    new Level(1, 2, 6, 6, [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 4, 0, 3, 0, 4, 4, 1],
      [1, 4, 3, 3, 0, 0, 0, 1],
      [1, 3, 3, 0, 0, 5, 0, 1],
      [1, 0, 4, 4, 3, 0, 0, 1],
      [1, 4, 0, 0, 0, 5, 0, 1],
      [1, 0, 0, 0, 3, 0, 0, 2],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ])
  );
  currLevelNum = 0;
  gameIsOver = false;
  currLevel = levelList[currLevelNum];
  currMap = currLevel.map;
  // loadMap(0); // load the first level
  isPlayerTurn = true;
  win = false;
  lose = false;
  mummyTurn = 0;
  transitionPage = false;
  // song.loop();
  
  noLoop();
}

function draw() {
  console.log("draw");
  //background to reset
  // background(220);
  // button.mousePressed();
  
  /*
  // Transitions
  increment = .1;
  console.log(pRow + " " + targetRow);

  if(pRow != targetRow){
    if(pRow > targetRow){
      increment *= -1;
      for(pRow; pRow > targetRow; pRow += increment){
        console.log(pCol);
        playerY = pRow * tileHeight + tileHeight / 2;
        // image(playerpic, playerX - 40, playerY - 40, tileWidth + 10, tileHeight + 10);
      }
    }
    else{
      for(pRow; pRow < targetRow; pRow += increment){
        console.log(pCol);
        playerY = pRow * tileHeight + tileHeight / 2;
        // image(playerpic, playerX - 40, playerY - 40, tileWidth + 10, tileHeight + 10);
      }
    }
  }
  increment = .1;
  console.log(pCol + " " + targetCol);
  if(floor(pCol) != floor(targetCol)){
    if(pCol > targetCol){
      increment *= -1;
      for(pCol; pCol > targetCol; pCol += increment){
        console.log(pCol);
        playerX = pCol * tileWidth + tileWidth / 2;
        // image(playerpic, playerX - 40, playerY - 40, tileWidth + 10, tileHeight + 10);
      }
    }
    else{
      for(pCol; pCol < targetCol; pCol += increment){
        console.log(pCol);
        playerX = pCol * tileWidth + tileWidth / 2;
        // image(playerpic, playerX - 40, playerY - 40, tileWidth + 10, tileHeight + 10);
      }
    }
  }
  
  pRow = floor(pRow);
  targetRow = floor(targetRow);
  pCol = floor(pCol);
  targetCol = floor(targetCol);
  
  not a comment --> comment back in the lines in the move() function that say targetRow = pRow + 1...
  
  */
  
  
    
    
    // DRAWING EVERYTHING
    
    // drawing maze - both the tiles and the walls
    for (let x = 0; x < currMap.length; x++) {
      for (let y = 0; y < currMap[x].length; y++) {
        drawTile(x, y, currMap[x][y]);
        drawWall(x, y, currMap[x][y]);
      }
    }
    //draw mummy
  image(viruspic, mummyX - 25, mummyY - 35, tileWidth - 25, tileHeight - 5);
    
    // move mummy
    if(moveTimer >= 0){
      moveTimer--;
    }
    else{
      if(!isPlayerTurn){
        if(mummyTurn < 2){
          if(moveTimer <= 0){
            move(mRow, mCol, "mummy");
            mummyTurn++;
            // moveTimer = 10;
          }
        }
        else{
          isPlayerTurn = true;
        }
      }
    }
  
  // moving the player
  playerX = pCol * tileWidth + tileWidth / 2;
  playerY = pRow * tileHeight + tileHeight / 2;
  // moving the mummy
  mummyX = mCol * tileWidth + tileWidth / 2;
  mummyY = mRow * tileHeight + tileHeight / 2;
  
  if (!gameIsOver && startGame) {
    // button.hide();
    // checking win / lose -> reset the map / load into next level
    checkWinLose();
    if (endTimer >= 0) {
      endTimer--;
    }
    else {
      if (win) {
        win = false;
        }
      if (lose) {
        loadMap();
        lose = false;
      }
    }
  }
  //draw player
  image(playerpic, playerX - 40, playerY - 40, tileWidth + 10, tileHeight + 10);
  
}

function checkWinLose() {
  console.log("checkWinLose() called");
  if (currMap[pRow][pCol] == 2) {
    if(!win){
      win = true;
      endTimer = 10;
      if(currLevelNum >= levelList.length){
          gameIsOver = true;
          gameOver();
      }
      else{
        if(!transitionPage){
          noLoop();
          transitionPage = true;
          startGame = false;
          wonMap();
          console.log("wonMap");
        }
      }
    }
  }
  if (pRow == mRow && pCol == mCol) {
    if(!lose){
      lose = true;
      endTimer = 10;
    }
  }
}

function drawTile(row, col, n) {
  // console.log("drawTile() called");
  stroke(0);
  strokeWeight(1);
  // drawing all the tiles in the map
  if (n == 0 || n == 3 || n == 4 || n == 5) {
    // Reachable tiles
    fill(196, 40, 85);
  } else if (n == 1) {
    // Unreachable tiles
    fill(155, 50, 35);
  } else if (n == 2) {
    // Exit tile
    fill(25, 65, 90);
  }
  rect(col * tileWidth, row * tileHeight, tileWidth, tileHeight);
}

function drawWall(row, col, n) {
  // drawing all the walls in the map
  // console.log('drawWall() called')
  fill(25, 20, 0);
  if (n == 3 || n == 5) {
    // Reachable tiles
    rect((col + 1) * tileWidth - 3, row * tileHeight, 5, tileHeight);
  }
  if (n == 4 || n == 5) {
    // Reachable tiles
    rect(col * tileWidth, (row + 1) * tileHeight - 3, tileWidth, 5);
  }
  // If we wanted to align the wall in the very middle of 2 tiles, we'd need to have the drawTile and drawWall for-loops be two separate for-loops because right now, the part of the wall that's drawn in another tile's area is being overwritten by the next tile since the drawTile and drawWall are called back to back
}

//key controls for player
function keyPressed() {
  console.log('keyPressed() called');
  // Checking if can move in specified direction, and then moving if possible
  if (!gameIsOver) {
    //move player
    if (isPlayerTurn){
      if(keyCode === DOWN_ARROW || keyCode === UP_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW){
        move(pRow, pCol, "player");
        isPlayerTurn = false;
        mummyTurn = 0;
        moveTimer = 0;
      }
    } else {
      //move mummy
      // move(mRow, mCol, "mummy");
      // isPlayerTurn = true;
    }
  }
}
//mummy movements

function move(row, col, character) {
  console.log("move() called");
  mummyMoved = false;
  //check if tile on left has right wall or if unreachable tile on left
  if (currMap[row][col - 1] != 3 && currMap[row][col - 1] != 5 && currMap[row][col - 1] != 1) {
    if(character == "mummy"){
      // if pCol < mCol and canMoveLeft --> moveLeft
      if(mCol > pCol && !mummyMoved){
        mCol--;
        moveTimer = 10;
        mummyMoved = true;
      }
    }
    else if(character == "player" && keyCode === LEFT_ARROW){
      pCol--;
      // targetCol = pCol - 1;
    }
  }
  //check if tile on currently has right wall or if unreachable tile on right
  if (currMap[row][col] != 3 && currMap[row][col] != 5 && currMap[row][col + 1] != 1) {
    if(character == "mummy" && !mummyMoved){
      // if mCol < pCol and canMoveRight --> moveRight
      if(mCol < pCol && !mummyMoved){
        mCol++;
        moveTimer = 10;
        mummyMoved = true;
      }
    }
    else if(character == "player" && keyCode === RIGHT_ARROW){
      pCol++;
      // targetCol = pCol + 1;
    }
  }
  //checking if tile on top has bottom wall or if unreachable tile on top
  if (currMap[row - 1][col] != 4 && currMap[row - 1][col] != 5 && currMap[row - 1][col] != 1) {
    if(character == "mummy"){
      // if pRow < mRow and canMoveUp --> moveUp
      if(mRow > pRow && !mummyMoved){
        mRow--;
        moveTimer = 10;
        mummyMoved = true;
      }
    }
    else if(character == "player" && keyCode === UP_ARROW){
      pRow--;
      // targetRow = pRow - 1;
    }
  }
  //check if tile on has bottom wall or if unreachable tile under
  if (currMap[row][col] != 4 && currMap[row][col] != 5 && currMap[row + 1][col] != 1) {
    if(character == "mummy"){
      // if pRow > mRow and canMoveDown --> moveDown
      if(mRow < pRow && !mummyMoved){
        mRow++;
        moveTimer = 10;
        mummyMoved = true;
      }
    }
    else if(character == "player" && keyCode === DOWN_ARROW){
      pRow++;
      // targetRow = pRow + 1;
    }
  }
}

// At the start and every time we beat a level, call loadMap to get the next level
function loadMap() {
  console.log('loadMap() called');
  strokeWeight(1);
  currLevel = levelList[currLevelNum];
  pRow = currLevel.pStartRow;
  pCol = currLevel.pStartCol;
  mRow = currLevel.mStartRow;
  mCol = currLevel.mStartCol;
  currMap = currLevel.map;
  tileHeight = height / currMap.length;
  tileWidth = width / currMap[0].length;
  // tileHeight = 50;
  // tileWidth = 50;
  mummyTurn = 0;
  isPlayerTurn = true;
  targetRow = pRow;
  targetCol = pCol;
}

class Level {
  constructor(playerRow, playerCol, mummyRow, mummyCol, map) {
    this.pStartRow = playerRow;
    this.pStartCol = playerCol;
    this.mStartRow = mummyRow;
    this.mStartCol = mummyCol;
    this.map = map;
  }
}


//Game Over Page 
function wonMap() {
  rectMode(CENTER);
  fill(221, 72, 100);
  noStroke();
  rect(300, 300, 400, 400);
  rectMode(CORNER);
  
  textSize(36);
  textAlign(CENTER);
  fill(0, 0, 100);
  //how to change font?
  // textFont(fontTitle);
  text("LEVEL " + (currLevelNum+1) + " COMPLETED", 300, 200);
  fill(0, 102, 153);
  textAlign(LEFT);
  
  fill(25, 72, 100);
  
  //restart level button
  restartX = 220;
  restartY = 310;
  ellipse(restartX, restartY, 100);
  noFill();
  stroke(0, 0, 100);
  strokeWeight(6);
  arc(220, 310, 60, 60, HALF_PI + QUARTER_PI + HALF_PI, PI + TAU);
  line(200, 274, 195, 290);
  line(210, 294, 195, 290);
  strokeWeight(1);
  
  //next level button
  fill(25, 72, 100);
  noStroke();
  nextX = 380;
  nextY = 310;
  ellipse(nextX, nextY, 100);
  //added stuff
  fill(0, 0, 100);
  triangle(385, 310, 355, 290, 355, 330);
  triangle(415, 310, 385, 290, 385, 330);
  
  stroke(0);
  strokeWeight(1);
  console.log("wonmap() function end");
/*
  button = createButton('Restart');
  button.position(250, 400);
  // button.mousePressed(loadMap);
  */
}



function startPage () {
  imageMode(CENTER);
  image(slime, 300, 240, 600, 400);
  imageMode(CORNER);
  
  textSize(36);
  textFont(fontTitle);
  text("COVID CRAWL!", 200, 250);
  fill(0);
  
  textSize(20)
  textFont(fontSmall);
  text("Use your arrow keys to move around!", 10, 500)
  fill(0);
  
  textSize(20)
  textFont(fontSmall);
  text("Practice social distancing from others!", 362, 550)
  fill(0);
   
  //next level button on start page
  fill(25, 72, 100);
  noStroke();
  startX = 300;
  startY = 500;
  ellipse(startX, startY, 100);
  //added stuff
  fill(100);
  triangle(330, 500, 285, 475, 285, 525);
  // triangle(295, 500, 265, 480, 265, 520);

}
  


function gameOver(){
  //gameover page when beat all levels
  
}

function mousePressed(){
  // if(!song.isPlaying()){
  //   console.log("not playing");
  //   song.play();
  // }
  console.log("mousePressed called");
  //start page start
  strokeWeight(1);
  if(dist(mouseX, mouseY, startX, startY) <= 50){
    startGame = true;
    console.log('start button pressed');
    console.log('load map');
    loadMap();
    song.loop();
    loop();
  }
  //replay level button
  else if(dist(mouseX, mouseY, restartX, restartY) <= 50)
  {
    console.log('replay button pressed');
    console.log('load map');
    loadMap();
    startGame = true;
    loop();
    transitionPage = false;
  }
  //next level button
  else if(dist(mouseX, mouseY, nextX, nextY) <= 50){
    currLevelNum++;
    console.log('next level button pressed');
    console.log('load map');
    loadMap();
    startGame = true;
    loop();
    transitionPage = false;
  }
  // loadMap();
  
}