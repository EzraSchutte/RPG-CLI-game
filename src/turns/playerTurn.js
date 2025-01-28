import {select} from "@inquirer/prompts";
import {fight, finishedGame, player, playerFinishedGame} from "../index.js";
import {printEnemyAndPlayerHealthbar} from "../utils/healtbar.js";
import {
    doDamageReturnsVoid,
    enemyDialogReturnsDialog,
    ifDebugEqualsTruePrintFight,
    printFiglet,
    slowlyTypeText,
} from "../utils/utils.js";
import {enemyTurn} from "./enemyTurn.js";
import {openOptions} from "../promptScripts/options.js";
import {addRewardsToInventory, promptInventory} from "../items/items.js";
import {updatePlayerLevel} from "../enums/LEVEL.js";

// Start een fight tegen een enemy
export function startFight(enemy) {
    applyFightVariablesReturnsVoid(enemy);
    ifDebugEqualsTruePrintFight("after startFight:");

    processTurn();
}


// Checked welke de volgende turn is en execute de turns
export function processTurn() {
    if (fight.playersTurn === true) {
        playerTurn();
    } else if (fight.playersTurn === false) {
        enemyTurn();
    }
}

// Print de enemy zijn dialogue en prompt de user zijn opties Attack, Items, Flee.
export async function playerTurn() {
    if (checkForWinnerReturnsTrueIfWinnerIsSet()) return;

    console.log(`Enemy: ${fight.enemy.name}`);

    // Print de enemy zijn lines
    await slowlyTypeText(enemyDialogReturnsDialog(), 50);
    ifDebugEqualsTruePrintFight("start of askForNextMove:");

    // Print de healthbars
    await printEnemyAndPlayerHealthbar();

    // Stopt de code van verder runnen als er al een winner is


    const move = await select({
        type: "select",
        name: "value",
        message: "What's your next move",
        choices: [
            {name: "Attack", value: "attack"},
            {name: "Items", value: "items"},
            {name: "Flee", value: "flee"},
        ]
    });

    console.clear();

    if (move === "attack") {
        attackMove();
        enemyTurn();
    } else if (move === "items") {
        await promptInventory();
        playerTurn();
    } else if (move === "flee") {
        openOptions();
    }

}

// De player zijn attack
function attackMove() {
    ifDebugEqualsTruePrintFight("before attackMove:");

    // Doet damage tegen de enemy
    doDamageReturnsVoid();

    ifDebugEqualsTruePrintFight("after attackMove:");

    // Nu is de enemy aan de beurt
    fight.playersTurn = false;
}

function checkForWinnerReturnsTrueIfWinnerIsSet() {
    if (player.hp <= 0) {
        fight.winner = fight.enemy;
        endFightOrGame();
        return true;
    } else if (fight.enemyCurrentHP <= 0) {
        fight.winner = player;
        endFightOrGame();
        return true;
    }

    return false;
}

async function endFightOrGame() {
    // Alle code als de player de fight heeft gewonnen
    if (fight.winner === player) {
        console.clear();

        // Als de player alle fights heeft gewonnen runned runned de code dit
        if (playerFinishedGame()) {
            await finishedGame();
            return;
        }

        await slowlyTypeText(`You won a fight against: ${fight.enemy.name}`, 50)

        // Geeft player xp nadat hij het gevecht heeft gewonnen
        player.xp += fight.enemy.xpGained;
        player.shield = player.maxShield;
        await addRewardsToInventory();

        ifDebugEqualsTruePrintFight("after winning fight:");
        player.progression++;

        if (updatePlayerLevel()) {
            await slowlyTypeText(`You are now ` + player.level.name, 50);
        }
        // Player kan kiezen tussen quit, explore, inventory en view stats
        openOptions();
    } else if (fight.winner === fight.enemy) {
        // Als de enemy heeft gewonnen is de player dood en moet hij opnieuw beginnen
        printFiglet("You died...");
        process.exit();
    }

}

// Zet alle variables voor de fight object
function applyFightVariablesReturnsVoid(enemy) {
    fight.enemy = enemy;
    fight.enemyCurrentHP = enemy.hp;
    fight.enemyCurrentShield = enemy.shield;
    fight.enemyMaxHP = enemy.hp;
    fight.enemyMaxShield = enemy.shield;
    fight.dialogIndex = 0;
    fight.playersTurn = true;
    fight.winner = null;
    fight.playerDamageDone = 0;
    fight.enemyDamageDone = 0;
    fight.playerBonusDamageDone = 0;
}