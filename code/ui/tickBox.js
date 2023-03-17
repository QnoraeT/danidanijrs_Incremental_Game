class TickBox extends PIXI.Container 
{
    constructor(writing, effect, state) 
    {
      super();
      
      this.writing = writing;
      
      let png = state ? "images/on.png" : "images/off.png";
      const texture = PIXI.Assets.get(png);
      this.box = new PIXI.Sprite(texture);
      this.box.effect = effect;
      this.box.bstate = state;
  
      this.addChild(this.box);
      
      this.text = new PIXI.Text(writing, sansSerifStyle(24));
      this.text.position.set(26, 0);
      this.addChild(this.text);
      
      this.box.interactive = true;
      var filter = new PIXI.filters.ColorMatrixFilter();
      this.box.filters = [filter];
      
      this.box.on("pointerover", () => {
          filter.brightness(1.3, false);
      });
      this.box.on("pointerout", () => {
          filter.brightness(1, false);
      });
      
      this.box.on("mousedown", () => {
          filter.brightness(0.8, false);
      });
                      
      this.box.on("mouseup", () => 
      {
          filter.brightness(1, false);
          this.box.bstate = !this.box.bstate;
          if(this.box.bstate) 
            this.box.texture = PIXI.utils.TextureCache["images/on.png"];
          else 
            this.box.texture = PIXI.utils.TextureCache["images/off.png"];
          
          this.box.effect();
      });
    }
    
    getState() 
    {
      return this.box.bstate;
    }
    
    setState(state) 
    {
      this.box.bstate = state;
      if(state) this.box.texture = PIXI.utils.TextureCache["images/on.png"];
      else this.box.texture = PIXI.utils.TextureCache["images/off.png"];
    }
    
    changeText(writing) 
    {
      this.text.text = writing;
    }
}
/*
function TickBox(writing,effect,state)
{
    PIXI.Container.call(this);
    
    this.writing = writing
    
    let png = state ? "images/on.png" : "images/off.png"
    this.box = new Sprite(Resources[png].texture)
    this.box.effect = effect
    this.box.bstate = state

    this.addChild(this.box)
    
    this.text = new PIXI.Text(writing,sansSerifStyle(24))
    this.text.position.set(26,0)
    //this.text = text
    this.addChild(this.text)
    
    this.box.interactive = true;
    var filter = new PIXI.filters.ColorMatrixFilter();
    this.box.filters = [filter]
    
    this.box.on("pointerover",function() 
    {
        filter.brightness(1.3,false)
    });
    this.box.on("pointerout",function() 
    {
        filter.brightness(1,false)
    });
    
    this.box.on("mousedown",function() 
    {
        filter.brightness(0.8,false)
    });
                    
    this.box.on("mouseup",function() 
    {
        filter.brightness(1,false)
        this.bstate = !this.bstate
        if(this.bstate) this.texture = PIXI.utils.TextureCache["images/on.png"];
        else this.texture = PIXI.utils.TextureCache["images/off.png"];
        
        this.effect()
    })
    
    //background.pivot.set(this.width / 2,this.height / 2)
    //text.anchor.set(0.5,0.5)
}
TickBox.prototype = Object.create(PIXI.Container.prototype);

TickBox.prototype.getState = function()
{
    return this.box.bstate;
}

TickBox.prototype.setState = function(state)
{
    this.box.bstate = state
    if(state) this.box.texture = PIXI.utils.TextureCache["images/on.png"];
    else this.box.texture = PIXI.utils.TextureCache["images/off.png"];
}

TickBox.prototype.changeText = function(writing)
{
    this.text.text = writing;
}
*/
