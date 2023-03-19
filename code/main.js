let canvasSize = {width: 0, height: 0}

const textures = PIXI.Assets.load(["images/on.png","images/off.png","danidanijrs-font.ttf"])
    .then(function()
    {
        console.log("Textures Loaded");
        setup();
    });

window.addEventListener('resize', resize);
    
function resize()
{
        var h = 640;
        var width = window.innerWidth || document.body.clientWidth; 
        var height = window.innerHeight || document.body.clientHeight; 
        var ratio = height / h;
        var view = app.view;
    
        view.style.height = (h * ratio) + "px";
        var newWidth = (width / ratio);
        view.style.width = width + "px";
        
        app.renderer.resize(newWidth , h);
    
        canvasSize.width = newWidth
        canvasSize.height = h
        console.log(canvasSize)
}

function dev()
{
    console.info("The dev function has been called")
    
    unlock("pr2")
    unlock("ug2")
    unlock("ug1autobuyer")
    unlock("kuaraniai")
    player.pr2.bought = new Decimal (3)
    player.prai = new Decimal(500)
    player.kuaraniai = new Decimal(1e6)
}

function setup()
{   
    resize();
    app.ticker.maxFPS = 60

    //header
    pointsDisplay = new PIXI.Text("0.000",danidanijrStyle())
    pointsDisplay.position.set(0, 5)
    app.stage.addChild(pointsDisplay);
    
    fpsDisplay = new PIXI.Text("0 FPS",danidanijrStyle(36,"yellow"))
    fpsDisplay.position.set(480,5)
    fpsDisplay.anchor.set(0.5,0)
    app.stage.addChild(fpsDisplay);
    
    speedDisplay = new PIXI.Text("Speed: 1",danidanijrStyle())
    speedDisplay.position.set(960,5)
    speedDisplay.anchor.set(1,0)
    app.stage.addChild(speedDisplay);
    
    tabContainer = new Container();
    
    tabs.generators = new TabButton("Generators",function(){switchTab("generators")},0xBBBBBB,0x000000,0xFFFFFF,true)
    tabs.generators.position.set(24,60)
    tabContainer.addChild(tabs.generators);
    
    tabs.options = new TabButton("Options",function(){switchTab("options")},0xBBBBBB,0x000000,0xFFFFFF)
    tabs.options.position.set(24 + tabContainer.width + 4,60)
    tabContainer.addChild(tabs.options);
    
    tabs.stats = new TabButton("Stats",function(){switchTab("stats")},0xBBBBBB,0x000000,0xFFFFFF)
    tabs.stats.position.set(24 + tabContainer.width + 4,60)
    tabContainer.addChild(tabs.stats);
    
    tabs.kuaraniai = new TabButton("Kuaraniai",function(){switchTab("kuaraniai")},0x2216FF,0xB9B6F9,0xFFB2FC)
    tabs.kuaraniai.position.set(24 + tabContainer.width + 4,60)
    tabs.kuaraniai.visible = false
    tabContainer.addChild(tabs.kuaraniai);
    
    app.stage.addChild(tabContainer);
    
    //generator tab
    generatorsTab = new Container()
    app.stage.addChild(generatorsTab)
    
    ug1 = new UpgradeButton([{text: "Upgrade\nSpeed"}],function(){buyUg1()},0xBBBBBB)
    ug1.position.set(48,375);
    generatorsTab.addChild(ug1);
    
    ug1Info = new PIXI.Text("info about upgrade 1",danidanijrStyle(24))
    ug1Info.position.set(48,291);
    generatorsTab.addChild(ug1Info);
    
    ug1autobuyer = new TickBox("Enable UG1 autobuyer?",function() {player.ug1.autobuyer = ug1autobuyer.getState()},false);
    ug1autobuyer.position.set(48,440);
    ug1autobuyer.visible = false;
    generatorsTab.addChild(ug1autobuyer);
    
    pr1 = new UpgradeButton([{text: "Requires: " + format(new Decimal(1e6)) + "\nResets Your\nProgress, But Gain A Boost"}],function(){prestige("pr1")},0xBBBBBB)
    pr1.position.set(48,500);
    generatorsTab.addChild(pr1)
    
    praiDisplay = new PIXI.Text("",danidanijrStyle(24))
    praiDisplay.position.set(48,590);
    generatorsTab.addChild(praiDisplay);
    
    praiTime = new PIXI.Text("",danidanijrStyle(24))
    praiTime.position.set(48,620);
    generatorsTab.addChild(praiTime);
    
    pr1autobuyer = new TickBox("Enable PR1 autobuyer?",function() {player.pr1autobuyer = pr1autobuyer.getState()},false);
    pr1autobuyer.position.set(48,650);
    pr1autobuyer.visible = false;
    generatorsTab.addChild(pr1autobuyer);
    
    pr1autobuyerThresholdButton = new Button("Change Threshold",function(){player.pr1threshhold = new Decimal(prompt("Enter the new theshold where the pr1autobuyer will pr1","1"))})
    pr1autobuyerThresholdButton.position.set(48,680)
    pr1autobuyerThresholdButton.visible = false
    generatorsTab.addChild(pr1autobuyerThresholdButton);
    
    pr1autobuyerThresholdText = new PIXI.Text("PRai threshold: 1",danidanijrStyle(30))
    pr1autobuyerThresholdText.position.set(263,690)
    pr1autobuyerThresholdText.visible = false
    generatorsTab.addChild(pr1autobuyerThresholdText);
    
    featureText = new PIXI.Text("",danidanijrStyle(24,"#ff9b96"))
    featureText.position.set(480,150);
    featureText.anchor.set(0.5,0)
    generatorsTab.addChild(featureText);
    
    featureProgress = new PIXI.Text("",danidanijrStyle(48,"#ff9b96"))
    featureProgress.position.set(480,178);
    featureProgress.anchor.set(0.5,0)
    generatorsTab.addChild(featureProgress);
    
    pr2 = new UpgradeButton([{text: "Requires: 10 PRai"},{text: "Reset ALL Your progress, But gain a new upgrade and a PR1 Muti that scales with your PTS.",style: sansSerifStyle(18,"black",300)}],function(){prestige("pr2")},0xBBBBBB)
    pr2.position.set(602,500);
    pr2.visible = false;
    generatorsTab.addChild(pr2)
    
    ug2 = new UpgradeButton([{text: "Decrease\nSpeed Cost"}],function(){buyUg2()},0xBBBBBB)
    ug2.position.set(602,375);
    ug2.visible = false
    generatorsTab.addChild(ug2);
    
    ug2Info = new PIXI.Text("info about upgrade 2",danidanijrStyle(24))
    ug2Info.position.set(602,319);
    ug2Info.anchor.set(0,0);
    ug2Info.visible = false
    generatorsTab.addChild(ug2Info);
    
    ug2autobuyer = new TickBox("Enable UG2 autobuyer?",function() {player.ug2.autobuyer = ug2autobuyer.getState()},false);
    ug2autobuyer.position.set(602,440);
    ug2autobuyer.visible = false;
    generatorsTab.addChild(ug2autobuyer);
    
    softcapText = new PIXI.Text("(softcapped)",sansSerifStyle(48,"red"))
    softcapText.position.set(602,265);
    softcapText.anchor.set(0,0);
    softcapText.visible = false
    generatorsTab.addChild(softcapText);
    
    //options tab
    optionsTab = new Container();
    optionsTab.visible = false;
    app.stage.addChild(optionsTab)
    
    fullResetButton = new Button("FULL RESET",function() {hardReset()},0xED1515,0xC10303);
    fullResetButton.position.set(480 - (fullResetButton.width / 2), 580);
    //fullResetButton.anchor.set(0.5,0);
    optionsTab.addChild(fullResetButton);
    
    //stats tab
    statsTab = new Container();
    statsTab.visible = false;
    app.stage.addChild(statsTab)
    
    statsInfo = new PIXI.Text("stats",danidanijrStyle(24))
    statsInfo.position.set(480,180);
    statsInfo.anchor.set(0.5,0);
    statsTab.addChild(statsInfo)
    
    //kuaraniai tab
    kuaraniaiTab = new Container();
    kuaraniaiTab.visible = false
    app.stage.addChild(kuaraniaiTab)
    
    kuaraniaiShardUpgradeButtons = new KuaraniaiUpgradeSection(kuaraniaiShardUpgrades,"KShards")
    kuaraniaiShardUpgradeButtons.position.set(6,220)
    kuaraniaiTab.addChild(kuaraniaiShardUpgradeButtons)
    
    kuaraniaiShardsDisplay = new PIXI.Text("Kuaraniai Shards: 0",danidanijrStyle(36,"#EC97EF"))
    kuaraniaiShardsDisplay.position.set(6,185)
    kuaraniaiTab.addChild(kuaraniaiShardsDisplay);
    
    kuaraniaiShardsProdDisplay = new PIXI.Text("0/s",danidanijrStyle());
    kuaraniaiShardsProdDisplay.position.set(954,185);
    kuaraniaiShardsProdDisplay.anchor.set(1,0);
    kuaraniaiTab.addChild(kuaraniaiShardsProdDisplay);
    
    kuaraniaiPowerUpgradeButtons = new KuaraniaiUpgradeSection(kuaraniaiPowerUpgrades,"KPower")
    kuaraniaiPowerUpgradeButtons.position.set(6,470)
    kuaraniaiTab.addChild(kuaraniaiPowerUpgradeButtons)
    
    kuaraniaiPowerDisplay = new PIXI.Text("Kuaraniai Power: 0",danidanijrStyle(36,"#EC97EF"))
    kuaraniaiPowerDisplay.position.set(6,435)
    kuaraniaiTab.addChild(kuaraniaiPowerDisplay);
    
    kuaraniaiPowerProdDisplay = new PIXI.Text("0/s",danidanijrStyle());
    kuaraniaiPowerProdDisplay.position.set(954,435);
    kuaraniaiPowerProdDisplay.anchor.set(1,0);
    kuaraniaiTab.addChild(kuaraniaiPowerProdDisplay);
    
    kuaraniaiDisplay = new PIXI.Text("Kuaraniai: 0",danidanijrStyle(36,"#EC97EF"))
    kuaraniaiDisplay.position.set(6,100)
    kuaraniaiTab.addChild(kuaraniaiDisplay);
    
    kuaraniaiInfo = new PIXI.Text("Your Kuaraniai makes your points reduce UP1 scaled strength to 100%.",danidanijrStyle(18,"#EC97EF"))
    kuaraniaiInfo.position.set(6,142)
    kuaraniaiTab.addChild(kuaraniaiInfo);
    
    praiSacrificeInfo = new PIXI.Text("You need to have more than 1 PRai to sacrifice.",danidanijrStyle(24,"#EC97EF"))
    praiSacrificeInfo.position.set(954,100)
    praiSacrificeInfo.anchor.set(1,0);
    kuaraniaiTab.addChild(praiSacrificeInfo);
    
    praiSacrificeButton = new Button("Do a PRai sacrifice",function(){prestige("praiSac")},0x101EBA,0x5F6CFC);
    praiSacrificeButton.position.set(514,110)
    praiSacrificeButton.visible = false;
    kuaraniaiTab.addChild(praiSacrificeButton)
    
    tab = "generators"
    app.ticker.add(delta => gameLoop(delta));
    //dev()
}

var reccentFPS = []

function gameLoop(delta)
{ 
    updateScalingSoftcaps()
    player.kuaraniaiShards = player.kuaraniaiShards.add(calcProduction("KShards").divide(app.ticker.FPS));
    player.kuaraniaiPower = player.kuaraniaiPower.add(calcProduction("KPower").divide(app.ticker.FPS));
    player.ug2.cost = getUPGCosts(player.ug2.bought,"UPG2")
    player.ug1.cost = getUPGCosts(player.ug1.bought,"UPG1")
    player.speed = calcProduction("speed")
    pointsDisplay.text = format(player.number,true);
    fpsDisplay.text = Math.round(app.ticker.FPS) + " FPS"
    speedDisplay.text = format(calcProduction("number")) + "/s";
    player.number = player.number.add(calcProduction("number").divide(new Decimal(app.ticker.FPS)))
    player.stats.totalNumber = player.stats.totalNumber.add(calcProduction("number").divide(app.ticker.FPS))
    if(player.unlocked.has("ug1autobuyer") && player.ug1.autobuyer) buyUg1();
    if(player.unlocked.has("ug2autobuyer") && player.ug2.autobuyer) buyUg2();
    if(player.unlocked.has("pr1autobuyer") && player.pr1autobuyer && calcPRaiGain().greaterThan(player.pr1threshhold)) prestige("pr1");

    if(tab == "generators") generators(delta)
    else if(tab == "options") options(delta)
    else if (tab == "stats") stats(delta)
    else if (tab == "kuaraniai") kuaraniai(delta)
}

function generators(delta)
{
    
    if(player.unlocked.has("ug2")) ug1Info.text = "Cost reduction:" + format(player.ug1.reduction) + "\nUpgrade Speed, Need " + format(player.ug1.cost) + "\nYou bought this " + player.ug1.bought + " times";
    else ug1Info.text = "\nUpgrade Speed, Need " + format(player.ug1.cost) + "\nYou bought this " + player.ug1.bought + " times";
       
    praiDisplay.text = "You have " + format(player.prai) + " PRai which boosts your generation by x" + format(calcPRaiBoost(),player.kuaraniaiShardUpgrade >= 2);
    if(player.number.lessThan(1e6) || ((player.number.greaterThanOrEqualTo(1e6)) && player.pr2.bought.equals(0)))
    {
        praiTime.text = "It would take " + formatTime(new Decimal(1e6).minus(player.number).divide(player.speed.times(calcPRaiBoost()))) + " to get to " + format(new Decimal(1e6));
    }
    else praiTime.text = "You would gain " + format(calcPRaiGain()) + " PRai."
    
    ug1.update(player.number.greaterThanOrEqualTo(player.ug1.cost));
    pr1.update(player.number.greaterThanOrEqualTo(1e6));
    pr2.update(player.prai.greaterThanOrEqualTo(player.pr2.cost));
    
    if(player.unlocked.has("pr2")) 
        updatePr2Element();
    ug2.update(player.number.greaterThanOrEqualTo(player.ug2.cost));

    ug2Info.text = "Reduce cost: " + format(player.ug2.cost) + "\nYou bought this " + player.ug2.bought + " times"
    if(player.unlocked.has("ug2") && player.ug2.bought.gte(player.ug2.softcapStart)) softcapText.visible = true
    else softcapText.visible = false
    
    pr1autobuyerThresholdText.text = "Prai Threshhold: " + format(player.pr1threshhold);
    
    if(player.unlocking.has("pr2"))
    {
        if(player.prai.greaterThanOrEqualTo(10))
        {
            unlock("pr2")
        }
        featureText.style.color = "#ff9b96"
        featureProgress.style.color = "#ff9b96"
        featureText.text = "Reach 10 PRai to unlock PR2"
        featureProgress.text = format(player.prai) + " / 10"
    }
    else if(player.unlocking.has("kuaraniai"))
    {
        if(player.pr2.bought.gte(10))
        {
            unlock("kuaraniai")
        }
        featureText.style = danidanijrStyle(24,"#6812cc")
        featureProgress.style = danidanijrStyle(48,"#6812cc")
        featureText.text = "PR2 Reset 10 times to unlock Kuaraniai"
        featureProgress.text = format(player.pr2.bought) + " / 10"
    }
    else
    {
        featureText.text = ""
        featureProgress.text = ""
    }
}

function options(delta)
{
    
}

function stats(delta)
{
    var tex = "You have gained " + format(player.stats.totalNumber,true) + " points total.\nYou have bought " + format(player.stats.totalUg1bought) + " UP1 total.\nYou have gained " + format(player.stats.totalPrai) + " PRai total."
    if(player.unlocked.has("ug2")) tex = tex + "\nYou have bought " + format(player.stats.totalUg2bought) + " UP2 total.\nYou have PR2 reset " + format(player.stats.totalPr2bought) + " total."
    statsInfo.text = tex
}

function kuaraniai(delta)
{
    
    kuaraniaiDisplay.text = "Kuaraniai: " + format(player.kuaraniai)
    
    kuaraniaiShardsDisplay.text = "Kuaraniai Shards: " + format(player.kuaraniaiShards,true)
    
    let time = new Date().getTime()
    
    kuaraniaiShardsProdDisplay.style = danidanijrStyle(36,getRainbowColour())
    kuaraniaiShardsProdDisplay.y = 185 + Math.round(Math.cos(time * 0.003)) * 2
    kuaraniaiShardsProdDisplay.text = format(calcProduction("KShards"),true) + "/s"
    
    kuaraniaiPowerDisplay.text = "Kuaraniai Power: " + format(player.kuaraniaiPower,true)
    kuaraniaiPowerProdDisplay.style = danidanijrStyle(36,getRainbowColour(Math.PI))
    kuaraniaiPowerProdDisplay.y = 435 + Math.round(Math.cos(time * 0.003)) * 2
    kuaraniaiPowerProdDisplay.text = format(calcProduction("KPower"),true) + "/s"
    
    if(player.prai.equals(1))
    {
        praiSacrificeInfo.text = "You need to have more than 1 PRai to sacrifice.";
        praiSacrificeButton.visible = false
    }
    else
    {
        praiSacrificeInfo.text = "You'll gain " + format(calcKuaraniaiGain()) + " Kuaraniai\nbut to a PR2 reset.";
        praiSacrificeButton.visible = true
    }
    
}















































