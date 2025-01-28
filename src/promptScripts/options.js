import {select} from "@inquirer/prompts";
import {startFight} from "../turns/playerTurn.js";
import {getNextEnemy, ifDebugEqualsTruePrintPlayer, sleep, slowlyTypeText} from "../utils/utils.js";
import {player} from "../index.js";
import {calculateLevel} from "../enums/LEVEL.js";
import {promptInventory} from "../items/items.js";

export async function openOptions() {
    ifDebugEqualsTruePrintPlayer("Start of open options:")
    const chosenInput = await select({
            type: "select",
            name: "value",
            message: "Choose an option.",
            choices: [
                {name: "Explore further", value: "explore"},
                {name: "View Stats", value: "stats"},
                {name: "Check Inventory", value: "inventory"},
                {name: "Quit Game", value: "quit"},
            ]
        })

    if (chosenInput === "explore") {
        console.clear();
        startFight(getNextEnemy());
    } else if (chosenInput === "stats") {
        await viewStats("Retrieving player file....");
        openOptions();
    } else if (chosenInput === "inventory") {
        await promptInventory();
        openOptions();
    } else if (chosenInput === "quit") {
        process.exit();
    } else {
        console.log("Een error probeer opnieuw.");
    }

}

export async function viewStats(msg) {
    let speed = 50;

    await slowlyTypeText(msg, speed);
    await slowlyTypeText(`Name: ${player.name}`, speed);
    await slowlyTypeText(`HP/MaxHP: ${player.hp} / ${player.maxHP}`, speed);
    await slowlyTypeText(`Level: ${calculateLevel().name}`, speed);
    await slowlyTypeText(`Shield: ${player.shield}`, speed);
    await slowlyTypeText(`XP: ${player.xp}`, speed);
    await slowlyTypeText(`Damage: ${player.damage}`, speed);
    await slowlyTypeText(`Battles won: ${player.progression}/${player.storyline.enemies.length}`, speed)

    // Sleep the program so the user has a second to process the stats
    await sleep(1000);
}