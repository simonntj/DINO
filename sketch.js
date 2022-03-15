var dino 
var dinomov
var dinof
var chao 
var chaoimg
var chaoivi
var nuvem
var nuvemimg
var obs1
var obs2
var obs3
var obs4
var obs5
var obs6
var pontos=0
var PLAY=1
var END=2
var gameState= PLAY;
var obsgp;
var nuvemgp;
var over
var overimg
var reniciar
var reniciarimg
var pulomus
var overmus
var pontosmus

function preload(){
  dinomov = loadAnimation ("trex1.png","trex3.png","trex4.png");
  dinof = loadAnimation ("trex_collided.png");
  chaoimg = loadAnimation("ground2.png");
  nuvemimg = loadAnimation("nuvem.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  overimg=loadImage("gameOver.png");
  reniciarimg=loadImage("restart.png");

  pulomus = loadSound("jump.mp3");
overmus = loadSound("die.mp3");
pontosmus = loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(600,200);
  dino = createSprite(50,180,20,50)
  dino.addAnimation("correndo",dinomov);
  dino.addAnimation("morreu",dinof);
  dino.scale = 0.5
  chao = createSprite (200,180,400,20);
  chao.addAnimation("chao",chaoimg);
  chaoivi = createSprite (200,190,400,10);
  chaoivi.visible = false
  obsgp = createGroup();
  nuvemgp = createGroup();
  over=createSprite(300,100,20,20);
  over.addAnimation("fim",overimg);
  reniciar=createSprite(300,140,20,20);
  reniciar.addAnimation("reniciar",reniciarimg);
  over.scale=0.5;
  reniciar.scale=0.5;
  dino.setCollider("circle",0,0,40);
  dino.debug=false
}

function draw(){
  //definir a cor do plano de fundo 
  background("white");
  text("pontuação: "+ pontos,500,50);
   console.log(gameState)

  
  if (gameState===PLAY){
    over.visible=false
    reniciar.visible=false
    chao.velocityX = -(8 + 3* pontos/100);
    pontos = pontos + Math.round(getFrameRate()/60);
    if (chao.x<0){
      chao.x = chao.width/2;
    }
    if (keyDown("space")&& dino.y>=160){
      dino.velocityY = -10;
        pulomus.play();
    }
    dino.velocityY = dino.velocityY + 0.8
    criarnuvem()
    criarObs()
    if(obsgp.isTouching(dino))
    { overmus.play();
gameState=END;
}

if(pontos>0 && pontos%100 === 0){
  pontosmus.play();
}

  }
  if (gameState===END){
    over.visible=true
    reniciar.visible=true
chao.velocityX= 0
dino.velocityY=0


obsgp.setLifetimeEach(-1);
nuvemgp.setLifetimeEach(-1);

obsgp.setVelocityXEach(0);
nuvemgp.setVelocityXEach(0);
dino.changeAnimation("morreu",dinof)
if (mousePressedOver(reniciar)){
recomecar();
}
  }




  drawSprites();
  dino.collide(chaoivi);
  
}
function criarnuvem(){
if(frameCount % 60==0){

  nuvem = createSprite(600,100,40,10)
  nuvem.y=Math.round(random(50,100))

  nuvem.velocityX=-(8 + 3* pontos/100);
  nuvem.addAnimation("nuvem",nuvemimg);

nuvem.lifetime =75;
  nuvem.depth = dino.depth
  dino.depth = dino.depth +1;
  nuvemgp.add(nuvem)
}
}
function criarObs(){
  if(frameCount % 60==0){ 
var obs0 =createSprite(400,165,10,40);
    obs0.velocityX=-(8 + 3* pontos/100);

var aleatoria = Math.round(random(1,6));
switch(aleatoria){



  case 1:obs0.addImage(obs1);
  break;
  case 2:obs0.addImage(obs2);
  break;
  case 3:obs0.addImage(obs3);
  break;
  case 4:obs0.addImage(obs4);
  break;
  case 5:obs0.addImage(obs5);
  break;
  case 6:obs0.addImage(obs6);
  break;
  default: break;
}
obs0.scale=0.5;
obs0.lifetime =75;
obsgp.add(obs0)
  }
}
function recomecar(){
gameState = PLAY
over.visible = false;
reniciar.visible = false;

obsgp.destroyEach();
nuvemgp.destroyEach();

pontos = 0;

dino.changeAnimation("correndo",dinomov);
}