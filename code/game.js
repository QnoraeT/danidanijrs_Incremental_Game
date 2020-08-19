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
                success = true
                player.prai = player.prai.add(calcPRaiGain());
                player.stats.totalPrai = player.stats.totalPrai.add(calcPRaiGain());
                if(player.prai.greaterThanOrEqualTo(3) && !player.unlocking.has("pr2") && !pr2.visible) player.unlocking.push("pr2")                
            }
            break;
        case "pr2":
            if(player.prai.greaterThanOrEqualTo(player.pr2.cost))
            {
                success = true
                player.prai = new Decimal(1)
                player.pr2.brought++
                player.stats.totalPr2Brought++;
                //cost scaling
                player.pr2.cost = player.pr2.cost.add((player.pr2.brought * 10) + 10)
                
                //changes the text on the button for next time and gives addition rewards
                var desc = "Reset ALL Your progress, But gain muti to PR1"
                var size = 18
                
                if(player.pr2.brought == 1)
                {
                    desc = "Reset ALL Your progress, But gain muti to PR1 and a Speed autobuyer."
                    unlock("ug2")
                }
                if(player.pr2.brought == 2)
                {
                    unlock("ug1autobuyer")
                }
                if(player.pr2.brought == 4)
                {
                    desc = "Reset ALL Your previous Progress, But gain multi to PRai and Cost reduction softcaps 3x later and 3x weaker."
                    size = 14
                    player.unlocking.push("kauraniai");
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
                
                pr2.changeText([{text: "Requires: " + format(player.pr2.cost) + " PRai"},{text: desc,style: sansSerifStyle(size,"black",300)}])
        }
    }
    if(success)
    {
        player.number = new Decimal(0);
        player.speed = new Decimal(1);
        ug1.changeText([{text: "Upgrade\nSpeed"}])
        player.ug1.cost = new Decimal(5)
        player.ug1.brought = 0

        ug2.changeText([{text: "Decrease\nSpeed Cost"}])
        player.ug2.cost = new Decimal(100000)
        player.ug2.brought = 0
    }
}

function switchTab(t)
{
    tabs[tab].draw(null,tabs[tab].colour,tabs[tab].borderColour)
    window[tab + "Tab"].visible = false;
    tab = t
    window[tab + "Tab"].visible = true;
    tabs[tab].draw(null,tabs[tab].colour,tabs[tab].selBorderColour)
}

function calcPRaiBoost()
{
    return player.prai.minus(0.75).times(4);
}

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
        case "kauraniai":
            tabs.kauraniai.visible = state
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
                player = setPlayerVaribles()
                return true;
            }
        }
    }
    return false;
}






