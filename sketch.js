var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var cacto, c1, c2, c3, c4, c5, c6;
var cactogrupo, nuvemgrupo;
var estado = "Comeco";
var pontuacao = 0;
var gameover, restart, gameoverImage, restartImage;
var puloSom, morteSom, checkpointSom;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  gameoverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");

  puloSom = loadSound("jump.mp3");
  morteSom = loadSound("die.mp3");
  checkpointSom = loadSound("checkpoint.mp3");

  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle2.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;

  gameover = createSprite(300, 100);
  gameover.addImage("gameOver", gameoverImage);
  gameover.scale = 0.7;
  restart = createSprite(400, 140);
  restart.addImage("restart", restartImage);
  restart.scale = 0.4;

  gameover.visible = false;
  restart.visible = false;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  
  cactogrupo = new Group();
  nuvemgrupo = new Group();

  trex.debug = true;
  // trex.setCollider("circle",0,0,40);
  trex.setCollider("rectangle",40,0,220,55,0);
}

function draw() {
  background(180);
  
  if(pontuacao > 0 && pontuacao % 100 === 0){
   checkpointSom.play();
  }

  trex.collide(invisibleGround);
  text("Pontuação: " + pontuacao,500,40);

 if(estado === "Comeco") {
   pontuacao = pontuacao + Math.round(getFrameRate() / 60);
  if(keyDown("space") && trex.y >= 100) {
    puloSom.play();
    trex.velocityY = -10;
  }
  if(ground.x < 0){
    ground.x = ground.width / 2;
  }
    trex.velocityY = trex.velocityY + 0.8;
    ground.velocityX = -(3 + pontuacao / 100);
    spawnClouds();
    cactose();
  if(trex.isTouching(cactogrupo)) {
    // estado = "Fim";
    morteSom.play();
    trex.velocityY = -0.1;
  }
}

 else if(estado === "Fim") {
   ground.velocityX = 0;
   trex.velocityY = 0;
   trex.changeAnimation("collided",trex_collided);
   cactogrupo.setVelocityXEach(0);
   cactogrupo.setLifetimeEach(-1);
   nuvemgrupo.setVelocityXEach(0);
   nuvemgrupo.setLifetimeEach(-1);
   restart.visible = true;
   gameover.visible = true;

   if(mousePressedOver(restart)){
    reset();
  }
  }
  drawSprites();
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //atribua tempo de vida à variável
    cloud.lifetime = 245
    
    //ajuste a profundidade
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    nuvemgrupo.add(cloud);
    }
}

function cactose(){
    if(frameCount % 80 === 0){
     cacto = createSprite(600,170,40,10);
     sc = Math.round(random(1,6))
     cacto.scale = 0.6;
     cacto.velocityX = -(3 + pontuacao / 100);
     cacto.lifetime = 240;

    cactogrupo.add(cacto);

    switch(sc){
      case 1: cacto.addImage(c1);
                           break;
      case 2: cacto.addImage(c2);
                           break;
      case 3: cacto.addImage(c3);
                           break;
      case 4: cacto.addImage(c4);
                           break;
      case 5: cacto.addImage(c5);
                           break;
      case 6: cacto.addImage(c6);
                           break;
      default:
                           break;
    }
    }
}

function reset() {
  estado = "Comeco";
  cactogrupo.destroyEach();
  nuvemgrupo.destroyEach();
  pontuacao = 0;
  trex.changeAnimation("running", trex_running);
  gameover.visible = false;
  restart.visible = false;
}

