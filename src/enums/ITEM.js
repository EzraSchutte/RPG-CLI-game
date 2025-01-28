import {ITEMTYPE} from "./ITEMTYPE.js";
import kleur from "kleur";

const stick = {
    name: kleur.green("Stick"),
    damage: 10,
    itemType: ITEMTYPE.weapon,
};

const diamondSword = {
    name: kleur.cyan("Diamond Sword"),
    damage: 30,
    itemType: ITEMTYPE.weapon,
};

const healthPotion = {
    name: kleur.red("Health Potion"),
    health: 25,
    itemType: ITEMTYPE.potion,
};

const bigHealthPotion = {
    name: kleur.red("Big health potion"),
    health: 200,
    itemType: ITEMTYPE.potion,
}

// Constant values voor de items
export const ITEM = {
    stick: stick,
    diamondSword: diamondSword,
    healthPotion: healthPotion,
    bigHealthPotion: bigHealthPotion,
}
