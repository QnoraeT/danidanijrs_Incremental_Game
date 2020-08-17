//the codes layout and a little bit of the actual code is from kittykatattacks learning pixi.js tutorial i also used pixi.js and collections.js

//alise
let Resources = PIXI.Loader.shared.resources
let Loader = PIXI.Loader.shared
let TextureCache = PIXI.utils.TextureCache
let Sprite = PIXI.Sprite
let Container = PIXI.Container
let Graphics = PIXI.Graphics

//varibles that will be used all over
let pointsDisplay,fpsDisplay,speedDisplay,ug1,ug1Info,pr1,praiDisplay,praiTime,featureText,featureProgress,pr2,ug2,ug2Info; 
var inputs = {};

//player varibles
var player =
{
    number: new Decimal(0),
    speed: new Decimal(1),
    generaters:
    {
        ug1: 
        {
            cost: new Decimal(5),
            brought: 0,
            reduction: new Decimal(1),
        },
    },
    prai: new Decimal(1),
    praiBoost: new Decimal(1),
    unlocking: new List(),
    pr2:
    {
        cost: new Decimal(10),
        brought: 0,
    },
    ug2:
    {
        cost: new Decimal(100000),
        brought: 0
    }
}

let app = new PIXI.Application({width: 960, height: 720});
document.body.appendChild(app.view);
var tab = null;

//Loader.add().load(setup);
setup();

function dev()
{
    player.prai = new Decimal(10)
    player.unlocking.push("pr2")
}

function setup()
{   
    //header
    pointsDisplay = new PIXI.Text("0.000",sansSerifStyle())
    app.stage.addChild(pointsDisplay);
    
    fpsDisplay = new PIXI.Text("0 FPS",sansSerifStyle(36,"yellow"))
    fpsDisplay.position.set(480,0)
    fpsDisplay.anchor.set(0.5,0)
    app.stage.addChild(fpsDisplay);
    
    speedDisplay = new PIXI.Text("Speed: 1",sansSerifStyle())
    speedDisplay.position.set(960,0)
    speedDisplay.anchor.set(1,0)
    app.stage.addChild(speedDisplay);
    
    //generator tab
    generatorTab = new Container()
    app.stage.addChild(generatorTab)
    
    ug1 = new Button("Upgrade\nSpeed",function()
    {
        if(player.number.greaterThan(player.generaters.ug1.cost))
        {
            player.number = player.number.minus(player.generaters.ug1.cost);
            player.generaters.ug1.brought++;
            if(player.generaters.ug1.brought >= 15)
            {
                if(player.generaters.ug1.brought == 15) this.changeText("Upgrade\nXScaled Speed")
                player.generaters.ug1.cost = player.generaters.ug1.cost.multiply(1.55);
                var a = player.generaters.ug1.brought
                player.generaters.ug1.cost = player.generaters.ug1.cost.multiply(1 + (((a - (15 - 1)) / (Math.sqrt(a * 5) + Math.log10(a))) * (1 / 2)));
                /*for(var a = 0 ; a < player.generaters.ug1.brought + 1; a++)
                {
                    if(a >= 15)
                    {
                        player.generaters.ug1.cost = player.generaters.ug1.cost.multiply(1 + (((a - (15 - 1)) / (Math.sqrt(a * 5) + Math.log10(a))) * (1 / 2)));
                    }
                }*/
            }
            else
            {
                player.generaters.ug1.cost = player.generaters.ug1.cost.multiply(1.55);
            }
            player.speed = player.speed.multiply(1.5)
        }
    },0xBBBBBB)
    ug1.position.set(48,400);
    generatorTab.addChild(ug1);
    
    ug1Info = new PIXI.Text("info about upgrade 1",sansSerifStyle(24))
    ug1Info.position.set(48,344);
    generatorTab.addChild(ug1Info);
    
    pr1 = new Button("Requires: " + format(new Decimal(1e6)) + "\nResets Your\nProgress, But Gain A Boost",function()
    {
        if(player.number.greaterThanOrEqualTo(1e6))
        {
            player.prai = player.prai.add(calcPRaiGain());
            player.praiBoost = player.prai.minus(0.75).times(4);
            player.number = new Decimal(0)
            player.speed = new Decimal(1)
            player.generaters =
            {
                ug1: 
                {
                    cost: new Decimal(5),
                    brought: 0
                },
            }
            player.ug2 =
            {   
                cost: new Decimal(100000),
                brought: 0
            }
            if(player.prai.greaterThanOrEqualTo(3) && !player.unlocking.has("pr2") && !pr2.visible) player.unlocking.push("pr2")
        }
    },0xBBBBBB,310,90)
    pr1.position.set(48,500);
    generatorTab.addChild(pr1)
    
    praiDisplay = new PIXI.Text("",sansSerifStyle(24))
    praiDisplay.position.set(48,600);
    generatorTab.addChild(praiDisplay);
    
    praiTime = new PIXI.Text("",sansSerifStyle(24))
    praiTime.position.set(48,630);
    generatorTab.addChild(praiTime);
    
    featureText = new PIXI.Text("",sansSerifStyle(24,"#ff9b96"))
    featureText.position.set(480,150);
    featureText.anchor.set(0.5,0)
    generatorTab.addChild(featureText);
    
    featureProgress = new PIXI.Text("",sansSerifStyle(48,"#ff9b96"))
    featureProgress.position.set(480,178);
    featureProgress.anchor.set(0.5,0)
    generatorTab.addChild(featureProgress);
    
    pr2 = new UpgradeButton([{text: "Requires: 10 PRai"},{text: "Reset ALL Your progress, But gain a new upgrade and a PR1 Muti that scales with your PTS.",style: sansSerifStyle(18,"black",300)}],function()
    {
        if(player.prai.greaterThanOrEqualTo(player.pr2.cost))
        {
            player.prai = new Decimal(1)
            player.praiBoost = new Decimal(1)
            player.number = new Decimal(0)
            player.pr2.brought++
            player.pr2.cost = player.pr2.cost.add((player.pr2.brought * 10) + 10)
            
            player.generaters =
            {
                ug1: 
                {
                    cost: new Decimal(5),
                    brought: 0
                },
            }
            
            pr2.changeText([{text: "Requires: " + format(player.pr2.cost) + " PRai"},{text: "Reset ALL Your progress, But gain muti to PR1 and a Speed autobuyer.",style: sansSerifStyle(18,"black",300)}])
            ug2.visible = true;
            ug2Info.visible = true;
        }
    },0xBBBBBB)
    pr2.position.set(912 - pr2.width ,500);
    //pr2.anchor.set(1,0); anchor wont work for some reason
    pr2.visible = false;
    generatorTab.addChild(pr2)
    
    ug2 = new Button("Decrease\nSpeed Cost",function()
    {
        if(player.number.greaterThan(player.ug2.cost))
        {
            player.number = player.number.minus(player.ug2.cost);
            player.ug2.brought++;
            
            //cost scaling
            player.ug2.cost = player.ug2.cost.multiply(1.4);
            if(player.ug2.brought >= 15)
            {
                if(player.generaters.ug1.brought == 15) this.changeText("Decrease\nXScaled Speed Cost")
                //player.generaters.ug1.cost = player.generaters.ug1.cost.multiply(1.55);
                var a = player.ug2.brought
                player.ug2.cost = player.ug2.cost.multiply(1 + (((a - (15 - 1)) / (Math.sqrt(a * 5) + Math.log10(a))) * (1)));
                /*for(var a = 0 ; a < player.generaters.ug1.brought + 1; a++)
                {
                    if(a >= 15)
                    {
                        player.generaters.ug1.cost = player.generaters.ug1.cost.multiply(1 + (((a - (15 - 1)) / (Math.sqrt(a * 5) + Math.log10(a))) * (1 / 2)));
                    }
                }*/
            }
           // else
        //    {
        //        player.generaters.ug1.cost = player.generaters.ug1.cost.multiply(1.55);
        //    }
            player.generaters.ug1.cost = player.generaters.ug1.cost.divide(1.2)
        }
    },0xBBBBBB)
    ug2.position.set(912 - ug2.width,400);
    ug2.visible = false
    generatorTab.addChild(ug2);
    
    ug2Info = new PIXI.Text("info about upgrade 2",sansSerifStyle(24))
    ug2Info.position.set(912 - ug2Info.width,344);
    ug2Info.visible = false
    generatorTab.addChild(ug2Info);
    
    tab = generators
    app.ticker.add(delta => gameLoop(delta));
}

function calcPRaiGain()
{
    if(player.pr2.brought == 0) return new Decimal(1)
    else return Decimal.root(player.number.divide(1e6),4)
}

function gameLoop(delta)
{
    pointsDisplay.text = format(player.number,true);
    fpsDisplay.text = Math.round(app.ticker.FPS) + " FPS"
    speedDisplay.text = "Speed: " + format(player.speed.times(player.praiBoost));
    
    player.number = player.number.add((player.speed.times(player.praiBoost)).divide(new Decimal(app.ticker.FPS)))
    tab(delta)
}

function generators(delta)
{
    ug1Info.text = "Upgrade Speed, Need " + format(player.generaters.ug1.cost) + "\nYou brought this " + player.generaters.ug1.brought + " times";
    praiDisplay.text = "You have " + format(player.prai) + " PRai which boosts your generation by x" + format(player.praiBoost);
    if(player.number.lessThan(1e6) || ((player.number.greaterThanOrEqualTo(1e6)) && player.pr2.brought == 0))
    {
        praiTime.text = "It would take " + formatTime(new Decimal(1e6).minus(player.number).divide(player.speed.times(player.praiBoost))) + " to get to " + format(new Decimal(1e6));
    }
    else praiTime.text = "You would gain " + format(calcPRaiGain()) + " PRai."
    
    pr2.update(player.prai.greaterThanOrEqualTo(player.pr2.cost));
    
    ug2Info.text = "Reduce cost: " + format(player.ug2.cost) + "\nYou brought this " + player.ug2.brought + " times"
    
    
    if(player.unlocking.has("pr2"))
    {
        if(player.prai.greaterThanOrEqualTo(10))
        {
            player.unlocking.delete("pr2")
            pr2.visible = true
        }
        featureText.text = "Reach 10 PRai to unlock PR2"
        featureProgress.text = format(player.prai) + " / 10"
    }
    else
    {
        featureText.text = ""
        featureProgress.text = ""
    }
}















































