//the codes layout and a little bit of the actual code is from kittykatattacks learning pixi.js tutorial i also used pixi.js and collections.js


Loader.add(["images/on.png","images/off.png"]).load(setup);

function dev()
{
    unlock("pr2")
    unlock("ug2")
    unlock("ug1autobuyer")
    player.pr2.brought = 3
    player.prai = new Decimal(500)
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
    
    tabs.kauraniai = new TabButton("Kauraniai",function(){switchTab("kauraniai")},0x2216FF,0xB9B6F9,0xFFB2FC)
    tabs.kauraniai.position.set(24 + tabContainer.width + 4,60)
    tabs.kauraniai.visible = false
    tabContainer.addChild(tabs.kauraniai);
    
    app.stage.addChild(tabContainer);
    
    //generator tab
    generatorsTab = new Container()
    app.stage.addChild(generatorsTab)
    
    ug1 = new UpgradeButton([{text: "Upgrade\nSpeed"}],function(){buyUg1()},0xBBBBBB)
    ug1.position.set(48,375);
    generatorsTab.addChild(ug1);
    
    ug1Info = new PIXI.Text("info about upgrade 1",sansSerifStyle(24))
    ug1Info.position.set(48,291);
    generatorsTab.addChild(ug1Info);
    
    ug1autobuyer = new TickBox("Enable UG1 autobuyer?",function() {player.ug1.autobuyer = ug1autobuyer.getState()},false);
    ug1autobuyer.position.set(48,440);
    ug1autobuyer.visible = false;
    generatorsTab.addChild(ug1autobuyer);
    
    pr1 = new UpgradeButton([{text: "Requires: " + format(new Decimal(1e6)) + "\nResets Your\nProgress, But Gain A Boost"}],function(){prestige("pr1")},0xBBBBBB)
    pr1.position.set(48,500);
    generatorsTab.addChild(pr1)
    
    praiDisplay = new PIXI.Text("",sansSerifStyle(24))
    praiDisplay.position.set(48,600);
    generatorsTab.addChild(praiDisplay);
    
    praiTime = new PIXI.Text("",sansSerifStyle(24))
    praiTime.position.set(48,630);
    generatorsTab.addChild(praiTime);
    
    featureText = new PIXI.Text("",sansSerifStyle(24,"#ff9b96"))
    featureText.position.set(480,150);
    featureText.anchor.set(0.5,0)
    generatorsTab.addChild(featureText);
    
    featureProgress = new PIXI.Text("",sansSerifStyle(48,"#ff9b96"))
    featureProgress.position.set(480,178);
    featureProgress.anchor.set(0.5,0)
    generatorsTab.addChild(featureProgress);
    
    pr2 = new UpgradeButton([{text: "Requires: 10 PRai"},{text: "Reset ALL Your progress, But gain a new upgrade and a PR1 Muti that scales with your PTS.",style: sansSerifStyle(18,"black",300)}],function(){prestige("pr2")},0xBBBBBB)
    pr2.position.set(602,500);
    //pr2.anchor.set(1,0); anchor wont work for some reason
    pr2.visible = false;
    generatorsTab.addChild(pr2)
    
    ug2 = new UpgradeButton([{text: "Decrease\nSpeed Cost"}],function(){buyUg2()},0xBBBBBB)
    ug2.position.set(602,375);
    //ug2.pivot.set(ug2.width,0)
    ug2.visible = false
    generatorsTab.addChild(ug2);
    
    ug2Info = new PIXI.Text("info about upgrade 2",sansSerifStyle(24))
    ug2Info.position.set(602,319);
    ug2Info.anchor.set(0,0);
    ug2Info.visible = false
    generatorsTab.addChild(ug2Info);
    
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
    fullResetButton.position.set(480 - (fullResetButton.width / 2),650);
    //fullResetButton.anchor.set(0.5,0);
    optionsTab.addChild(fullResetButton);
    
    //stats tab
    statsTab = new Container();
    statsTab.visible = false;
    app.stage.addChild(statsTab)
    
    statsInfo = new PIXI.Text("stats",sansSerifStyle(24))
    statsInfo.position.set(480,180);
    statsInfo.anchor.set(0.5,0);
    statsTab.addChild(statsInfo)
    
    kauraniaiTab = new Container();
    
    tab = "generators"
    app.ticker.add(delta => gameLoop(delta));
}

var reccentFPS = []

function gameLoop(delta)
{
    pointsDisplay.text = format(player.number,true);
    fpsDisplay.text = Math.round(app.ticker.FPS) + " FPS"
    speedDisplay.text = "Speed: " + format(player.speed.times(calcPRaiBoost()));
    
    player.number = player.number.add((player.speed.times(calcPRaiBoost())).divide(new Decimal(app.ticker.FPS)))
    player.stats.totalNumber = player.stats.totalNumber.add((player.speed.times(calcPRaiBoost())).divide(new Decimal(app.ticker.FPS)))
    if(player.unlocked.has("ug1autobuyer") && player.ug1.autobuyer) buyUg1();
    if(tab == "generators") generators(delta)
    else if(tab == "options") options(delta)
    else if (tab == "stats") stats(delta)
}

function generators(delta)
{
    if(player.unlocked.has("ug2")) ug1Info.text = "Cost reduction:" + format(player.ug1.reduction) + "\nUpgrade Speed, Need " + format(player.ug1.cost.divide(player.ug1.reduction)) + "\nYou brought this " + player.ug1.brought + " times";
    else ug1Info.text = "\nUpgrade Speed, Need " + format(player.ug1.cost.divide(player.ug1.reduction)) + "\nYou brought this " + player.ug1.brought + " times";
       
    praiDisplay.text = "You have " + format(player.prai) + " PRai which boosts your generation by x" + format(calcPRaiBoost());
    if(player.number.lessThan(1e6) || ((player.number.greaterThanOrEqualTo(1e6)) && player.pr2.brought == 0))
    {
        praiTime.text = "It would take " + formatTime(new Decimal(1e6).minus(player.number).divide(player.speed.times(calcPRaiBoost()))) + " to get to " + format(new Decimal(1e6));
    }
    else praiTime.text = "You would gain " + format(calcPRaiGain()) + " PRai."
    
    ug1.update(player.number.greaterThanOrEqualTo(player.ug1.cost.divide(player.ug1.reduction)));
    pr1.update(player.number.greaterThanOrEqualTo(1e6));
    pr2.update(player.prai.greaterThanOrEqualTo(player.pr2.cost));
    ug2.update(player.number.greaterThanOrEqualTo(player.ug2.cost));
    
    ug2Info.text = "Reduce cost: " + format(player.ug2.cost) + "\nYou brought this " + player.ug2.brought + " times"
    if(player.unlocked.has("ug2") && player.ug2.brought >= player.ug2.softcapStart) softcapText.visible = true
    else softcapText.visible = false
    
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
    else if(player.unlocking.has("kauraniai"))
    {
        if(player.pr2.brought >= 10)
        {
            unlock("kauraniai")
        }
        featureText.style = sansSerifStyle(24,"#6812cc")
        featureProgress.style = sansSerifStyle(48,"#6812cc")
        featureText.text = "PR2 Reset 10 times to unlock Kauraniai"
        featureProgress.text = player.pr2.brought + " / 10"
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
    var tex = "You have gained " + format(player.stats.totalNumber,true) + " points total.\nYou have brought " + player.stats.totalUg1Brought + " UG1 total.\nYou have gained " + format(player.stats.totalPrai) + " total."
    if(player.unlocked.has("ug2")) tex = tex + "\nYou have brought " + player.stats.totalUg2Brought + " UG2 total.\nYou have PR2 reset " + player.stats.totalPr2Brought + " total."
    statsInfo.text = tex
}















































