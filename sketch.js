const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var tower,ground,cannon,cannonBall;
var engine, world;
var balls=[];
var boats = [];
var boat;

function preload(){
    bgd = loadImage("/assets/background.gif")
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    angle = -PI/4

    tower = new Tower(150, 350, 160, 310);
    ground = new Ground(600,580,1200,20)
    cannon = new Cannon(180, 110, 100, 50, angle);
   
}

function draw(){
    background(220);
    image(bgd,600,300,1200,600);
    
    Engine.update(engine);
   
    tower.display();
    cannon.display();
    showBoats();

    for(var i=0; i< balls.length; i++){
        showCannonBalls(balls[i],i);
        for(var j=0 ; j<boats.length ; j++){
            if(balls[i]!== undefined && boats[i]!== undefined){
                var collision = Matter.SAT.collides(balls[i].body,boats[j].body);
                //console.log(collision);
                if(collision.collided){

                        boats[j].remove(j);
                        Matter.World.remove(world,balls[i].body);
                        balls.splice(i,1);
                        i--;
                    
                console.log("Inside If");
                }
            }
        }
    }
}

function keyReleased(){
    if(keyCode === DOWN_ARROW){
        balls[balls.length-1].shoot();
    }
   
}

function keyPressed(){
    if(keyCode === DOWN_ARROW){
        cannonBall = new CannonBall(cannon.x,cannon.y);
        balls.push(cannonBall);
    }
}

function showCannonBalls(ball,index){
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y>= height-150){
        World.remove(world,ball.body);
        balls.splice(index,1);
    }
}

function showBoats(){
    
    if(boats.length > 0){
        if(boats.length < 4 && boats[boats.length-1].body.position.x  < width-300){
            var positions = [-50,-20,-10,-40];
            var pos = random(positions);
            boat = new Boat(width,height-100,200,200,pos);
            boats.push(boat);
        }
        for(var i = 0; i< boats.length; i++){
            boats[i].display();
            Matter.Body.setVelocity(boats[i].body, {x: -0.9,y:0});
        }    
    }
    else{
        
        boat = new Boat(width,height-100,200,200,-10);
        boats.push(boat);
    }
}