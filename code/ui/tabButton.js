function TabButton(writing,effect,colour,borderColour,selBorderColour,drawAsSelected = false)
{
    PIXI.Container.call(this);
    
    this.writing = writing
    this.effect = effect
    this.colour = colour
    this.borderColour = borderColour
    this.selBorderColour = selBorderColour
    
    if(drawAsSelected) this.draw(writing,colour,selBorderColour)
    else this.draw(writing,colour,borderColour)
    
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
}
TabButton.prototype = Object.create(PIXI.Container.prototype);

TabButton.prototype.draw = function(writing,colour,borderColour)
{
    this.removeChildren()
    
    //console.log(writing == null)
    if(writing == null) writing = this.writing
    
    let text = new PIXI.Text(writing,sansSerifStyle(24,"black"))
    text.position.set(5,5)
    this.text = text
    
    let background = new Graphics()
    background.lineStyle(4,borderColour,1)
    background.beginFill(colour)
    background.drawRect(0,0,text.width + 10,text.height + 10)
    background.endFill()
    this.addChild(background)

    this.addChild(text)
    
    this.text.text = writing;
}