var dog, dogHappy, database, foodS, foodStock, feed, addFood, fedTime, lastFed, foodObj;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  foodObj = new Food(100,100,10,10);

  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.25;
}


function draw() {
  background(46,139,87);
  
  drawSprites();
  
  fedTime = database.ref('Feedtime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(fastFed>=12){
    text("Last Feed: "+lastFed%12 + "PM", 350, 30);
  }else if(lastFed == 0){
    text("Last Feed: 12AM",350,30);
  }else{
    text("Last Feed: "+lastFed + "AM",350,30);
  }
  
  foodObj.display();
}
function readStock(data){

  foodS = data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
  } else {
    x = x-1
  }

  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



