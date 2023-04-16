var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;
var bulletGroup ; 

var score = 0;
var life = 3;
var bullets = 70;

var heart1, heart2, heart3

var gameState = "fight"

var lose, winning, explosionSound;


function preload(){

  bgImg = loadImage ("bg.jpeg")
  heart1Img  = loadImage ("heart_1.png")
  heart2Img  = loadImage ("heart_2.png")
  heart3Img  = loadImage ("heart_3.png")
  shooterImg = loadImage ("shooter_2.png")
  shooter_shooting = loadImage ("shooter_3.png")
  zombieImg = loadImage ("zombie.png")
}

function setup() {
createCanvas(windowWidth , windowHeight)

player = createSprite (windowWidth-1000 , windowHeight-100 , 30 , 50)
player.addImage(shooterImg);
player.scale = 0.4

heart1 = createSprite (windowWidth-60 , windowHeight-650 , 30 , 30)
heart1.addImage (heart1Img)
heart1.scale = 0.3
heart1.visible = false 

heart2 = createSprite (windowWidth-80 , windowHeight-650 , 30 , 30)
heart2.addImage (heart2Img)
heart2.scale = 0.3
heart2.visible = false 

heart3 = createSprite (windowWidth-110 , windowHeight-650 , 30 , 30)
heart3.addImage (heart3Img)
heart3.scale = 0.3
heart3.visible = true

bulletGroup = new Group () ;
zombieGroup = new Group () ;

} 




function draw() {
  background(bgImg); 

  if(gameState==="fight") {

  

  if (keyDown ("UP_ARROW") ) {
    player.y = player.y-10
  }

  if (keyDown ("DOWN_ARROW") ) {
    player.y = player.y+10
  }

  if(keyWentDown ("SPACE")) {
    bullet = createSprite (windowWidth - 1000 , player.y - 20 , 20 , 5 ) 
    bullet.velocityX = 10
    player.depth = bullet.depth
    player.depth = player.depth + 2
    bulletGroup.add (bullet) ;
    bullets = bullet - 1 

    player.addImage (shooter_shooting)

  }
  else if (keyWentUp ("SPACE")) {
    player.addImage (shooterImg) 
  }

  if ( bullets === 0 ) {
    gameState = "over"
  }

  
  if (zombieGroup.isTouching (bulletGroup)) {
    for (i=0; i<zombieGroup.length; i++) {
      if (zombieGroup[i].isTouching (bulletGroup)) {
        zombieGroup[i].destroy()
        bulletGroup.destroyEach ()
        score = score + 2
      }

    }
  }
 


  if ( zombieGroup.isTouching (player)) {
    for (i =0 ; i<zombieGroup.length; i++) {
      if(zombieGroup[i].isTouching(player)) {
        zombieGroup[i].destroy()
        life = life-1
      }
    }
  }



  if(life===3){
    heart3.visible=true
    heart1.visible=false
    heart2.visible = false
  }

  if(life===2){
    heart3.visible=false
    heart1.visible=false
    heart2.visible = true
  }

  if(life===1){
    heart3.visible=false
    heart1.visible=true
    heart2.visible = false 
  } 

  if (life === 0 ) {
    heart3.visible=false
    heart1.visible = false
    heart2.visible = false 
    gameState = "lost" 
  }
  
  if(bullets === 0) {
    gameState = "over"
  }

  if(score === 100) {
    gameState = "won"
  }

  spawnZombies () 

 } 

 //displaying scores , bullets and lifes

 textSize (20) 
 fill ("white") 
 text ("bullets = " + bullets , windowWidth-200 , windowHeight/2-200 )

 text ("score = " + score , windowWidth-200 , windowHeight/2-180 )

 text ("lifes = " + life , windowWidth-200 , windowHeight/2-160)

 
  if ( gameState==="lost") {

    
    textSize (50)
    fill("white")
    text("You Have Lost The Game" , windowWidth/2-150 , windowHeight/2+200 )
    zombieGroup.destroyEach() 
    player.destroy()
  } 

  else if (gameState === "over") {
    textSize (50) 
    fill ("red")
    text ("You Ran Out Of BUllets" , windowWidth/2-150 , windowHeight/2+200) 
    zombieGroup.destroyEach() 
    player.destroy()
    bulletGroup.destroyEach() 
  
  } 

  else if (gameState === "won") {
    textSize (50) 
    fill ("purple")
    text ("Yayyy ! You won The Game" , windowWidth/2-150, windowHeight/2+200) 
    zombieGroup.destroyEach() 
    player.destroy()
  }


 
 
 drawSprites ()
}

 function spawnZombies () {
   if ( frameCount%60 === 0) { 
    zombie = createSprite (windowWidth - 100 , random (100,500) , 40 , 40 )
    zombie.addImage (zombieImg) 
    zombie.velocityX = -5
    zombie.scale = 0.2
    zombie.lifetime = 300

    zombieGroup.add (zombie)
   }
 }


