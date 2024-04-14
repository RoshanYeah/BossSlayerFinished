var playB, infoB;
var backgroundAImg, backgroundBImg, backgroundCImg;
var splashScreen, splashScreen2;
var swordManImg, bowManImg;
var swordMan, bowMan;
var swordB, bowB;
var player,player_run, player_runLeft;
var swordAttackImg, bowStillImg, bossImg, enemyImg, bossImgRight;
var swordAtk, bowStill, enemy, enemyGroup;
var ground;
var swordSwordImg;

var arrow, arrowImg;

var score = 0;

var pHealth = 200;
var pMaxHealth = 200;

var bossHealth = 5;
var bossMaxHealth = 5;

var gameState = "wait"



function preload(){
    backgroundAImg = loadImage("/assets/Background3.jpg");
    backgroundBImg = loadImage("/assets/Background1.jpg");
    backgroundCImg = loadImage("/assets/Background2.jpg");
    splashScreen = loadImage("/assets/Boss_Slayer.gif");
    splashScreen2 = loadImage("/assets/Boss_SlayerDimmed.gif");
    swordManImg = loadImage("/assets/SwordGrab-unscreen.gif");
    player_run = loadImage("/assets/Running-unscreen.gif");
    player_runLeft = loadImage("/assets/Running-unscreen-left.gif");
    bowManImg = loadImage("/assets/Bow-unscreen.gif");
    swordAttackImg = loadImage("/assets/SwordAttack-unscreen.gif");
    bowStillImg = loadImage("/assets/BowStill.jpg");
    bossImg = loadImage("/assets/Enemy.gif");
    bossImgRight = loadImage("/assets/EnemyRight.gif");
    enemyImg = loadImage("/assets/miniEnemy.gif");
    arrowImg = loadImage("./assets/arrow.png")
    swordSwordImg = loadImage("./assets/SwordSwingL.png")
}

function setup(){
    createCanvas(windowWidth,windowHeight)

    playB = createImg("/assets/PlayButton.png")
    playB.position(windowWidth/2,windowHeight/3)
    playB.size(100,80)
 

    infoB = createImg("/assets/InfoButton.png")
    infoB.position(windowWidth/2,windowHeight/3+100)
    infoB.size(100,80)

  /*  swordMan = createSprite(windowWidth/3,windowHeight/2);
    swordMan.addImage(swordManImg);
    swordMan.scale = 0.5;
    swordMan.visible = false;

    bowMan = createSprite(windowWidth/3,windowHeight/2);
    bowMan.addImage(bowManImg);
    bowMan.scale = 0.5;
    bowMan.visible = false; */

    ground = createSprite(windowWidth/2,windowHeight/2+180,windowWidth,5)


    swordB = createImg("/assets/SwordB.gif")
    swordB.position(windowWidth/3-100,windowHeight/3-50)
    swordB.size(300,300)
    swordB.hide();

    bowB = createImg("/assets/BowB.gif")
    bowB.position(windowWidth/2+50,windowHeight/3-50)
    bowB.size(300,300)
    bowB.hide();

    player = createSprite(100,windowHeight/2+100,100,100);
    player.scale= 0.5;
    player.visible = false;
    player.collide(ground)

    
    

    

    enemyGroup = new Group();
    arrowGroup = new Group();
  
    
}

function draw(){
    if(gameState == "wait"){
        background(splashScreen);
        playB.show();
        infoB.show();
        score = 0;
        pHealth = 200;
        player.x = 100
        
    }
    playB.mousePressed(() => {
        playB.hide();
        infoB.hide();
        gameState = "choose";
    })
    infoB.mousePressed(()=>{
        playB.hide();
        infoB.hide();
        gameState = "information";
    })
    

    if(gameState == "choose"){
        background(splashScreen2);
        weaponChoose();
    }

    swordB.mousePressed(() =>{
        swordB.hide();
        // player.y = windowHeight/2+100
        bowB.hide();
        player.addImage(swordManImg);
        gameState = "SwordLevel";
    })
    bowB.mousePressed(() =>{
        swordB.hide();
        bowB.hide();
        // player.y = windowHeight/2+100
        player.addImage(bowStillImg);
        player.y = windowHeight/2-50;
        gameState = "BowLevel";
    })

    if(gameState == "information"){
        gameInfo();
    }

    

    if(gameState == "SwordLevel"){
        background(backgroundAImg);
        player.visible = true;
        player.addImage(swordManImg);
        playerMovement();
        spawnEnemies();
        player.collide(ground);
        if(keyDown("SPACE")){
            swordAtk = createSprite(player.x+50,player.y-10,50,150);
            player.addImage(swordAttackImg);
            player.scale=0.9
            swordAtk.visible = false;
            // player.addImage(bowManImg);
            swordAtk.lifetime = 30;
            
        
        for(var i =0; i < enemyGroup.length; i++){
           
            if(swordAtk.isTouching(enemyGroup.get(i))){
                
                score+= 5;
                enemyGroup.get(i).remove();
               
            }
        }
        
    }

        
        if(!keyDown("SPACE")){
            player.addImage(swordManImg);
            player.scale=0.5;
            player.debug = false;
            player.setCollider("rectangle",0,0,75,250)
            
            
            for(var i =0; i < enemyGroup.length; i++){
               
                if(player.isTouching(enemyGroup.get(i))){
                   
                    pHealth-= 50;
                    enemyGroup.get(i).remove();
                    
                }
            }
        }
        
        if(score == 100){
            gameState = "gamewin";

        }

        if(pHealth == 0){
            gameState = "gameover";
        }
    }  

        
        
    
    if(gameState == "BowLevel"){
       
        background(backgroundAImg);
        player.visible = true;
        player.setCollider("rectangle",0,0,100,200)
        playerMovement();
        spawnEnemies();
        
        if(keyDown("SPACE")){
            spawnArrows();
            player.addImage(bowManImg);
            
        
        }
        for(var i =0; i < enemyGroup.length; i++){
           
            if(arrowGroup.isTouching(enemyGroup.get(i))){
                
                score+= 5;
                enemyGroup.get(i).remove();
                arrowGroup.destroyEach();
            }
        }

        for(var i =0; i < enemyGroup.length; i++){
            console.log("forlooop")
            if(player.isTouching(enemyGroup.get(i))){
                console.log("bow")
                pHealth-= 50;
                enemyGroup.get(i).remove();
                
            }
        }
        
    
        if(score == 100){
            gameState = "gamewin";

        }

        if(pHealth == 0){
            gameState = "gameover";
        }

    

   }
 if(gameState == "gamewin") {
    enemyGroup.destroyEach();
    arrowGroup.destroyEach();
    player.visible = false;
    gameWin();
 } 
 if(gameState == "gameover"){
    enemyGroup.destroyEach();
    arrowGroup.destroyEach();
    player.visible= false;
    gameOver();
 }
drawSprites();
if(gameState == "BowLevel" || gameState == "SwordLevel"){
    textSize(30)
    text("Score: "+score,windowWidth/2, 100);
    healthLevel();
}
}

function weaponChoose(){
    swordB.show();
    bowB.show();
}
function gameInfo(){
    swal({
        title: "How to play",
        text: "Use the A/D or Left and Right Arrows to move left and right.",
        textAlign: "CENTER",
        imageUrl: "assets/Boss_Slayer.gif",
        imageSize: "200x200",
        confirmButtonText:"OK",
        confirmButtonColor:"green"
        
    },
    function(){
        gameState = "wait"
    })
}

function playerMovement(){
    if(player.x < 30){
        player.x = 30;
    }
    if(player.x >windowWidth-100){
        player.x = windowWidth-100
    }

    if(player.y < 200){
        player.y = 200
    }
    if(player.y > windowHeight/2+180){
        player.y = windowHeight/2+180
    }
    
    if(keyDown("RIGHT_ARROW") || keyDown("D")){
        player.addImage(player_run);
        player.x += 10;
        

    }
    if(keyDown("LEFT_ARROW") || keyDown("A")){
        player.addImage(player_runLeft)
        player.x -= 10;
       
    }
    if((keyDown("UP_ARROW") || keyDown("W")) && player.y >100){

        player.y -= 35;
        //swordAtk.y -=35;
    }
    
    player.y +=15;
   // swordAtk.y +=35;
    if(keyDown("DOWN_ARROW") || keyDown("S")){
        player.y += 25;
       // swordAtk.y +=25;
    }

   player.collide(ground);
 //  swordAtk.collide(ground);
}

function spawnEnemies(){

    enemy = createSprite(windowWidth+100,windowHeight/2+120,100,100);
   
    if(score < 50){
        if(frameCount % 50 == 0){
            enemy.addImage(enemyImg);
            enemy.scale = 0.2;
            enemy.velocityX = -10;
            enemy.positionX = windowWidth+100;
            enemy.debug= false;
            enemy.setCollider("rectangle",0,0,500,600)
            enemy.collide(ground)
            //enemy.positionY = windowHeight/2;
            enemy.lifetime = 150;
        }
    }
    if(score >=50){
        
        if(frameCount % 50 == 0){ 
        enemy.addImage(bossImg);
        enemy.scale = 1;
        enemy.velocityX = -10;
        enemy.positionX = windowWidth+100;
        enemy.positionY = windowHeight/2+200;
        enemy.debug= false;
        enemy.setCollider("rectangle",0,0,100,200)
        enemy.collide(ground)
        if(enemy.x == 10){
            enemy.addImage(bossImgRight);
            enemy.velocityX = 7;
        }
        if(enemy.x == windowWidth-30){
            enemy.addImage(bossImg);
            enemy.velocityX = -7
        }
        enemyHealth();
    }
}
    enemyGroup.add(enemy)
}

function spawnArrows(){
    if(keyDown("SPACE")){
        arrow = createSprite(player.x+100,player.y+10,100,100);
        arrow.addImage(arrowImg);
        arrow.scale= 0.2;
        arrow.velocityX = 10;
        arrowGroup.add(arrow);
    }
    
}

function enemyHealth(){
    // if(bossHealth == 0){
    //     enemy.
    // }
}



function bowAttack(){
    player.addImage(bowManImg);
    player.addImage(bowStill);
}

function healthLevel(){
    strokeWeight(10);
    stroke("DarkGreen");
    noFill();
    rect(windowWidth/12,windowHeight/12,pMaxHealth,20);

    noStroke();
    fill("Green");
    rect(windowWidth/12,windowHeight/12,pHealth,20);
}

function gameOver(){
    swal({
        title: "You Lose :(",
        text: " RETRY",
        textAlign: "CENTER",
        imageUrl: "assets/Boss_Slayer.gif",
        imageSize: "200x200",
        confirmButtonText:"Restart",
        confirmButtonColor:"green"
        
    },
    function(){
        gameState = "wait"
    })
}

function gameWin(){
    swal({
        title: "Success :)",
        text: " RETRY",
        textAlign: "CENTER",
        imageUrl: "assets/Boss_Slayer.gif",
        imageSize: "200x200",
        confirmButtonText:"Restart",
        confirmButtonColor:"green"
        
    },
    function(){
        gameState = "wait"
    })
}


