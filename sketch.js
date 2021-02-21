var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bcg;
var back1ground;
var obstacleGrp;
var count = 0;
var score;
var x1=0
var scrollSpeed = 2;

function preload() {
  bcg = loadImage("Featured_Image_Template.png")
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
 

  createCanvas(displayWidth, displayHeight);
  
  jungle.loop()
  ground = createSprite(displayWidth=+30, displayHeight-300,400,10)
 
  ground.visible =false;

  x2 = width;


  player = createSprite(30, 340, 50, 50)
  player.addAnimation("i", playeri);
  player.addAnimation("falling", ch1)
  player.scale = 0.2;


  score = 0;
  obstacleGrp = new Group();
  cGRP = new Group();
}


function draw() {
  
camera.position.x=player.x;
camera.position.y=player.y;

  background(0)
  image(bcg, x1, 0,3000, 1000);
  image(bcg, x2, 0, 3000, 1000);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  

  if (gameState === PLAY) {
    player.collide(ground);
    
    if (keyDown("space") && player.y >= 200) {
      player.velocityY = -5;
    }
    player.velocityY = player.velocityY + 0.4;
    if (ground.x < 400) {
      ground.x = ground.width / 2;
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
  text("Score: " + score, 300, 50);

          
}

function obstacles() {
  if (camera.position.x % 400===0) {
    obstacle = createSprite(400, 350, 40, 40);
    obstacle.scale = 0.25;
    obstacle.velocityX = -(2 + Math.round(score/20));
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
    obstacle.lifetime = 200;
    obstacleGrp.add(obstacle);
    obstacle.setCollider("circle", 10, 10, 60);
    // obstacle.debug=true; 
  }
}

function coin() {
    if (frameCount % 50 === 0) {
      var coin = createSprite(400, 275, 20, 20)
      coin.y = random(150, 290)
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
    text("GAMEOVER", 160, 200);
}