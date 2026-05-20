// old gameloop==============================

var canvas;
var context;
var player;
var timer;
var interval = 1000/60; //60 fps
var frictionX = .9;
var frictionY = .9;
var gravity = 1;


canvas = document.getElementById("myCanvas");
context = canvas.getContext("2d");

player = new gameObject(200,canvas.height/2,this.w,this.h,'#ff00f2')
player.vx = 0; //horizontal movement
player.vy = 0; // vertical movement

// NEW reguler platform

platform0 = new gameObject();
platform0.width = 400;
platform0.y = player.y + player.height/2 + platform0.height/2;
platform0.color = '#008127'

// NEW pass throw platform

platform1 = new gameObject();
platform1.width = 200;
platform1.y = player.y + player.height/2 + platform1.height/2;
platform1.x = 130;
platform1.color = '#0084ff';

// NEW reguler platform

platform2 = new gameObject();
platform2.width = 200;
platform2.y = player.y + player.height/2 + platform2.height/2;
platform2.x = 870;
platform2.color = '#d0ff00';

// npcONE = new gameObject(310,canvas.height/2,100,100,'#ffbb00');
// npcTWO = new gameObject(500,canvas.height/2,100,100,'#0d007e');
// npcTHREE = new gameObject(900,canvas.height/2,100,100,'#ff0000');


timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (w && player.canJump)
    {
        player.canJump = false;
        player.vy += player.jumpSpeed;
    }

    // // player movement
    //  if(d)
    // {
    //     player.x += 4
    // }

    // if(a)
    // {
    //     player.x -= 4
    // }

    doHandleAcceleration();
    doHandleFriction();
    doHandleGravity();
    doUpdatePosition();
    doCheckBottomBound();

    // platform0 collistion Green
    while (platform0.hitTestPoint(player.bottom())) //NEW
    {
        player.y --;
        player.vy = 0;
        player.canJump = true;
    }

    while(platform0.hitTestPoint(player.top())) // NEW
    {
        player.y++;
        player.vy = 0;//NEW
    }

    // platform1 collision Blue

    while (platform1.hitTestPoint(player.bottom()) && player.vy >= 0) //NEW
    {
        player.y--;
        player.vy = 0;
        player.canJump = true;//NEW
    }

    // platform2 collistion yellow
    while (platform2.hitTestPoint(player.bottom())) //NEW
    {
        player.y --;
        player.vy = 0;
        player.canJump = true;//NEW
    }

    while(platform2.hitTestPoint(player.top())) // NEW
    {
        player.y++;
        player.vy = 0;//NEW
    }

    player.move();
    //npcONE.move();
    if (player.x > canvas.width + player.width/2) // if player moves off screen 
    {
         // uncomment one or the other to change movment
         // player.x = -player.width/2       //teleports player totally off the screen to the left -- Turn this off before turning on bottom one
    //    player.vx *= -1 // reverse velocity to simulate bounce off right border 
    }

    // //=====npcONE collistion
    // if (npcONE.collistionCheck(player))
    // {
    //  npcONE.color = "#4d6200";
    //  npcONE.width = 150; // kinda like a hover botton
    // }
    // else
    //  {
    //  npcONE.color = "#000000"; // changed it to this automaticlly
    // }

    // //=========npc.TWO
    // if(npcTWO.collistionCheck(player))
    // {
    //  context.strokeRect(npcTWO.x - npcTWO.width/2, npcTWO.y-npcTWO.height/2, npcTWO.width, npcTWO.height);
    // }

    // //==========npcThree
    // if(npcTHREE.collistionCheck(player))
    //  // kinda like hitting a wall
    // {
    //  player.x = player.prevX
    // }
    // else
    // {
    //  player.prevX = player.x
    // }

    // player.drawCircle();
    player.drawRect();//NEW
    player.drawDebug();//NEW
    platform0.drawRect();//NEW
    platform1.drawRect();//NEW
    platform2.drawRect();//NEW
    // npcONE.drawCircle();
    // npcTWO.drawCircle();
    // npcTHREE.drawCircle();
}

function doHandleAcceleration()
{
    if(d)
    {
        player.vx += player.ax * player.force;
    }
    if(a)
    {
        player.vx += player.ax * - player.force;
    }
}

function doHandleFriction()
{
player.vx *= frictionX
}

function  doHandleGravity()
{
player.vy +=gravity;
}

function doUpdatePosition()
{
player.x += player.vx;
player.y += player.vy;
}

function doCheckBottomBound()
{
    if(player.y > canvas.height - player.height/2)
    {
        player.y = canvas.height - player.height/2;
        player.vy = 0;
        player.canJump = true; // NEW
        // doJump();
    }
}

function doJump(){
    if(w)
    {
        player.vy += player.jumpSpeed;
    }
    
}