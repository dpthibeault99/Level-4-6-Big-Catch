var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// time and frames
var interval = 1000/60;
var timer = setInterval(animate, interval);

var amount = 5;
var score = 0;
var playerColorTimer = 0;

var player = new gameObject(canvas.width/2, canvas.height - 25, 50, 50, "#ffff00");
player.force = 2;

var hazards = [];
var items = [];

for(var i = 0; i < amount; i++)
{
    hazards[i] = new gameObject();
    hazards[i].width = rand(25, 60);
    hazards[i].height = hazards[i].width;
    hazards[i].color = "#c43333";
    resetObject(hazards[i]);

    items[i] = new gameObject();
    items[i].width = rand(25, 55);
    items[i].height = items[i].width;
    items[i].color = "#2e7dff";
    resetObject(items[i]);
}

function animate()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    moveObjects();
    checkHits();
    drawGame();
}

function movePlayer()
{
    if(a)
    {
        player.x -= player.force * 4;
    }
    if(d)
    {
        player.x += player.force * 4;
    }

    if(player.x < player.width/2)
    {
        player.x = player.width/2;
    }
    if(player.x > canvas.width - player.width/2)
    {
        player.x = canvas.width - player.width/2;
    }
}

function moveObjects()
{
    for(var i = 0; i < amount; i++)
    {
        hazards[i].y += hazards[i].vy;
        items[i].y += items[i].vy;

        if(hazards[i].y - hazards[i].height/2 > canvas.height)
        {
            resetObject(hazards[i]);
        }

        if(items[i].y - items[i].height/2 > canvas.height)
        {
            resetObject(items[i]);
        }
    }
}

function checkHits()
{
    for(var i = 0; i < amount; i++)
    {
        if(hitPlayer(items[i]))
        {
            score++;
            player.color = "#1fbf4a";
            playerColorTimer = 30;
            resetObject(items[i]);
        }

        if(hitPlayer(hazards[i]))
        {
            score = 0;
            player.color = "#d62828";
            playerColorTimer = 30;
            resetAllObjects();
        }
    }

    if(playerColorTimer > 0)
    {
        playerColorTimer--;
    }
    else
    {
        player.color = "#ffff00";
    }
}

function drawGame()
{
    for(var i = 0; i < amount; i++)
    {
        hazards[i].drawCircle();
        items[i].drawRect();
    }

    player.drawRect();

    context.fillStyle = "#000000";
    context.font = "bold 30px Arial";
    context.fillText("Score: " + score, 20, 40);
}

function resetObject(obj)
{
    obj.x = rand(obj.width/2, canvas.width - obj.width/2);
    obj.y = rand(-canvas.height, -obj.height/2);
    obj.vy = rand(2, 7);
}

function resetAllObjects()
{
    for(var i = 0; i < amount; i++)
    {
        resetObject(hazards[i]);
        resetObject(items[i]);
    }
}

function hitPlayer(obj)
{
    return obj.x + obj.width/2 > player.x - player.width/2 &&
           obj.x - obj.width/2 < player.x + player.width/2 &&
           obj.y + obj.height/2 > player.y - player.height/2 &&
           obj.y - obj.height/2 < player.y + player.height/2;
}
