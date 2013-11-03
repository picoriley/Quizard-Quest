/** THE GAME
 * Author: Anthony Cloudy
 * Learning from a tutorial on http://blog.sklambert.com/html5-canvas-game-panning-a-background/
 * Sections are copied from that website, but mostly I'm trying to rewrite them as much as possible
 */

//The path to the resources folder for the game
var path = "../../Resources/Game/";
var avatarPath = "../../Resources/Avatars/";

/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */
var iRepo = new function() {
  // Define images
  this.background = new Image();
  this.monster = new Image();
  this.avatar = new Image();
 
  var numImages = 3;
  var numLoaded = 0;
  
  function imageLoaded()
  {
    numLoaded++;
    if (numLoaded === numImages)
    {
      window.init();
    }
  }
  
  this.background.onload = function(){
    imageLoaded();
  }
  
  this.monster.onload = function(){
    imageLoaded();
  }
  
  this.avatar.onload = function(){
    imageLoaded();
  }
  
  // Set images src
  this.background.src = path + randomBackground();
  this.monster.src = path + randomMonster();
  this.avatar.src = avatarPath + "Greg.png";
}

//Picks a random monster image from the available pool of monsters
function randomMonster()
{
  var choice = Math.floor((Math.random() * 3) + 1);
  if (choice === 1)
  {
    return "Sprites/Centipede.png";
  }
  else if (choice === 2)
  {
    return "Sprites/Slug.png";
  }
  else if (choice === 3)
  {
    return "Sprites/Stag.png";
  }
}

//Picks a random background image from the available pool of backgrounds
function randomBackground()
{
  var choice = Math.floor((Math.random() * 3) + 1);
  if (choice === 1)
  {
    return "Backgrounds/Plains.png";
  }
  else if (choice === 2)
  {
    return "Backgrounds/Cliff.png";
  }
  else if (choice === 3)
  {
    return "Backgrounds/Forest.png";
  }
}

//The interface for anything that gets drawn on screen
function Drawable()
{
  this.init = function(x, y, width, height){
    //Default variables
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };
  
  this.speed = 0;
  this.canvasWidth = 0;
  this.canvasHeight = 0;
  
  //Implemented in children
  this.draw = function(){
  };
}

function Background()
{
  this.draw = function() {
    this.context.drawImage(iRepo.background, this.x, this.y, this.width, this.height);
  };
}

//Get the background object to copy all of Drawable's information
Background.prototype = new Drawable();

function Monster()
{
  this.idleVal = 0;
  this.idleUp = true;
  
  this.draw = function() {
    this.context.drawImage(iRepo.monster, this.x, this.y, this.width, this.height);
  };
  
  this.clear = function() {
    this.context.clearRect(this.x, this.y, this.width, this.height);
  };
  
  //Make the monster float up and down in an idling sequence
  this.idle = function() {  
    //If we hit a boundary, then change direction
    if (this.idleVal == 20)
    {
      this.idleUp = false;
    }
    else if (this.idleVal == -20)
    {
      this.idleUp = true;
    }
    
    if (this.idleUp)
    {
      this.idleVal++;
      if (this.idleVal % 10 == 0)
      {
	this.y++;
      }
    }
    else 
    {
      this.idleVal--;
      if (this.idleVal % 10 == 0)
      {
	this.y--;
      }
    }
  };
}

Monster.prototype = new Drawable();

/*http://krazydad.com/tutorials/makecolors.php
function colorText(str,phase)
{
  if (phase == undefined) phase = 0;
  var center = 128;
  var width = 127;
  var frequency = Math.PI*2/str.length;
  for (var i = 0; i < str.length; ++i)
  {
     var red   = Math.sin(frequency*i+2+phase) * width + center;
     var green = Math.sin(frequency*i+0+phase) * width + center;
     var blue  = Math.sin(frequency*i+4+phase) * width + center;
     document.write( '<font color="' + RGB2Color(red,green,blue) + '">' + str.substr(i,1) + '</font>');
  }
}*/

function Avatar()
{
  this.draw = function() {
    this.context.drawImage(iRepo.avatar, this.x, this.y, this.width, this.height);
  };
  
  this.clear = function() {
    this.context.clearRect(this.x, this.y, this.width, this.height);
  };
  
  this.move = function() {
    this.x++;
    this.context.fillStyle = 'rgba(0,0,0,0.05)';
    this.context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };
}

//Get the background object to copy all of Drawable's information
Avatar.prototype = new Drawable();

function Game()
{
  this.init = function() {
    //Grab the canvas from the page
    this.bgCanvas = document.getElementById('background');
    this.mCanvas = document.getElementById('monster');
    this.aCanvas = document.getElementById('avatar');
    
    //Check to see if we can use the canvas
    if (this.bgCanvas.getContext)
    {
      this.bgContext = this.bgCanvas.getContext('2d');
      this.mContext = this.mCanvas.getContext('2d');
      this.aContext = this.aCanvas.getContext('2d');
      
      Background.prototype.context = this.bgContext;
      Background.prototype.canvasWidth = this.bgCanvas.width;
      Background.prototype.canvasHeight = this.bgCanvas.height;
      
      Monster.prototype.context = this.mContext;
      Monster.prototype.canvasWidth = this.mCanvas.width;
      Monster.prototype.canvasHeight = this.mCanvas.height;
      
      Avatar.prototype.context = this.aContext;
      Avatar.prototype.canvasWidth = this.aCanvas.width;
      Avatar.prototype.canvasHeight = this.aCanvas.height;
      
      this.background = new Background();
      this.background.init(0, 0, iRepo.background.width, iRepo.background.height);
      
      this.monster = new Monster();
      //Center the monster in the middle of the screen.
      var monsterX = iRepo.background.width/2 - iRepo.monster.width;
      var monsterY = iRepo.background.height/4 + iRepo.monster.height;
      this.monster.init(monsterX, monsterY, iRepo.monster.width, iRepo.monster.height);
      
      this.avatar = new Avatar();
      this.avatar.init(0, 333 - iRepo.avatar.height/2, iRepo.avatar.width, iRepo.avatar.height);
      
      return true;
    }
    else
    {
      //Return false if we don't have canvas support on this bozo's computer. IE6 PROBLEMS >:I
      return false;
    }
  };
  
  this.start = function() {
    animate();
  };
}
      
/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function animate() {
  requestAnimFrame(animate);
  game.background.draw();
  game.monster.clear();
  game.monster.idle();
  game.monster.draw();
  game.avatar.draw();
  game.avatar.move();
  
}
 
/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
      };
})();

var game = new Game();

function init()
{
  if(game.init())
  {
    game.start();
  }
}