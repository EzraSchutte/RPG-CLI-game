// Drawing the Progress Bar Image
import kleur from "kleur";
import {debug, fight, player} from "../index.js";
import {slowlyTypeText} from "./utils.js";

// Returned de enemy healthbar, shield gaat over de barwidth limit
export const drawHPBar = (msg, currentHP, maxHP, currentShield) => {
    const barWidth = 30;
    let filledWidth = Math.floor(currentHP / maxHP * barWidth);
    let emptyWidth = barWidth - filledWidth;
    let shieldWidth = Math.floor(currentShield / maxHP * barWidth);

    if (emptyWidth <= 0) {
        emptyWidth = 0;
    }
    if (filledWidth <= 0) {
        filledWidth = 0;
    }
    if (shieldWidth <= 0) {
        shieldWidth = 0;
    }

    // Replace emptyWidth met shieldWidth
    if (emptyWidth > shieldWidth) {
        emptyWidth -= shieldWidth;
        // A limit for shieldwidth
    } else if (shieldWidth > barWidth * 2) {
        shieldWidth = 60;
    }

    let totalWidth = filledWidth + emptyWidth + shieldWidth;

    if (debug === true) {
        console.log(`Filled width: ${filledWidth}`)
        console.log(`empty width: ${emptyWidth}`)
        console.log(`shield width: ${shieldWidth}`)
        console.log(`Total width: ${totalWidth}`)
    }

    let progressBar = kleur.green('|'.repeat(filledWidth)) + kleur.red('|'.repeat(emptyWidth)) + kleur.blue('|'.repeat(shieldWidth));

    return `${msg}: [${progressBar}] ${currentHP + currentShield}/${maxHP}`;
}

export async function printEnemyAndPlayerHealthbar() {
    if (fight.playerDamageDone > 0 && fight.playerBonusDamageDone > 0) {
        await slowlyTypeText(`${kleur.red(`-${fight.playerDamageDone}`)} (${kleur.yellow(`+${fight.playerBonusDamageDone}`)})`)
    } else if (fight.playerDamageDone) {
        await slowlyTypeText(`${kleur.red(`-${fight.playerDamageDone}`)}`)
    }
    await slowlyTypeText(drawHPBar("ENEMY HP", fight.enemyCurrentHP, fight.enemyMaxHP, fight.enemyCurrentShield));
    if (fight.enemyDamageDone > 0) {
        await slowlyTypeText(kleur.red(`-${fight.enemyDamageDone}`))
    }
    await slowlyTypeText(drawHPBar("YOUR  HP", player.hp, player.maxHP, player.shield));
}