function hitTestRectangle(r1, r2) 
{

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + (r1.width * r1.scale.x) / 2;
  r1.centerY = r1.y + (r1.height * r1.scale.y) / 2;
  r2.centerX = r2.x + (r2.width * r2.scale.x) / 2;
  r2.centerY = r2.y + (r2.height * r2.scale.y) / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = (r1.width * r1.scale.x) / 2;
  r1.halfHeight = (r1.height * r1.scale.y) / 2;
  r2.halfWidth = (r2.width * r2.scale.x) / 2;
  r2.halfHeight = (r2.height * r2.scale.y) / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) 
  {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) 
    {
      //There's definitely a collision happening
      hit = true;
    } 
    else 
    {

      //There's no collision on the y axis
      hit = false;
    }
  }
  else 
  {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

function contain(sprite, container) 
{
  let collision = undefined;
  //Left
  if (sprite.x - (sprite.width / 2) < container.x) 
  {
    sprite.x = container.x + (sprite.width / 2);
    collision = "left";
  }
  //Top
  if (sprite.y - (sprite.width / 2)< container.y) 
  {
    sprite.y = container.y + (sprite.width / 2);
    collision = "top";
  }
  //Right
  if (sprite.x + (sprite.width / 2) > container.width)
  {
    sprite.x = container.width - (sprite.width / 2);
    collision = "right";
  }
  //Bottom
  if (sprite.y + (sprite.height / 2) > container.height) 
  {
    sprite.y = container.height - (sprite.height / 2);
    collision = "bottom";
  }
  //Return the `collision` value
  return collision;
}


//The `randomInt` helper function
function randint(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function keyboard(value) 
{
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  //The `downHandler`
  key.downHandler = event => 
  {
    if (event.key === key.value) 
    {
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => 
  {
    if (event.key === key.value) 
    {
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => 
  {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}

function sansSerifStyle(size = 36,colour = "white",wrap = -1)
{
    let out = 
    {
        fontFamily: "sans-serif",
        fontSize: size,
        fill: colour,
        //stroke: '#000000',
        //strokeThickness: 1,
    }
    if(wrap >= 0)
    {
        out.wordWrap = true;
        out.wordWrapWidth = wrap;
    }
    return new PIXI.TextStyle(out)
}

function format(x,fixed = false)
{
	//var abb = ["","K","M","B","T","q","Q","s","S","O","N","d","U","D"]
	var lay = x.layer
	var mag = x.mag
	if(x.equals(0)) return "0";
    if(x.lessThan(0)) return "-" + format(x.abs(),fixed);
	else if(x.lessThan(10))
	{
		//var dp = Math.pow(10,((Math.floor(Math.log10(mag)) - 2) * -1))
        if(fixed) return mag.toFixed(3)
		else return (Math.floor((mag * 1000)) / 1000) + "";
	}
    else if(x.lessThan(1000))
	{
        if(fixed) return mag.toFixed(2)
		else return (Math.floor((mag * 100)) / 100) + "";
    }
    else if(x.lessThan(1000000))
	{
        return Math.floor(mag)
    }
    else
    {
        if(lay == 0) mag = Math.log10(mag)
        var m = Math.pow(10,mag % 1)
        
        if(fixed) return m.toFixed(2) + "e" + Math.floor(mag)
        else return (Math.floor(m * 100) / 100) + "e" + Math.floor(mag)
    }
	/*else if(x.lessThan(new Decimal("1e" + (abb.length * 3))))
	{
		if(mag <= (abb.length * 3))
		{
			mag = Math.pow(10,mag)
			lay--;
		}
		var factor = Math.pow(10,Math.floor(Math.log10(mag) / 3) * 3);
		var dp = Math.pow(10,((Math.floor(Math.log10(x / factor)) - 2) * -1))
		return Math.floor((x / factor) * dp) / dp + abb[Math.log10(factor) / 3];
	}*/
}

function formatTime(x)
{
    if(x < 0) return "0s"
    var out = (Math.floor(x) % 60) + "s"
    if(x >= 60) out = (Math.floor(x / 60) % 60) + "m " + out
    if(x >= 3600) out = (Math.floor(x / 3600) % 24) + "h " + out
    if(x >= 86400) out = Math.floor(x / 86400) + "d " + out
    return out
}












































