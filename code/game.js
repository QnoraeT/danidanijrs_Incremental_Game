function buyUg1()
{
    if(player.number.greaterThan(player.ug1.cost.divide(player.ug1.reduction)))
    {
        player.number = player.number.minus(player.ug1.cost.divide(player.ug1.reduction));
        player.ug1.brought++;
        player.stats.totalUg1Brought++
        player.speed = player.speed.multiply(1.5)
        player.ug1.cost = player.ug1.cost.multiply(1.55);
        if(player.ug1.brought >= player.ug1.xScaleStart)
        {
            var a = player.ug1.brought
            player.ug1.cost = player.ug1.cost.multiply(1 + (((a - (player.ug1.xScaleStart - 1)) / (Math.sqrt(a * 5) + Math.log10(a))) * (player.ug1.xScaleStrength / 2)));
            /*for(var a = 0 ; a < player.generaters.ug1.brought + 1; a++)
            {
                if(a >= 15)
                {
                    player.generaters.ug1.cost = player.generaters.ug1.cost.multiply(1 + (((a - (15 - 1)) / (Math.sqrt(a * 5) + Math.log10(a))) * (1 / 2)));
                }
            }*/
            ug1.changeText([{text: "Upgrade\nXScaled Speed"}])
            ug2.changeText([{text: "Decrease\nXScaled Speed Cost"}])
        }
        //if(player.ug1.brought >= 15) ug1.changeText([{text: "Upgrade\nXScaled Speed"}])
    }
}

function buyUg2()
{
    if(player.number.greaterThan(player.ug2.cost))
    {
        player.number = player.number.minus(player.ug2.cost);
        player.ug2.brought++;
        player.stats.totalUg2Brought++
        //softcaps
        var muti = new Decimal(1.2)
        if(player.ug2.brought > player.ug2.softcapStart)
        {
            muti = /*(*/muti.divide((((1 + (12 / (player.ug2.brought * 10 * player.ug2.softcapStrength))) - 1)/ 2) + 1)//).times(player.ug2.brought)
        }
        if(muti.lessThan(1)) muti = new Decimal(1)
        player.ug1.reduction = player.ug1.reduction.times(muti);
        //cost scaling
        player.ug2.cost = player.ug2.cost.multiply(1.4);
        if(player.ug2.brought >= player.ug2.xScaleStart)
        {
            var a = player.ug2.brought
            player.ug2.cost = player.ug2.cost.multiply(1 + (((a - (player.ug2.xScaleStart - 1)) / (Math.sqrt(a * 5) + Math.log10(a))) * player.ug2.xScaleStrength));
            /*for(var a = 0 ; a < player.generaters.ug1.brought + 1; a++)
            {
                if(a >= 15)
                {
                    player.generaters.ug1.cost = player.generaters.ug1.cost.multiply(1 + (((a - (15 - 1)) / (Math.sqrt(a * 5) + Math.log10(a))) * (1 / 2)));
                }
            }*/
        }
    }
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
                player.prai = new Decimal(1)
                player.pr2.brought++
                player.stats.totalPr2Brought++;
                //cost scaling
                player.pr2.cost = player.pr2.cost.add((player.pr2.brought * 10) + 10)
                
                //scaling upgrade changes after the softcap
                
                //changes the text on the button for next time and gives addition rewards
                
                if(player.pr2.brought == 1)
                {
                    unlock("ug2")
                }
                if(player.pr2.brought == 2)
                {
                    unlock("ug1autobuyer")
                }
                if(player.pr2.brought == 4)
                {
                    player.unlocking.push("kuaraniai");
                }
                if(player.pr2.brought == 5)
                {
                    player.ug1.xScaleStart *= 3
                    player.ug1.xScaleStrength /= 3
                    player.ug2.xScaleStart *= 3
                    player.ug2.xScaleStrength /= 3
                    player.ug2.softcapStart *= 3
                    player.ug2.softcapStrength /= 3
                }

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
        player.ug1.brought = 0
        player.ug1.reduction = new Decimal(1)

        ug2.changeText([{text: "Decrease\nSpeed Cost"}])
        player.ug2.cost = new Decimal(100000)
        player.ug2.brought = 0
    }
}

function updatePr2Element()
{
    var desc = "Reset ALL Your progress, But gain muti to PR1"
    var size = 18
                
    if(player.pr2.brought == 1)
    {
        desc = "Reset ALL Your progress, But gain muti to PR1 and a Speed autobuyer."
    }
    else if(player.pr2.brought == 4)
    {
        desc = "Reset ALL Your previous Progress, But gain multi to PRai and Cost reduction softcaps 3x later and 3x weaker."
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
    if(player.pr2.brought == 0) return new Decimal(1)
    else 
    {
        var out = Decimal.root(player.number.divide(1e6),4);
        if((player.pr2.brought >= 2)) out = out.multiply(new Decimal(player.pr2.brought).pow(1.25));
        
        return out;
    }
}

function calcKuaraniaiGain()
{   
    var rate = player.kuaraniaiShardUpgrade >= 1 ? 0.0002 : 0.0001
    
    if(player.kuaraniaiPowerUpgrade >= 2) rate *= 1.5;
    
    var amount = player.prai.times(rate)
    
    //softcaps
    if(amount.greaterThan(player.kuaraniaiGainSoftcaps.normalStart)) amount = Decimal.root(amount.minus(player.kuaraniaiGainSoftcaps.normalStart),1 + ((1/3) * player.kuaraniaiGainSoftcaps.normalStrength)).add(player.kuaraniaiGainSoftcaps.normalStart)
    
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






