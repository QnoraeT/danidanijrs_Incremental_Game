//alise
let Resources = PIXI.Loader.shared.resources
let Loader = PIXI.Loader.shared
let TextureCache = PIXI.utils.TextureCache
let Sprite = PIXI.Sprite
let Container = PIXI.Container
let Graphics = PIXI.Graphics

//ui delements
var generatorsTab,optionsTab,statsTab,kauraniaiTab
let pointsDisplay,fpsDisplay,speedDisplay,ug1,ug1Info,pr1,praiDisplay,praiTime,featureText,featureProgress,pr2,ug2,ug2Info,ug1autobuyer,tabContainer,softcapText,ug2autobuyer,pr1autobuyer,pr1autobuyerThresholdButton,pr1autobuyerThresholdText;
let fullResetButton;
let statsInfo;
let kuaraniaiPowerUpgradeButtons,kuaraniaiShardUpgradeButtons,kuaraniaiDisplay,kuaraniaiShardsDisplay,kuaraniaiPowerDisplay,kuaraniaiShardsProdDisplay,kuaraniaiPowerProdDisplay,kauraniaiInfo,praiSacrificeInfo,praiSacrificeButton;
//this are the acutal tab buttuns
var tabs =
{
    generators: null,
    options: null,
    stats: null,
    kuaraniai: null,
}

var inputs = {};

//player varibles

function setPlayerVaribles()
{
    var out =
    {
        number: new Decimal(0),
        speed: new Decimal(1),
        ug1: 
        {
            cost: new Decimal(5),
            brought: 0,
            reduction: new Decimal(1),
            autobuyer: false,
            xScaleStart: 15,
            xScaleStrength: 1,
        },
        pr2:
        {
            cost: new Decimal(10),
            brought: 0,
        },
        ug2:
        {
            cost: new Decimal(100000),
            brought: 0,
            autobuyer: false,
            xScaleStart: 15,
            xScaleStrength: 1,
            softcapStart: 10,
            softcapStrength: 1,
        },
        prai: new Decimal(1),
        pr1autobuyer: false,
        pr1threshhold: new Decimal(1),
        unlocking: new List(),
        unlocked: new List(),
        stats:
        {
            totalNumber: new Decimal(0),
            totalUg1Brought: 0,
            totalPrai: new Decimal(1),
            totalUg2Brought: 0,
            totalPr2Brought: 0,
        },
        kuaraniai: new Decimal(0),
        kuaraniaiGainSoftcaps:
        {
            normalStart: new Decimal(2),
            normalStrength: 1,
        },
        kuaraniaiShards: new Decimal(0),
        kuaraniaiPower: new Decimal(0),
        kuaraniaiShardUpgrade: 0,
        kuaraniaiPowerUpgrade: 0,
    }
    return out
}
var player = setPlayerVaribles()

let app = new PIXI.Application({width: 960, height: 720});
document.body.appendChild(app.view);
var tab = null;


















































