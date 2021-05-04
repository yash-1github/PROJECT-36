var dog,sadDog,happyDog, db;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, time;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  db=firebase.database();
  createCanvas(1000,400);
  
  
  foodObj = new Food();


  foodStock=db.ref('Food');
  foodStock.on("value",readStock);
  

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

 

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  FeedTheDog=createButton("Feed The Dog");
  FeedTheDog.position(400,95);
  FeedTheDog.mousePressed(feedDog);

  db.ref("FeedTime").on("value", function(data){
   time = data.val();
  })
  
}

function draw() {
  background(46,139,87);
  foodObj.display();


 
  
  stroke("red");
  textSize(30);
  text( "LAST FED  : " + time , 100 , 100);

  stroke("red");
  textSize(30);
  text( "FEED THE DOG AT INTERVALS OF 2 HOURS" , 100 , 300);
  

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
 
  foodS = foodS-1; 
  db.ref('/').update({
Food : foodS
  })
  time = hour();
  db.ref("/").update( {  FeedTime : time})

}

//function to add food in stock
function addFoods(){
  foodS++;
  db.ref('/').update({
    Food:foodS
  })
}
