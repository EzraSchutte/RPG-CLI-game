import {doDamageReturnsVoid} from "../utils/utils.js";
import {fight} from "../index.js";
import {processTurn} from "./playerTurn.js";

export async function enemyTurn() {
    // Doe damage tegen de player
    doDamageReturnsVoid();

    // Nu is het de players turn
    fight.playersTurn = true;
    processTurn();
}
