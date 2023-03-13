class UpgradeButton extends PIXI.Container 
{
    constructor(writing, effect, colour = 0x666666, borderColour = 0x000000, w = 0, h = 0) 
    {
        super();
        this.writing = writing;
        this.effect = effect;
        this.colour = colour;
        this.borderColour = borderColour;
        this.w = w;
        this.h = h;

        this.brightness = 1;

        const texts = new PIXI.Container();
        this.texts = []
        for(const t of writing) 
        {
            let text = new PIXI.Text(t.text, t.style == undefined ? sansSerifStyle(24,"black") : t.style);
            if(t.x != undefined && t.y != undefined) 
                text.position.set(t.x,t.y);
            else 
                text.position.set(5,5 + texts.height);
            this.texts.push(text);
            texts.addChild(text);
        }

        const background = new PIXI.Graphics();
        background.lineStyle(4,borderColour,1);
        background.beginFill(colour);
        if(this.w == 0) 
            background.drawRect(0,0,texts.width + 10,texts.height + 10);
        else
            background.drawRect(0,0,this.w + 10,this.h + 10);
        background.endFill();
        this.addChild(background);

        this.addChild(texts);

        const filter = new PIXI.filters.ColorMatrixFilter();
        this.interactive = true;
        this.filters = [filter];

        this.on("pointerover", () => {
            filter.brightness(1.3 * this.brightness,false);
        });
        this.on("pointerout", () => {
            filter.brightness(1 * this.brightness,false);
        });

        this.on("mousedown", () => {
            filter.brightness(0.8 * this.brightness,false);
        });
                        
        this.on("mouseup", () => {
            filter.brightness(1 * this.brightness,false);
            this.effect();
        });
        }

    setBrightness(amount) 
    {
        this.brightness = amount;
        const filter = this.filters[0];
        filter.brightness(this.brightness,false);
    }

    update(afford) 
    {
        const filter = this.filters[0];
        if(afford && !this.interactive) 
        {
            this.interactive = true;
            filter.brightness(1 * this.brightness,false);
        } 
        else if(!afford && this.interactive) 
        {
            this.interactive = false;
            filter.brightness(0.6 * this.brightness,false);
        }
    }

    changeText(writing) 
    {
        for (let [index, elemmt] of writing.entries())
        {
            this.texts[index].text = writing[index].text;
            this.texts[index].style = writing[index].style
        }
    }
}

/*function UpgradeButton(writing,effect,colour = 0x666666,borderColour = 0x000000,w = 0,h = 0)
{
    PIXI.Container.call(this);
    
    this.writing = writing
    this.effect = effect
    this.colour = colour
    this.borderColour = borderColour
    this.w = w
    this.h = h
    
    this.brightness = 1
    
    var texts = new Container()
    for(var t of writing)
    {
        let text = new PIXI.Text(t.text, t.style == undefined ? sansSerifStyle(24,"black") : t.style)
        if(t.x != undefined && t.y != undefined) text.position.set(t.x,t.y)
        else text.position.set(5,5 + texts.height)
        this.text = text
        texts.addChild(text)
    }
    
    let background = new Graphics()
    background.lineStyle(4,borderColour,1)
    background.beginFill(colour)
    if(this.w == 0) background.drawRect(0,0,texts.width + 10,texts.height + 10)
    else background.drawRect(0,0,this.w + 10,this.h + 10)
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
        filter.brightness(1.3 * this.brightness,false)
    });
    this.on("pointerout",function() 
    {
        filter.brightness(1 * this.brightness,false)
    });
    
    this.on("mousedown",function() 
    {
        filter.brightness(0.8 * this.brightness,false)
    });
                    
    this.on("mouseup",function() 
    {
        filter.brightness(1 * this.brightness,false)
        this.effect()
    })
    
    //background.pivot.set(this.width / 2,this.height / 2)
    //text.anchor.set(0.5,0.5)
}
UpgradeButton.prototype = Object.create(PIXI.Container.prototype);

UpgradeButton.prototype.setBrightness = function(amount)
{
    this.brightness = amount
    
    var filter = this.filters[0]
    filter.brightness(this.brightness,false)
}

UpgradeButton.prototype.update = function(afford)
{
    var filter = this.filters[0]
    if(afford && !this.interactive)
    {
        this.interactive = true;
        filter.brightness(1 * this.brightness,false)
    }
    else if(!afford && this.interactive)
    {
        this.interactive = false;
        filter.brightness(0.6 * this.brightness,false)
    }
}

UpgradeButton.prototype.changeText = function(writing)
{
    this.removeChildren();
    let texts = new Container()
    for(let t of writing)
    {
        let text = new PIXI.Text(t.text, t.style == undefined ? sansSerifStyle(24,"black") : t.style)
        text.position.set(5,5 + texts.height)
        this.text = text
        texts.addChild(text)
    }

    let background = new Graphics()
    background.lineStyle(4,this.borderColour,1)
    background.beginFill(this.colour)
    if(this.w == 0) background.drawRect(0,0,texts.width + 10,texts.height + 10)
    else background.drawRect(0,0,this.w + 10,this.h + 10)
    background.endFill()

    this.addChild(background)
    this.addChild(texts)
}
*/






















