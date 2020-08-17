function Button(writing,effect,colour = 0x666666,w = 200,h = 60)
{
    PIXI.Container.call(this);
    
    this.writing = writing
    this.effect = effect
    this.colour = colour
    
    let background = new Graphics()
    background.lineStyle(4,0x000000,1)
    background.beginFill(colour)
    background.drawRect(0,0,w,h)
    background.endFill()
    this.addChild(background)
    
    let text = new PIXI.Text(writing,sansSerifStyle(24,"black"))
    text.position.set(5,5)
    this.text = text
    this.addChild(text)
    
    this.interactive = true;
    var filter = new PIXI.filters.ColorMatrixFilter();
    this.filters = [filter]
    
    this.on("pointerover",function() 
    {
        filter.brightness(1.3,false)
    });
    this.on("pointerout",function() 
    {
        filter.brightness(1,false)
    });
    
    this.on("mousedown",function() 
    {
        filter.brightness(0.8,false)
    });
                    
    this.on("mouseup",function() 
    {
        filter.brightness(1,false)
        this.effect()
    })
    
    //background.pivot.set(this.width / 2,this.height / 2)
    //text.anchor.set(0.5,0.5)
}
Button.prototype = Object.create(PIXI.Container.prototype);

Button.prototype.changeText = function(writing)
{
    this.text.text = writing;
}