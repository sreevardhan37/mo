
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var scoree=0,score=0;
var ground,ground_image; 
var inground;
var Play=1,end=0,gameState=Play ;
function preload(){
  
  ground_image=loadImage("jungle.jpg");
  monkey_running =            loadAnimation("senthil2.png","4.png","senthil3-1.png","5.png","senthil3-1.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}
function setup() 
{
  createCanvas(600,600);
    ground=createSprite(400,300,400,20);
  ground.addImage(ground_image)
  ground.velocityX=-3 ;
  ground.scale=0.9 
  monkey=createSprite(100,350);
  monkey.addAnimation("runing",monkey_running);
  monkey.scale=0.020;
  inground=createSprite(300,567,1200,20);
  inground.velocityX=0;
  inground.visible=false;
  FoodGroup=new Group()
  obstacleGroup=new Group()
}
function draw() 
{
  background("lightblue");

  if(gameState===Play)
    {
  if((ground.x)<150)
    {
     ground.x=400;
    }

    monkey.velocityY=monkey.velocityY+0.8;
      switch(score)
        {
            case 10: monkey.scale=0.04;
                     break;
            case 20: monkey.scale=0.06;
                     break;
            case 30: monkey.scale=0.08;
                     break;
            case 40: monkey.scale=0.10;
                     break;     
            default: break;
        }
  if(keyDown("space")&&monkey.y>470)
     {
       monkey.velocityY=-12;      
     }
  if(monkey.isTouching(FoodGroup))
    {
      score=score+1;
      FoodGroup.destroyEach();
    }
    if(monkey.isTouching(obstacleGroup))
    {
      if(monkey.scale===0.020)
        {
          gameState=end;
        }
      if(monkey.scale>0.020)
        {
          monkey.scale=0.020
        }
      obstacleGroup.destroyEach();
    }
      banana1(); 
      obs1();
      monkey.collide(inground);
      
    }
  if(gameState===end)
    {

      reset()
         if(keyDown("r"))
     {
       gameState=Play;
       
     }            
    }

  drawSprites();
  fill("")
  textSize(20)
  text("score : "+score,10,35)
  
  
}
function banana1()
{
  if(frameCount%80===0)
    {
  banana=createSprite(610,Math.round(random(300,385)),10,10);
  banana.velocityX=-2;
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.lifetime=300;
  FoodGroup.add(banana);
    }
}
function obs1()
{
  if(frameCount%200===0)
    {
  obstacle=createSprite(610,520,10,10);
  obstacle.velocityX=-9;
  obstacle.addImage(obstaceImage);
  obstacle.scale=0.1;
  obstacle.lifetime=75;
  obstacle.debug=true;
  obstacleGroup.add(obstacle);
    }
}
function reset()
{
      textSize(30)
      text("Press R to restart",140,300);
      inground.velocityX=0;
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();  
      monkey.velocityY=0;
      score=0;
}