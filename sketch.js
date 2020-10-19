var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudAnimation, gameState,PLAY,END, obstacleGroup, cloudsGroup,score
var gameOver,restart, hurttrex
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudAnimation = loadImage ("cloud.png")
  
  restartpic = loadImage("restart.png");
  gameOverpic= loadImage("gameOver.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  trexhurt = loadImage("trex_collided.png")
}

function setup() {
  
  
  
  createCanvas(600, 200);
  
  PLAY = 1;
  END = 0;
  gameState =  PLAY;
   score = 0; 
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexhurt);
  trex.scale = 0.5;
  
  obstacleGroup = new Group();
  cloudsGroup = new Group();
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  gameOver = createSprite(250,99,10,10)
  gameOver.addImage(gameOverpic)
  gameOver.scale = 0.7  
  
  restart = createSprite(250,145,10,10)
  restart.addImage(restartpic)
  restart.scale = 0.7
}


function draw() {
  
  
  background(150);
  
  console.log(trex.y)
 text("score = " + score,500,30)
  
  
  
 
  
  trex.collide(invisibleGround);
  
  
  
  if (gameState === PLAY){
     ground.velocityX = -12;
    score = Math.round(frameCount/2)
  
    restart.visible = false
    gameOver.visible = false 
    
    
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
     
  if(keyDown("space") && trex.y > 160) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
    spawnObstacle();
    
  if(obstacleGroup.isTouching(trex)){
     
      gameState = END;
       
    }
    
    
  
}
  
 else if (gameState === END){
    restart.visible = true
    gameOver.visible = true
    cloudsGroup.setLifetimeEach(-1) 
    cloudsGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1)
    obstacleGroup.setVelocityXEach(0)
    ground.velocityX = 0;      
    trex.changeAnimation("collided",trexhurt)      
          
          } 
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  drawSprites();
}


function spawnClouds(){
  if (frameCount%60===0){
    
      var cloud = createSprite(600,random(30,90  ),20,20)
      cloud.addAnimation("clouds",cloudAnimation)
      cloud.velocityX = -4;  
      cloud.scale = 0.55
      cloud.lifetime = 330;
      cloud.depth = trex.depth++
       cloudsGroup.add(cloud);
  
      }
  
  
  
  
  
}
function spawnObstacle(){
 if (frameCount%80===0){ 
   spawnObstacleRand = Math.round(random( 1,6))
   var obstacles = createSprite(570,160,30,30);
   obstacles.velocityX = -12 ;
   obstacles.scale = 0.55
   obstacleGroup.add(obstacles)
   switch(spawnObstacleRand){
     case 1:obstacles.addImage(obstacle1);
       break;
        case 2:obstacles.addImage(obstacle2);
       break;
       case 3:obstacles.addImage(obstacle3);
       break; 
       case 4:obstacles.addImage(obstacle4);
       break;
        case 5:obstacles.addImage(obstacle5);
       break;
        case 6:obstacles.addImage(obstacle6);
       break;
       default:break
          
          }
   
   
   
   
}
}
  function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  
 trex.changeAnimation("running", trex_running);
  
  score = 0;
  
}








