

function buyUg1()
{
    if(player.number.greaterThan(player.ug1.cost))
    {
        player.number = player.number.minus(player.ug1.cost);
        player.ug1.bought=player.ug1.bought.add(1);
        player.stats.totalUg1bought=player.stats.totalUg1bought.add(1);
        if(player.ug1.bought.gte(player.ug1.xScaleStart)){
            ug1.changeText([{text: "Upgrade\nScaled Speed"}])
            ug2.changeText([{text: "Decrease\nScaled Speed Cost"}])
        }

    }
}

function buyUg2()
{
    if(player.number.greaterThan(player.ug2.cost))
    {
        player.number = player.number.minus(player.ug2.cost);
        player.ug2.bought=player.ug2.bought.add(1);
        player.stats.totalUg2bought=player.stats.totalUg2bought.add(1);
    }
}
function updateScalingSoftcaps(){
let x
let y
x = new Decimal (10)
y = new Decimal (0.5)
if (player.pr2.bought.gte(5)){
x = x.mul(3)
y = y.div(1.3)}
player.ug2.softcapStart = x
player.ug2.softcapStrength = y

}

function prestige(type)
{
    var success = false
    switch(type)
    {
        case "pr1":
            if(player.number.greaterThanOrEqualTo(1e6))
            {
                success = true;
                player.prai = player.prai.add(calcPRaiGain());
                player.stats.totalPrai = player.stats.totalPrai.add(calcPRaiGain());
                if(player.prai.greaterThanOrEqualTo(3) && !player.unlocking.has("pr2") && !pr2.visible) player.unlocking.push("pr2")                
            }
            break;
        case "pr2":
            if(player.prai.greaterThanOrEqualTo(calcPr2CostEffects()))
            {
                success = true;
                player.prai = new Decimal(1);
                player.pr2.bought=player.pr2.bought.add(1);
                player.stats.totalPr2bought=player.stats.totalPr2bought.add(1);
                //scaling upgrade changes after the softcap
                
                //changes the text on the button for next time and gives addition rewards
                
                if(player.pr2.bought.equals(1))
                {
                    unlock("ug2")
                }
                if(player.pr2.bought.equals(2))
                {
                    unlock("ug1autobuyer")
                }
                if(player.pr2.bought.equals(4))
                {
                    player.unlocking.push("kuaraniai");}
                updatePr2Element()
            }
            break;
        case "praiSac":
            success = true;
            player.kuaraniai = player.kuaraniai.add(calcKuaraniaiGain());
            
            if(player.kuaraniaiShardUpgrade >= 5) player.prai = player.prai.root(4)
            else player.prai = new Decimal(1);
        }
    if(success)
    {
        player.number = new Decimal(0);
        player.speed = new Decimal(1);
        ug1.changeText([{text: "Upgrade\nSpeed"}])
        player.ug1.cost = new Decimal(5)
        player.ug1.bought = new Decimal(0)
        player.ug1.reduction = new Decimal(1)

        ug2.changeText([{text: "Decrease\nSpeed Cost"}])
        player.ug2.cost = new Decimal(100000)
        player.ug2.bought = new Decimal(0)
    }
}

function updatePr2Element()
{
    var desc = "Reset your current progress to gain a multiplier to PRai."
    var size = 18
                
    if(player.pr2.bought.equals(1))
    {
        desc = "Reset your current progress to gain a multiplier to PRai and a speed autobuyer."
    }
    else if(player.pr2.bought.equals(4))
    {
        desc = "Reset your current progress to gain a multiplier to PRai, and make the cost reduction softcap 30% weaker and start 3x later."
        size = 14
    } 
    
    pr2.changeText([{text: "Requires: " + format(calcPr2CostEffects(),player.kuaraniaiShardUpgrade >= 2) + " PRai"},{text: desc,style: sansSerifStyle(size,"black",300)}])
}

function switchTab(t)
{
    tabs[tab].draw(null,tabs[tab].colour,tabs[tab].borderColour)
    window[tab + "Tab"].visible = false;
    tab = t
    window[tab + "Tab"].visible = true;
    tabs[tab].draw(null,tabs[tab].colour,tabs[tab].selBorderColour)
}

//this calculates the number boost that your PRai gives
function calcPRaiBoost()
{
    var out = player.prai.minus(0.75).times(4)
    if(player.kuaraniaiShardUpgrade >= 3) out = out.multiply(Decimal.pow(player.kuaraniaiShards,Decimal.minus(1,(Decimal.divide(10,player.kuaraniaiShards.slog().add(11))))))
    return out;
}

//this calculates the PRai you will get when you PR1
function calcPRaiGain()
{
    if(player.pr2.bought.equals(0)) return new Decimal(1)
    else 
    {
        var out = Decimal.root(player.number.divide(1e6),4);
        if((player.pr2.bought.gte(2))) out = out.multiply(player.pr2.bought.pow(1.25));
        
        return out;
    }
}

function calcKuaraniaiGain()
{   
    var rate = player.kuaraniaiShardUpgrade >= 1 ? 0.0002 : 0.0001
    
    if(player.kuaraniaiPowerUpgrade >= 2) rate *= 1.5;
    
    var amount = player.prai.times(rate)
    
    //softcaps
    if(amount.greaterThan(player.kuaraniaiGainSoftcaps.normalStart)){
    amount = amount.div(player.kuaraniaiGainSoftcaps.normalStart).pow(player.kuaraniaiGainSoftcaps.normalStrength).mul(player.kuaraniaiGainSoftcaps.normalStart)
    }
    return amount
}

function calcProduction(resource)
{
    let base;
    switch(resource)
    {
        case "KPower":
            base = player.kuaraniaiShards
            
            //KShard upgrade mutis
            if(player.kuaraniaiShardUpgrade >= 2) base = base.multiply(3)
            
            //KPower upgrade mutis
            if(player.kuaraniaiPowerUpgrade >= 1) 
            {
                //idk if its sqrt or log. i went log cos its says so on one of the upgrades
                if(player.kuaraniaiShardUpgrade >= 7) base = base.multiply(player.ug1.reduction.log(5.6).add(Decimal.root(player.ug1.reduction,4)).add(1))
                else base = base.multiply(player.ug1.reduction.log(5.6).add(1))
            }
            return base
        case "KShards":
            base = player.kuaraniai 
            if(player.kuaraniaiPowerUpgrade >= 1) base = base.multiply(5)
            return base
        case "number":
            return player.speed.times(calcPRaiBoost())
        case "speed":
            base = new Decimal(1.5)
            return base.pow(player.ug1.bought).mul(4)
        default:
            break;
    }
    return null
}

function unlock(feature)
{
    if(player.unlocked.has(feature)) return;
    
    player.unlocked.push(feature)
    if(player.unlocking.has(feature)) player.unlocking.delete(feature)
    setLockState(feature,true)
}

function relock(feature)
{
    if(!player.unlocked.has(feature)) return;
    
    player.unlocked.delete(feature)
    //if(player.unlocking.has(feature)) player.unlocking.delete(feature)
    setLockState(feature,false)
}

function calcPr2CostEffects()
{
    var out = player.pr2.cost
    
    if(player.kuaraniaiShardUpgrade >= 2) out = out.times(Decimal.divide(1,  Decimal.log10(Decimal.log10(((Decimal.slog(player.kuaraniaiShards).add(1)).divide(2)).add(1)).add(2))).divide(3.321928094887363))
    
    return out
}


function setLockState(feature,state)
{
    //if unlocking state will equal true if relocking state will equal false
    switch(feature)
    {
        case "pr2":
            pr2.visible = state
            break;
        case "ug2":
            ug2.visible = state;
            ug2Info.visible = state;
            break;
        case "ug1autobuyer":
            ug1autobuyer.visible = state
            ug1autobuyer.setState(state);
            player.ug1.autobuyer = state;
            break;
        case "ug2autobuyer":
            ug2autobuyer.visible = state
            ug2autobuyer.setState(state);
            player.ug2.autobuyer = state;
            break;
        case "pr1autobuyer":
            pr1autobuyer.visible = state
            pr1autobuyer.setState(state);
            pr1autobuyerThresholdButton.visible = state;
            pr1autobuyerThresholdText.visible = state;
            player.pr1autobuyer = state;
            break;
        case "kuaraniai":
            tabs.kuaraniai.visible = state
            break;
    }
}
function getUPGCosts(amount,upgType)
    {
        let base;
        let Nscale;
        let effective = amount;
        let effStart;
        switch(upgType)
        {
            case "UPG1":
                base = new Decimal(5)
                Nscale = new Decimal(1.6)
                if (amount.gte(player.ug1.xScaleStart)){
                    effective = effective.div(player.ug1.xScaleStart).pow(player.ug1.xScaleStrength).mul(player.ug1.xScaleStart)
                }
                if (amount.gte(player.ug1.SuperScaleStart)){
                    effStart = player.ug1.SuperScaleStart.div(player.ug1.xScaleStart).pow(player.ug1.xScaleStrength).mul(player.ug1.xScaleStart)
                    effective = effective.div(effStart).pow(player.ug1.SuperScaleStrength).mul(effStart)
                }
                base = Nscale.pow(effective).mul(base)
                // UP2 reduction
                let UP2base = new Decimal(1.2)
                reduction = UP2base.pow(player.ug2.bought)
                if (reduction.gte(player.ug2.softcapStart)){
                    reduction.pow((new Decimal(1).sub(player.ug2.softcapStrength)).add(player.ug2.softcapStrength.div((reduction.log10().div(player.ug2.softcapStart.log10())).pow(player.ug2.softcapStrength))))
                }
                player.ug1.reduction=reduction
                base = base.div(reduction)
                return base
            case "UPG2":
                base = new Decimal(100000)
                Nscale = new Decimal(1.4)
                if (amount.gte(player.ug2.xScaleStart)){
                    effective = effective.div(player.ug2.xScaleStart).pow(player.ug2.xScaleStrength).mul(player.ug2.xScaleStart)
                }
                if (amount.gte(player.ug2.SuperScaleStart)){
                    effStart = player.ug2.SuperScaleStart.div(player.ug2.xScaleStart).pow(player.ug2.xScaleStrength).mul(player.ug2.xScaleStart)
                    effective = effective.div(effStart).pow(player.ug2.SuperScaleStrength).mul(effStart)
                }
                base = Nscale.pow(effective).mul(base)
                return base
            case "PR2":
                return effective.pow(2).mul(5).add(effective.mul(15)).add(10) // 5x^2 + 15x + 10, calculated from previous sequence
            default:
                break;
        }
        return null
    }

function hardReset()
{
    if(confirm("ARE YOU SURE YOU WANT TO ERASE ALL YOUR PROGRESS?")) 
    {
        if(confirm("ARE YOU REALLY SURE YOU WANT TO ERASE ALL YOUR PROGRESS?")) 
        {
            if(prompt('TYPE "reset my progress" TO RESET. THIS CANNOT BE UNDONE.',"") == "reset my progress") 
            {
                player.unlocked.forEach(function(feature)
                {
                    relock(feature)
                });
                if(player.kuaraniaiShardUpgrade > 0) kuaraniaiShardUpgradeButtons.setPosition(0)
                if(player.kuaraniaiPowerUpgrade > 0) kuaraniaiPowerUpgradeButtons.setPosition(0)
                player = setPlayerVaribles()
                return true;
            }
        }
    }
    return false;
}






