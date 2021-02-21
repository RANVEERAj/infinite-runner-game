var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bcg;
var back1ground;
var obstacleGrp;
var count = 0;
var x1 = 0;
var x2;
var score;
var scrollSpeed = 3;

function preload() {
  bcg = loadImage("jungle.png");
  playeri = loadAnimation("unnamed.gif")

  obstacle1 = loadImage("STONE IMAGE.png")
  obs2 = loadAnimation("fire.gif");
  ob3 = loadImage("download.jpg")
  ch1 = loadAnimation("i.png")
  coin1 = loadAnimation("me.gif")
  coinsound=loadSound("just.mp3")
  falls=loadSound("just.mp3")
  jungle = loadSound("jungle.mp3")
}

function setup() {
  

  createCanvas(windowWidth, windowHeight);

  x2 = width;
  
  jungle.loop()
  ground = createSprite(width/2, height-100,width, 125);
 
  ground.visible = false;


  player = createSprite(500, 500, 50, 50)
  player.addAnimation("i", playeri);
  player.addAnimation("falling", ch1)
  player.scale = 0.25;

  j=createSprite(width/2, height/2,10,10)
  j.visible=false


  score = 0;
  obstacleGrp = new Group();
  cGRP = new Group();
}


function draw() {
  camera .position.x=j.x;
  camera .position.y=j.y;
  background("skyblue")
  
  if (gameState === PLAY) {
    player.collide(ground);
    
    if (keyDown("space") && player.y >= 250) {
      player.velocityY = -6;
    }
    player.velocityY = player.velocityY + 0.4;
    if (ground.x < 400) {
      ground.x = ground.width / 2;
    }
  image(bcg, x1,-100, displayWidth, displayHeight+100);
  image(bcg, x2,-100, displayWidth, displayHeight+100);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
    console.log(count);
    obstacles();
    coin();
    for (var i = 0; i < count; i++) {
      if (cGRP.isTouching(player)) {
        if(cGRP.get(i)!= null){
        cGRP.get(i).destroy();
        coinsound.play();
        score = score + 2;
        }
      }
    }
    
    if (obstacleGrp.isTouching(player)) {
      gameState = END;
      
    }
    
    bcg.velocityX = -(2 + Math.round(score/20))
    
    drawSprites();
  } 
  else if (gameState === END) {
    jungle.stop()
    reset()
  }
  stroke("white");
  textSize(20);
  fill("green");
  text("Score: " + score,width/2, 50);

          
}

function obstacles() {
  if (frameCount % 250 === 0) {
    obstacle = createSprite(width/2+100, 530, 40, 40);
    obstacle.scale = 0.25;
    obstacle.velocityX = -(2 + Math.round(score/30));
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addAnimation("me", obs2);
        break;
      default:
        break;


    }
    obstacle.lifetime = 800;
    obstacleGrp.add(obstacle);
    obstacle.setCollider("circle", 10, 10, 60);
    obstacle.debug=true; 
  }
}

function coin() {
    if (frameCount % 50 === 0) {
      var coin = createSprite(700, random(height/2-100, height/2+50), 20, 20)
     
      coin.addAnimation("me2", coin1);
      coin.scale = 0.1;
      coin.velocityX = -(2 + Math.round(score/20));
      coin.setCollider("circle", 0, 0, 20);
      coin.debug = true
      cGRP.add(coin);
      count = count + 1;
    }
}

function reset(){
  obstacleGrp.setVelocityXEach(0);
    obstacleGrp.setLifetimeEach(-1);
    cGRP.setVelocityXEach(0);
    cGRP.setLifetimeEach(-1);
    ground.velocityX = 0;
    bcg.velocityX = 0
   

    player.velocityY = 0
    player.collide(ground);

    player.scale = 0.09;
    stroke("white");
    textSize(20);
    fill("green");
    text("GAMEOVER", width/2-100, height/2);
}