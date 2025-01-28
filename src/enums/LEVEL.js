import {player} from "../index.js";

const level1 = {
    name: "Level 1",
    hp: 0,
    shield: 0,
    xpNeeded: 0,
}

const level2 = {
    name: "Level 2",
    hp: 50,
    shield: 20,
    xpNeeded: 50,
}

const level3 = {
    name: "Level 3",
    hp: 100,
    shield: 40,
    xpNeeded: 150,
}

const level4 = {
    name: "Level 4",
    hp: 200,
    shield: 80,
    xpNeeded: 300,
}

const level5 = {
    name: "Level 5",
    hp: 400,
    shield: 160,
    xpNeeded: 450,
}

// hp is hp die bovenop de hp die de player al heeft op komt, zelfde met shield.
export const LEVEL = {
    level1: level1,
    level2: level2,
    level3: level3,
    level4: level4,
    level5: level5,
}


// Returns level gebaseerd op xp
export function calculateLevel() {
    const xp = player.xp;
    if (xp >= level5.xpNeeded) {
        return level5;
    } else if (xp >= level4.xpNeeded) {
        return level4;
    } else if (xp >= level3.xpNeeded) {
        return level3;
    } else if (xp >= level2.xpNeeded) {
        return level2;
    } else if (xp >= level1.xpNeeded) {
        return level1;
    } else {
        return level1;
    }
}


// Deze functie zorgt ervoor dat de player zijn level omhoog gaat als een xp bereikt is
// Returned true als geupdate

export function updatePlayerLevel() {
    let level = calculateLevel();
    if (level === player.level) return false;

    player.maxHP += level.hp;
    player.hp += level.hp;
    player.shield += level.shield;
    player.level = level;
    return true;
}