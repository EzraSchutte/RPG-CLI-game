import {ITEM} from "./ITEM.js";

const slime = {
    name: "Slime",
    hp: 40,
    shield: 40,
    damage: 10,
    xpGained: 25,
    dialog: [
        "A wild slime has appeared!",
        "Squish... squish...",
        "Gloop... gloop...",
        "Plop-plop!"
    ],
    rewards: []
};

const skeleton = {
    name: "Skeleton",
    hp: 100,
    shield: 0,
    damage: 15,
    xpGained: 75,
    dialog: [
        "A wild skeleton saw you...",
        "Clink... clink...",
        "Rattle-rattle...",
        "Creeeak...",
        "Hollow... clack..."
    ],
    rewards: [
        ITEM.stick
    ]
};

const babyBoss = {
    name: "Baby Boss",
    hp: 50,
    shield: 10,
    damage: 50,
    xpGained: 125,
    dialog: [
        "Goo-goo? No, goo-bye!",
        "Who's the boss? Me!",
        "Nap time? Overrated.",
        "Get ready for a tantrum!",
        "Peek-a-boo! I see you!",
        "Mama didn’t raise no quitter!",
        "Wah-wah? More like ha-ha!",
        "Don’t let the pacifier fool ya.",
        "I’m about to rattle your world!",
        "You’re in timeout now!",
        "Milk break? After I win.",
        "This diaper? Full of strategy.",
        "Coo-coo? No, coup d'état!",
        "Crybaby? Never heard of him.",
        "Let me show you how a boss rolls!"
    ],
    rewards: [
        ITEM.bigHealthPotion,
    ]
};

const pickachu = {
    name: "Pickachu",
    hp: 150,
    shield: 50,
    damage: 25,
    xpGained: 50,
    dialog: [
        "Pika... pika...",
        "Chu~",
        "Pi-pi-pi!",
        "Pika-piii...",
        "Pika-pika!",
        "Chuu-chu-chu!",
        "Pikaaaa!",
        "Pi-chu!",
        "Piii-ka-CHUUUUU!",
        "Pika! Pika-pika!",
        "Chu... PIKA-CHUU!",
        "Piiiii-CHAAK!",
        "Pika... pika...",
        "Chu...",
        "Pikaaaa...",
        "Pi...ka-chu..."
    ],
    rewards: [
        ITEM.bigHealthPotion,
        ITEM.diamondSword,
    ]
};

const evilNatas = {
    name: "Evil Natas",
    hp: 500,
    shield: 250,
    damage: 40,
    xpGained: 100,
    dialog: [
        "You ran into the evil natas",
        "I'm gonna genshin you!",
        "GOON MAX!!!!",
        "HERE'S COMES MY WINTER ARC!!!",
        "CHECK MIJN LITOUWSE DANS"
    ],
    rewards: [
        ITEM.bigHealthPotion,
    ]
};

const mikaTheExiled = {
    name: "Mika the Exiled",
    hp: 500,
    shield: 100,
    damage: 75,
    xpGained: 50,
    dialog: [
        "Wat doe jij hier jij gaat het krijgen! - says Mika the Exiled",
        "Pas op of ik klap je met die jonko g",
        "mika heeft je gedrogeerd",
        "mika gooit een joint",
        "klap de jonko voordat die jou klapt",
    ],
    rewards: []
};

const eyyabThePredator = {
    name: "Eyyab The Predator",
    hp: 500,
    shield: 250,
    damage: 50,
    xpGained: 100,
    dialog: [
        "Fight the last boss: Eyyab The Predator",
        "I'm going to tickle you..."
    ],
    rewards: []
};

// Constant values voor de enemies
export const ENEMY = {
    slime: slime,
    skeleton: skeleton,
    babyBoss: babyBoss,
    pickachu: pickachu,
    evilNatas: evilNatas,
    mikaTheExiled: mikaTheExiled,
    eyyabThePredator: eyyabThePredator,
};