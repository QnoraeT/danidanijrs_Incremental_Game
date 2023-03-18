class KuaraniaiUpgradeSection extends PIXI.Container 
{
    constructor(data, currName, at = 0) 
    {
      super();
      
      this.sprites = [];
      this.data = data;
      this.at = at;
      this.currName = currName;
      
      // fills up the row pool
      this.rowPool = [];
      for (let a = 0; a < 6; a++) 
      {
        const sprite = this.addSprite(this.at + a);
        sprite.setBrightness(1 - a * 0.18);
        sprite.x = a * 160;
        sprite.interactive = a === 0;
      }
    }
  
    addSprite(x) 
    {
      const data = this.data[x];
      if (data !== null && data !== undefined) 
      {
        let textSize = 24;
        while (textSize > 12) {
          const text = new PIXI.Text(data.desc, sansSerifStyle(textSize, "white", 140));
          if (text.height > 85) textSize--;
          else break;
        }
  
        const button = new UpgradeButton(
          [
            { text: data.desc, style: sansSerifStyle(textSize, "white", 140) },
            { text: "Cost: " + format(data.cost) + " " + this.currName, style: sansSerifStyle(14), x: 5, y: 135 },
          ],
          data.effect === undefined ? function() {} : data.effect,
          data.colour,
          data.borderColour,
          140,
          144
        );
        this.sprites.push(button);
        this.addChild(button);
        return button;
      }
      return null;
    }
  
    setPosition(pos) 
    {
      if (pos < 0) return;
      this.at = pos;
      this.sprites = [];
      this.removeChildren();
      
      for (let a = 0; a < 6; a++) {
        const sprite = this.addSprite(this.at + a);
        if (sprite !== null) {
          sprite.setBrightness(1 - a * 0.18);
          sprite.x = a * 160;
          sprite.interactive = a === 0;
        }
      }
    }
  
    showNext() 
    {
      this.at++;
      // removes old sprite
      this.removeChild(this.sprites[0]);
      this.sprites.splice(0, 1);
      // creates new sprite
      this.addSprite(this.at + 6);
      // repostions the sprites
      let a = 0;
      for (const sprite of this.sprites) {
        sprite.x = a * 158;
        sprite.setBrightness(1 - a * 0.18);
        sprite.interactive = a === 0;
        a++;
      }
    }
  }

/*
function KuaraniaiUpgradeSection(data,currName,at = 0)
{
    PIXI.Container.call(this);
    
    this.sprites = []
    this.data = data
    this.at = at
    this.currName = currName
    
    //fills up the row pool
    this.rowPool =  []
    for(var a = 0 ; a < 6 ; a++)
    {
        let sprite = this.addSprite(this.at + a)
        sprite.setBrightness(1 - (a * 0.18))
        sprite.x = a * 160
        sprite.interactive = (a == 0)
    }
}
KuaraniaiUpgradeSection.prototype = Object.create(PIXI.Container.prototype);

KuaraniaiUpgradeSection.prototype.addSprite = function(x)
{
    let data = this.data[x]
    if(data != null)
    {
        let textSize = 24 
        while(textSize > 12)
        {
            let text = new PIXI.Text(data.desc, sansSerifStyle(textSize,"white",140))
            if(text.height > 85) textSize--;
            else break;
        }
        
        //let curr = null
        //if(this.currName == "KShards") curr = player.kuaraniaiShards
        //else if(this.currName == "KPower") curr = player.kuaraniaiPower
        
        /*if(data.effect == undefined) data.effect = function()
        {
            if((this.currName == "KShards" && player.kuaraniaiShards.greaterThanOrEqualTo(data.cost))
              || (this.currName == "KPower" && player.kuaraniaiPower.greaterThanOrEqualTo(data.cost)))
            {
                if(this.currName == "KShards") player.kuaraniaiShards = player.kuaraniaiShards.minus(data.cost);
                else if(this.currName == "KPower") player.kuaraniaiPower = player.kuaraniaiPower.minus(data.cost)
                this.showNext()
            }
        }
        else data.effect = function()
        {

            if((this.currName == "KShards" && player.kuaraniaiShards.greaterThanOrEqualTo(data.cost))
              || (this.currName == "KPower" && player.kuaraniaiPower.greaterThanOrEqualTo(data.cost)))
            {
                if(this.currName == "KShards") player.kuaraniaiShards = player.kuaraniaiShards.minus(data.cost);
                else if(this.currName == "KPower") player.kuaraniaiPower = player.kuaraniaiPower.minus(data.cost)
                this.showNext()
                data.effect()
            }
        }*/
    /*
        let button = new UpgradeButton([{text: data.desc,style: sansSerifStyle(textSize,"white",140)},{text: "Cost: " + format(data.cost) + " " + this.currName,style:  sansSerifStyle(14),x: 5,y: 135 }],data.effect == undefined ? function(){} : data.effect,data.colour,data.borderColour,140,144)
        this.sprites.push(button)
        this.addChild(button)
        return button;
    }
    return null
}

KuaraniaiUpgradeSection.prototype.setPosition = function(pos)
{
    if(pos < 0) return;
    this.at = pos
    this.sprites = []
    this.removeChildren()
    
    for(var a = 0 ; a < 6 ; a++)
    {
        let sprite = this.addSprite(this.at + a)
        if(sprite != null)
        {
            sprite.setBrightness(1 - (a * 0.18))
            sprite.x = a * 160
            sprite.interactive = (a == 0)
        }
    }
}

KuaraniaiUpgradeSection.prototype.showNext = function()
{
    this.at++;
    //removes old sprite
    this.removeChild(this.sprites[0])
    this.sprites.splice(0,1)
    //creates new sprite
    this.addSprite(this.at + 6)
    //repostions the sprites
    var a = 0;
    for(sprite of this.sprites)
    {
        sprite.x = a * 158
        sprite.setBrightness(1 - (a * 0.18))
        sprite.interactive = (a == 0)
        a++;
    }
}
*/









































