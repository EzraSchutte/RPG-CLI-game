import {fight, player} from "../index.js";
import {select} from "@inquirer/prompts";
import {ITEM} from "../enums/ITEM.js";
import {ifDebugEqualsTruePrintFight, slowlyTypeText} from "../utils/utils.js";
import {ITEMTYPE} from "../enums/ITEMTYPE.js";

export function addItemToInventory(item) {
    player.items.push(item);
}

export function removeItemFromInventory(item) {
    for (let i = 0; i < player.items.length; i++) {
        if (item !== player.items[i]) continue;

        player.items.splice(i, 1);
        break;
    }
}

// Functie die de inventory prompt en dat je items kan kiezen om te gebruiken
export async function promptInventory() {
    let questions = [];
    let items = player.items;
    if (items.length <= 0) {
        console.log("You don't have any items.")
        return;
    }
    // Select van inquirer gebruikt question objects hier maak ik een question object per item in een array om ze te displayen in de prompt
    items.forEach((item) => {
        questions.push({name: item.name, value: item.name})
    })

    // Optie om te cancellen
    questions.push({name: "Cancel", value: "cancel"});


    const chosenInput = await select({
        type: "select",
        name: "value",
        message: "Choose a item",
        choices: questions,
    });

    if (chosenInput === "cancel") return;


    // Als een item overeenkomt met chosenInput dan checked het of de itemtype ITEMTYPE.weapon is of ITEMTYPE.potion als het een potion is healed het de player als het een wapen krijgt de player player.bonusDamage
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (chosenInput !== item.name) continue;

        if (item.itemType === ITEMTYPE.weapon) {
            await equipWeapon(item);
        } else if (item.itemType === ITEMTYPE.potion) {
            await useHealthPotion(item);
        }
        break;
    }
}

// Equip een weapon
async function equipWeapon(item) {
    player.equipedItem = item;
    await slowlyTypeText(`You equiped the item ${item.name}.`, 50)
    removeItemFromInventory(item);
}

async function useHealthPotion(item) {
    if (player.hp === player.maxHP) {
        await slowlyTypeText(`You are already full hp!`)
        return;
    }
    if (player.hp + item.health > player.maxHP) {
        player.hp = player.maxHP;
    } else {
        player.hp += item.health;
    }

    await slowlyTypeText(`Your health has gone up by ${item.health}.`, 50);
    removeItemFromInventory(item);
}

// Een check om te zien of de player een weapon aan heeft returned true of false
export function playerHasWeaponEquiped() {
    if (player.equipedItem == null) return false;

    // Als durability 0 of minder is gaat het item kapot
    if (player.equipedItem.durability < 0) {
        player.equipedItem = null;
        return false;
    }

    return true;
}

// Returned de bonus damage van de player zijn weapon
export function getBonusDamageIfWeaponIsEquiped() {
    if (!playerHasWeaponEquiped()) return 0;
    return player.equipedItem.damage;
}

// Add items in player zijn inventory en displayed het als de enemy rewards had zie ENEMY.js
export async function addRewardsToInventory() {
    ifDebugEqualsTruePrintFight("start of addRewardsToInventoryIfNotNull:");

    let rewardsAddedThisFight = [];

    if (fight.enemy.rewards.length > 0) {
        fight.enemy.rewards.forEach((item) => {
            addItemToInventory(item);
            rewardsAddedThisFight.push(item);
        });
    }
    // Nadat de player een fight wint krijg hij altijd een health potion
    addItemToInventory(ITEM.healthPotion);
    rewardsAddedThisFight.push(ITEM.healthPotion);

    await slowlyTypeText("Items added to inventory:", 50);

    // Print alle items na deze fight zijn toegevoegd
    for (const item of rewardsAddedThisFight) {
        await slowlyTypeText(item.name, 50);
    }
}