import {debug, fight, player} from "../index.js";
import {getBonusDamageIfWeaponIsEquiped} from "../items/items.js";
import figlet from "figlet";
import * as readline from "node:readline";

// Prints de fight variable als debug true is
export function ifDebugEqualsTruePrintFight(message) {
    if (debug !== true) return;

    console.log(message);
    console.log(fight);
}

// Prints de player variable als debug true is
export function ifDebugEqualsTruePrintPlayer(message) {
    if (debug !== true) return;

    console.log(message);
    console.log(player);
}

// Geen idee hoe dit werkt send help
export function doDamageReturnsVoid() {
    if (fight.playersTurn === true) {
        playerDealsDamageReturnsVoid();
    } else if (fight.playersTurn === false) {
        enemyDealsDamageReturnsVoid();
    }
}

// Geen flauw idee hoe dit werkt maar het cycled tussen alle dialogs en print daarna een random dialog
export function enemyDialogReturnsDialog() {
    let dialogIndex = fight.dialogIndex;
    let dialog = fight.enemy.dialog[dialogIndex];
    let randomInt = randomIntInsideDialogLength();

    if (dialogIndex + 1 > fight.enemy.dialog.length) {
        dialog = fight.enemy.dialog[randomInt];
    } else {
        dialogIndex++;
    }

    fight.dialogIndex = dialogIndex;
    return dialog;
}

function randomIntInsideDialogLength() {
    let min = 1;
    let max = Math.floor(fight.enemy.dialog.length);

    let randomInt;
    do {
        randomInt = Math.floor(Math.random() * (max - min)) + min;
    } while (randomInt === 0);

    return randomInt;
}

// Call dit om damage te doen tegen de enemy, de damage is random waarbij de min de maxdamage / 4 is
function playerDealsDamageReturnsVoid() {
    let maxDamage = player.damage;
    let minDamage = (maxDamage / 4);
    let bonusDamage = getBonusDamageIfWeaponIsEquiped();
    let damage = randomNumber(minDamage, maxDamage);
    let hp = fight.enemyCurrentHP;
    let shield = fight.enemyCurrentShield;

    if (shield > 0) {
        shield -= damage + bonusDamage;
        if (shield < 0) {
            shield = 0;
        }
    } else {
        hp -= damage + bonusDamage;
        if (hp < 0) {
            hp = 0;
        }
    }
    // Set hp after doing dmg
    fight.enemyCurrentHP = hp;
    fight.enemyCurrentShield = shield;


    fight.playerDamageDone = damage;
    fight.playerBonusDamageDone = bonusDamage;
}

// Call dit om damage te doen tegen de player, de damage is random waarbij de min de maxdamage / 4 is
function enemyDealsDamageReturnsVoid() {
    let maxDamage = fight.enemy.damage;
    let minDamage = maxDamage - (maxDamage / 4);
    let damage = randomNumber(minDamage, maxDamage);
    let hp = player.hp;
    let shield = player.shield;

    if (shield > 0) {
        shield -= damage;
        if (shield < 0) {
            shield = 0;
        }
    } else {
        hp -= damage;
        if (hp < 0) {
            hp = 0;
        }
    }

    player.hp = hp;
    player.shield = shield;
    fight.enemyDamageDone = damage;
}

export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

// Returns the next enemy based on the progression variable
export function getNextEnemy() {
    return player.storyline.enemies[player.progression];
}

// Functie om tekst sloom te laten typen in ms default value: 15
export async function slowlyTypeText(text, speed) {
    return new Promise((resolve) => {
        let i = 0;
        if (speed === null) {
            speed = 15;
        }

        // Disable input
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
        

        function typeLetter() {
            if (i < text.length) {
                process.stdout.write(text.charAt(i));
                i++;
                setTimeout(typeLetter, speed); // Delay between characters
            } else {
                console.log();
                if (process.stdin.isTTY) {
                    process.stdin.setRawMode(false);
                }
                resolve();
            }
        }

        typeLetter();
    });
}

// Sleep program
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Maakt ascii art van msg
export async function printFiglet(msg) {
    await figlet(msg, function (err, data) {
        if (err) {
            console.log("Something went wrong..")
            console.dir(err);
            return;
        }

        console.log(data);
    });
}