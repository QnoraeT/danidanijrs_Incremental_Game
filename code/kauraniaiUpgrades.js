var kuaraniaiShardUpgrades =
[
    {
        desc: "Buff the exchange between PRai and Kuaraniai from 0.01% to 0.02%",
        cost: new Decimal(10),
        colour: 0x9102EA,
        borderColour: 0x0509FF,
        effect: function() 
        {
            if(player.kuaraniaiShards.greaterThanOrEqualTo(kuaraniaiShardUpgrades[0].cost))
            {
                player.kuaraniaiShards = player.kuaraniaiShards.minus(kuaraniaiShardUpgrades[0].cost)
                kuaraniaiShardUpgradeButtons.showNext()
                player.kuaraniaiShardUpgrade++;
            }
        }
    },
    {
        desc: "Kuaraniai Power generation is boosted 3x and it now weakens your Prestige scaling.",
        cost: new Decimal(25),
        colour: 0x9102EA,
        borderColour: 0x0509FF,
        effect: function() 
        {
            if(player.kuaraniaiShards.greaterThanOrEqualTo(kuaraniaiShardUpgrades[1].cost))
            {
                player.kuaraniaiShards = player.kuaraniaiShards.minus(kuaraniaiShardUpgrades[1].cost)
                kuaraniaiShardUpgradeButtons.showNext()
                player.kuaraniaiShardUpgrade++;
                
                //still need to add the prestige scaling bit
            }
        }       
    },
    {
        desc: "PRai's multiplier is boosted by Kuaraniai Shards",
        cost: new Decimal(100),
        colour: 0x9102EA,
        borderColour: 0x0509FF        
    },
    {
        desc: "UP1's Scaling starts 5 later and 13% weaker, and SuperScaling starts 2 later and 5% weaker.",
        cost: new Decimal(1000),
        colour: 0x9102EA,
        borderColour: 0x0509FF        
    },
    {
        desc: "PRai sacrifices now only ^0.25s the PRai instead of resetting them, but keep the bonuses.",
        cost: new Decimal(10000),
        colour: 0x9102EA,
        borderColour: 0x0509FF        
    },
    {
        desc: "Kuaraniai now softcaps on 5 and it is 1.25x weaker.",
        cost: new Decimal(100000),
        colour: 0x9102EA,
        borderColour: 0x0509FF        
    },
    {
        desc: "Synergized Kuaraniai Power gen from Achievement 8's boost uses a better formula. log5.6 -> ^0.25 + log5.6",
        cost: new Decimal(1e6),
        colour: 0x9102EA,
        borderColour: 0x0509FF        
    },
    {
        desc: "Kuaraniai Shards' PRai booster now reduce Hyper Scaling strength for Speed upgrade 1.",
        cost: new Decimal(5e6),
        colour: 0x9102EA,
        borderColour: 0x0509FF        
    },
    {
        desc: "PRai's softcap is weakened by 50%, and Cost decrease gain formula is increased from 1.2x to 1.5x",
        cost: new Decimal(3e7),
        colour: 0x9102EA,
        borderColour: 0x0509FF        
    },
    {
        desc: "PR2's affect of multipling PRai gain is raised to ^1.5, and Cost reduction softcap is 2x weaker and Supersoftcap starts 2x later.",
        cost: new Decimal(2e8),
        colour: 0x9102EA,
        borderColour: 0x0509FF        
    },
    {
        desc: "All production before Kuaraniai is multiplied by 100x after softcaps, and all costs are cut by 1,000x after scaling.",
        cost: new Decimal(1e10),
        colour: 0xFF0000,
        borderColour: 0xAA0000        
    },
    {
        desc: "UP1's upgrade multiplier is now 1.75x from 1.5x",
        cost: new Decimal(1e11),
        colour: 0x9102EA,
        borderColour: 0x0509FF        
    }
]

var kuaraniaiPowerUpgrades =
[
    {
        desc: "Multiply KShards generation by 5x and KPower synergizes with Achievement 8's effect.",
        cost: new Decimal(1000),
        colour: 0x9102EA,
        borderColour: 0x0509FF,
        effect: function() 
        {
            if(player.kuaraniaiPower.greaterThanOrEqualTo(kuaraniaiPowerUpgrades[0].cost))
            {
                player.kuaraniaiPower = player.kuaraniaiPower.minus(kuaraniaiPowerUpgrades[0].cost)
                kuaraniaiPowerUpgradeButtons.showNext()
                player.kuaraniaiPowerUpgrade++;
                //still need to add the achievement 8 effect part
            }
        }
    },
    {
        desc: "Unlock a new feature when you have 100 Kuaraniai. (It shows the progress bar) and multiplies your Kuaraniai gain by 1.5x",
        cost: new Decimal(250000),
        colour: 0xF902D4,
        borderColour: 0xF92FE5
    },
    {
        desc: "Unlock the cost reduction, PRai, and Kuaraniai autobuyer.",
        cost: new Decimal(5e6),
        colour: 0x9102EA,
        borderColour: 0x0509FF
    },
    {
        desc: "Kuaraniai also makes Kuaraniai Shards boost Kuaraniai Power's effect in PR2 scaling, and Kuaraniai's descaling capabilities now also effect SuperScaling at a reduced rate.",
        cost: new Decimal(1e8),
        colour: 0x9102EA,
        borderColour: 0x0509FF
    },
    {
        desc: "Kuaraniai Shard gain are increased based on your total Kuaraniai Upgrades.",
        cost: new Decimal(5e8),
        colour: 0x9102EA,
        borderColour: 0x0509FF
    },
    {
        desc: "Kuaraniai's softcap now starts at log2(Kuaraniai), and its weaker based on Kuaraniai's Superscaling decreases.",
        cost: new Decimal(1e9),
        colour: 0x9102EA,
        borderColour: 0x0509FF
    },
]