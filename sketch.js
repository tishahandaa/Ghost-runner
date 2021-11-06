var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climberGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  //tower creation
    tower = createSprite(300,300);
    tower.addImage("tower",towerImg);
    tower.velocityY = 1;

  //Groups
    doorsGroup = new Group()
    climberGroup = new Group()
    invisibleBlockGroup = new Group()

  //Creation of ghost
    ghost = createSprite(200,200,50,50)
    ghost.addImage(ghostImg)
    ghost.scale = 0.25

  //music
  spookySound.loop()
}

function draw() {
  background(200);
  
  if(gameState == "play"){
  //tower creation
    if(tower.y > 400){
      tower.y = 300
    }

  //ghost
    if (keyDown("left_arrow")){
        ghost.x = ghost.x-2
    }

    if(keyDown("right_arrow")){
        ghost.x = ghost.x+2
    }

    if(keyDown("space")){
      ghost.velocityY = -5
    }

    if (climberGroup.isTouching (ghost)){
      ghost.velocityY = 0 
    }
  //ghost gravity
    ghost.velocityY = ghost.velocityY+0.5
    spawnDoors()
    drawSprites()
  
    if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy()
      gameState = "END"

    }
  }
if(gameState == "END"){  
  textSize(30)
  fill("black")
  text("GAME OVER",300,300)

}



}

function spawnDoors(){ 

//Spawn Doors
  if (frameCount%240===0){
    door = createSprite(200,-50)
    door.addImage(doorImg)
    door.x = Math.round(random(120,400))
    door.velocityY = 1.15
    door.lifetime = 600
    ghost.depth = door.depth+1
doorsGroup.add(door)


//Spawn Climbers
  climber = createSprite(200,10)
  climber.addImage(climberImg)
  climber.velocityY = 1.15
  climber.lifetime = 600
  climber.x=door.x
  ghost.depth = climber.depth+1
climberGroup.add(climber)

//invisible block
  invisibleBlock = createSprite(200,15)
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2
  invisibleBlock.x = climber.x 
  invisibleBlock.velocityY = 1.15
  invisibleBlock.lifetime = 600  
invisibleBlockGroup.add(invisibleBlock)
}
}

