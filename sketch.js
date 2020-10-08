var PLAY=1;
var END=0;
var gameState=1;

var knife,swordimage;

var fruitGroup,fruit1,fruit2,fruit3,fruit4;
var monster,enemyGroup,monsterimage;

var game_over,gameoverimage;

var score=0;

function preload(){
  swordimage=loadImage("sword.png");
  
  gameoverimage = loadImage("gameover.png");
   
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
 
  monsterimage=loadAnimation("alien1.png", "alien2.png");
}
function setup() {
  createCanvas(400,400);
  
  //Creating Sword
  knife=createSprite(40,200,20,20);
  knife.addImage(swordimage);
  knife.scale=0.5;
  
  //making fruit and enemy group
 fruitGroup = createGroup();
 enemyGroup = createGroup();
  
  
    
}
function draw(){
 
        
  //sets the background to white colour  
  background("lightblue");
  
  text("Score: "+score,300,50);

//call fruits and enemy function
  if(gameState === PLAY){
    fruits();
    enemy();

    // Move Sword with mouse
    knife.y = mouseY;
    knife.x = mouseX;

    // Increase score if sword touching fruit
    if (fruitGroup.isTouching(knife)) {
    fruitGroup.destroyEach();
    score = score+2;
    }

// changing the gamestate to end state from start state
    if(enemyGroup.isTouching(knife)){
      gameState = END;
    }
    
  }
   else if (gameState === END) {
 // makes fruits and enemies invisible
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
// Change the animation of the sword to gameover and reset its position
    knife.addImage(gameoverimage);
    knife.scale = 0.95;
    knife.x = 200;
    knife.y = 200;
     score=0;
}
     
 
  drawSprites();
}
function fruits() {
  if(frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    var r=Math.round(random(1,4));
    switch(r) {
    case 1: fruit.addImage(fruit1);
              break;
    case 2: fruit.addImage(fruit2);
              break;
    case 3: fruit.addImage(fruit3);
              break;
    case 4: fruit.addImage(fruit4);
              break;
    
    }
    fruit.y=Math.round(random(50,340));
    fruit.velocityX=-7;
    fruit.lifetime=100;
    
    fruitGroup.add(fruit);
    
  }
  
}

function enemy() {
  if(frameCount%200===0){
    
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterimage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8
    monster.lifetime=50;
    
    enemyGroup.add(monster);
    
  }
}
