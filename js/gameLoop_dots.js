var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// time and frames
var interval = 1000/60;
var timer = setInterval(animate,interval);

var colors = [];
colors[0] = "#ff0000"
colors[1] = "#00ff00"
colors[2] = "#0000ff"

var amount = 50;

player = new gameObject();

var dots = [];
for(var i = 0; i < amount ; i++)
{
    dots[i] = new gameObject();
    dots[i].x = Math.random() * canvas.width; 
    dots[i].y = Math.random() * canvas.height; 
    dots[i].color = colors[Math.floor(rand(0,2.9))];
    dots[i].width = rand(5,20);

}


function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);
    for(i=0; i < amount; i++)
    {
        dots[i].drawCircle();
    }

    player.drawTriangle();
}