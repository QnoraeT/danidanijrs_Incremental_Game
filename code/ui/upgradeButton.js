function UpgradeButton(writing,effect,colour = 0x666666)
{
    PIXI.Container.call(this);
    
    this.writing = writing
    this.effect = effect
    this.colour = colour
    
    var texts = new Container()
    for(var t of writing)
    {
        let text = new PIXI.Text(t.text, t.style == undefined ? sansSerifStyle(24,"black") : t.style)
        text.position.set(5,5 + texts.height)
        this.text = text
        texts.addChild(text)
    }
    
    let background = new Graphics()
    background.lineStyle(4,0x000000,1)
    background.beginFill(colour)
    background.drawRect(0,0,texts.width + 10,texts.height + 10)
    background.endFill()
    this.addChild(background)
    
    this.addChild(texts)
    
    
    //let text = new PIXI.Text(writing,sansSerifStyle(24,"black"))
    //text.position.set(5,5)
    //this.text = text
   //this.addChild(text)
    
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
UpgradeButton.prototype = Object.create(PIXI.Container.prototype);

UpgradeButton.prototype.update = function(afford)
{
    var filter = this.filters[0]
    if(afford && !this.interactive)
    {
        this.interactive = true;
        filter.brightness(1,false)
    }
    else if(!afford && this.interactive)
    {
        this.interactive = false;
        filter.brightness(0.6,false)
    }
}

UpgradeButton.prototype.changeText = function(writing)
{
    this.removeChildren();
    var texts = new Container()
    for(var t of writing)
    {
        let text = new PIXI.Text(t.text, t.style == undefined ? sansSerifStyle(24,"black") : t.style)
        text.position.set(5,5 + texts.height)
        this.text = text
        texts.addChild(text)
    }
    
    let background = new Graphics()
    background.lineStyle(4,0x000000,1)
    background.beginFill(this.colour)
    background.drawRect(0,0,texts.width + 10,texts.height + 10)
    background.endFill()
    this.addChild(background)
    
    this.addChild(texts)
    
}
























