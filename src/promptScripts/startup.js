import {input, select} from '@inquirer/prompts';
// Een package om user input te managen
import {debug, player} from "../index.js";
import {startFight} from "../turns/playerTurn.js";
import {COMBATCLASS} from "../enums/COMBATCLASS.js";
import {getNextEnemy, ifDebugEqualsTruePrintPlayer, printFiglet} from "../utils/utils.js";
import {STORYLINE} from "../enums/STORYLINE.js";
import {viewStats} from "./options.js";
import {LEVEL} from "../enums/LEVEL.js";

// Start de game en prompt de user de eerste opties
export async function startGame() {
    const chosenOption = await select({
        type: "select",
        name: "value",
        message: "Kies een actie",
        choices: [
            {name: "Start game", value: "start"},
            {name: "Stop game", value: "stop"},
        ]
    });

    if (chosenOption === "start") {
        askForPlayerNameAndClass();
    } else if (chosenOption === "stop") {
        await printFiglet("byebye");
        process.exit();
    }
}

async function askForPlayerNameAndClass() {
    const name = await input({message: 'Wat is je naam?'});

    // Als speler in debug modus is kan het de naam check bypassen voor snelle tests
    if (name === '' && debug === false) {
        console.log("Je moet een naam invoeren!")
        askForPlayerNameAndClass();
        return;
    }

    const chosenCombatClass = await select({
        type: "select",
        name: "value",
        message: "Kies een class",
        choices: [
            {name: "Knight", value: "knight"},
            {name: "Tank", value: "tank"},
            {name: "Mage", value: "mage"},
        ]
    })

    // Applying class stats
    if (chosenCombatClass === "knight") {
        applyCombatClass(COMBATCLASS.knight);
    } else if (chosenCombatClass === "tank") {
        applyCombatClass(COMBATCLASS.tank);
    } else if (chosenCombatClass === "mage") {
        applyCombatClass(COMBATCLASS.mage);
    } else {
        console.log("Een error probeer opnieuw.");
        return;
    }

    applyUniversalPlayerStats(name);
    ifDebugEqualsTruePrintPlayer("After creating player:");

    await viewStats("Creating player.....");
    console.clear();
    startFight(getNextEnemy());
}


function applyCombatClass(COMBATCLASS) {
    player.hp = COMBATCLASS.hp;
    player.damage = COMBATCLASS.damage;
    player.shield = COMBATCLASS.shield;
}

function applyUniversalPlayerStats(name) {
    player.name = name;
    player.xp = 0;
    player.items = [];
    player.maxHP = player.hp;
    player.maxShield = player.shield;
    player.progression = 0;
    player.storyline = STORYLINE.basicStory;
    player.equipedItem = null;
    player.level = LEVEL.level1;
}
