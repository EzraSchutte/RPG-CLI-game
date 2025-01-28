import {startGame} from "./promptScripts/startup.js";
import {printFiglet} from "./utils/utils.js";
import {viewStats} from "./promptScripts/options.js";

export let player = {};
export const debug = false;
export let fight = {};

console.clear();

await printFiglet("Welcome to RPG-CLI");

await startGame();


// Deze functie eindigt de game met ascii art en viewed de laatste stats
export async function finishedGame() {
    await printFiglet("Game completed!");
    await viewStats("Loading lasts one last time.....");
}

// Deze functie returned true als de player klaar is met de game/alle enemies verslagen
export function playerFinishedGame() {
    return player.progression >= player.storyline.enemies.length;
}