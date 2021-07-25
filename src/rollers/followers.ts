import { random, sample, sampleSize, times } from 'lodash';

import { Kingdom, kingdoms } from './data';

export class Follower {
    constructor(public name: string = "") { };
    gender: "male" | "female";
    quality: Quality;
    background: Background;
    tags: Tag[];
    moves: Move[];
    loyalty: Loyalty;
    instinct: Instinct;
    cost: Cost;
    hitPoints: HitPoints;
    armor: Armor;
    damage: Damage;
    loadAndGear: LoadAndGear;
    homeSteading: Homesteading;
}

class Quality {
    constructor(public description: string = "", public value: number = 0, public bonusTags: number = 0) { };
}

class Background {
    constructor(public description: string = "", public bonusTags: number = 0, public tags: Tag[] = [], public bonusQuality: number = 0) { };
}

class Tag {
    constructor(public name: string = "", public description: string = "") { };
}

class Move {
    constructor(public description: string = "") { };
}

class Loyalty {
    constructor(public description: string = "", public value: number = 1) { };
}

class Instinct {
    constructor(public description: string = "") { };
}

class Cost {
    constructor(public name: string = "", public description: string = "") { };
}

class HitPoints {
    constructor(public description: string = "", public value: number = 0) { };
}

class Armor {
    constructor(public description: string = "", public value: number = 0) { };
}

class Damage {
    constructor(public description: string = "", public value: number = 0) { };
}

class LoadAndGear {
    constructor(public limit: number = 2, public gear: string[] = []) { };
}

class Homesteading {
    constructor(public kingdomName: string = "", public homesteadName: string = "") { };
}

export function rollFollower(): Follower {
    let follower = new Follower();
    let kingdom = sample(Object.keys(kingdoms));

    follower.gender = sample(["male", "female"]);
    follower.name = sample(kingdoms[kingdom][follower.gender]);
    follower.quality = rollQuality();
    follower.background = rollBackground();
    follower.quality.value += follower.background.bonusQuality; // this is probably not the best way to do this
    follower.tags = rollTags(follower.background.tags, follower.quality.bonusTags + follower.background.bonusTags);
    follower.moves = rollMoves();
    follower.loyalty = rollLoyalty();
    follower.instinct = rollInstinct();
    follower.cost = rollCost();
    follower.hitPoints = rollHitPoints();
    follower.armor = rollArmor();
    follower.damage = rollDamage();
    follower.loadAndGear = rollLoadAndGear();
    follower.homeSteading = rollHomesteading(kingdoms[kingdom]);

    return follower;
}

function rollQuality(): Quality {
    let roll = random(1, 12);

    if (roll <= 3) {
        return new Quality("a liability", -1, 0);
    } else if (roll <= 9) {
        return new Quality("reasonably competent", 0, 1);
    } else if (roll <= 11) {
        return new Quality("fully capable", 1, 2);
    } else if (roll <= 12) {
        return new Quality("an exception individual", 2, 4);
    }

    return new Quality();
}

function rollBackground(doingBonus: boolean = false): Background {
    let roll = random(1, doingBonus ? 11 : 12);
    if (roll <= 2) {
        return new Background("have lived a life of servitude and oppression", 0, [new Tag("Meek")]);
    } else if (roll <= 3) {
        return new Background("are past their prime", 0, [new Tag("+1 Wise")], -1); // this is probably incorrect. revisit later
    } else if (roll <= 5) {
        return new Background("have lived a life of danger", 2);
    } else if (roll <= 9) {
        return new Background("are otherwise unremarkable");
    } else if (roll <= 10) {
        return new Background("have lived a life of privilige", 1);
    } else if (roll <= 11) {
        return new Background("are a specialist", -2);
    } else if (roll <= 12) {
        let bg1 = rollBackground(true);
        let bg2 = rollBackground(true);

        // this could result in the same bg being selected twice but that's ok for now
        return new Background(`${bg1.description} and ${bg1.description}`, bg1.bonusTags + bg2.bonusTags, [...bg1.tags, ...bg2.tags], bg1.bonusQuality + bg2.bonusQuality);
    }
}

const followerTags: Tag[] = [
    { name: "___-wise", description: "They know all about and can roll +Quality to Spout Lore about it on your behalf. Examples: Woods-wise, Sea-wise, Herb-wise" },
    { name: "Archer", description: "They use ranged attacks (not necessarily bows) effectively and can roll +Quality to Volley on your behalf" },
    { name: "Athletic", description: "They are good at running, jumping, climbing and the like" },
    { name: "Beautiful", description: "They make an impression, drawing admiration and attention" },
    { name: "Cautious", description: "They are careful and methodical; they avoid acting rashly" },
    { name: "Connected (___)", description: "They have friends or contacts in ___, a steading or group" },
    { name: "Cunning", description: "They are clever and observant. They can roll +Quality to Discern Realities on your behalf" },
    { name: "Devious", description: "They are deceitful, treacherous, tricky. Just the sort you want working for you" },
    { name: "Group", description: "They are a team, gang, or mob, with all the strengths and disadvantages that come with greater numbers" },
    { name: "Guide (___)", description: "They knows a particular steading or region and can roll +Quality to Spout Lore, Scout Ahead, or Navigate for the party therein" },
    { name: "Hardy", description: "They are tough, hard-working, and willing to put up with discomfort. They get +2 Load" },
    { name: "Healer", description: "They have the knowledge and ability to provide aid to the injured and the sick. When they tend wounds with bandages or herbs & poultice, add their Quality to damage healed" },
    { name: "Meek", description: "They accept their lowly lot, and will do degrading or unreasonable things without needing to Follow Orders" },
    { name: "Magical", description: "They are magical by nature or training, and sensitive to the workings of magic. Use at least one of their moves to elaborate on their powers" },
    { name: "Organized", description: "They make and follow plans well, and work well in a group. Once they agree to a plan, you do not need to Order Followers as long as the plan doesn't go south" },
    { name: "Self-sufficient", description: "They can live off the land and roll +Quality to Forage" },
    { name: "Stealthy", description: "They can avoid detection and often get the drop on foes" },
    { name: "Warrior", description: "They take +1 to their damage die roll, and you don't need to Order Follower to get them to fight (as long as the opposition is not terrifying or overwhelming)" },
];


function rollTags(backgroundTags: Tag[], tagsCount: number): Tag[] {
    if (tagsCount == 0) {
        return backgroundTags;
    } else {
        // return one "_-wise", any tags added from the background, and then additional tags
        return [followerTags[0], ...backgroundTags, ...sampleSize(followerTags, tagsCount - 1)];
    }
}

function rollMoves(): Move[] {
    // This is really up to the player and GM to determine
    return [
        new Move("1-3 moves determined by the player and GM"),
        new Move("1-3 moves determined by the player and GM"),
        new Move("1-3 moves determined by the player and GM")
    ];
}

function rollLoyalty(): Loyalty {
    // Up to GM
    return new Loyalty();
}

function rollInstinct(): Instinct {
    let roll = random(1, 12);
    if (roll <= 1) {
        return new Instinct("loot, pillage, and burn");
    } else if (roll <= 2) {
        return new Instinct("hold a grudge and seek payback");
    } else if (roll <= 3) {
        return new Instinct("question leadership or authority");
    } else if (roll <= 5) {
        return new Instinct("lord over others");
    } else if (roll <= 7) {
        return new Instinct("act impulsively");
    } else if (roll <= 9) {
        return new Instinct("give in to temptation");
    } else if (roll <= 11) {
        return new Instinct("slack off");
    } else if (roll <= 12) {
        return new Instinct("avoid danger or punishment");
    }

    return new Instinct();
}

function rollCost(): Cost {
    let roll = random(1, 12);
    if (roll <= 1) {
        return new Cost("debauchery", "food, drink, gambling, sex, and mischief. The higher their Loyalty, the more extreme the cost.");
    } else if (roll <= 2) {
        return new Cost("vengeance", "payback against those that have wronged them or their loved ones. The higher their Quality, the more direct and tangible the payback they require.");
    } else if (roll <= 5) {
        return new Cost("lucre", "coin appropriate to their steading's Prosperity; highly skilled followers might demand more coin.");
    } else if (roll <= 7) {
        return new Cost("renown", "public recognition for their deeds and skills. The higher their Quality, the larger the audience required.");
    } else if (roll <= 9) {
        return new Cost("glory", "to defeat a worthy foe in battle. The higher their Quality, the more worthy the foe must be. Possibly limited to certain enemy types (demons, barbarians, etc.).");
    } else if (roll <= 10) {
        return new Cost("affection", "kind words and deeds, quality time and attention. The more extreme their Loyalty, the more affection they require.");
    } else if (roll <= 11) {
        return new Cost("knowledge", "secrets, mysteries, and wonders only found by exploring the wider world.");
    } else if (roll <= 12) {
        return new Cost("good", "suffering alleviated, innocents defended, wrongs righted. The higher their Quality, the greater the good required.");
    }

    return new Cost();
}

function rollHitPoints(): HitPoints {
    let roll = random(1, 12);
    if (roll <= 3) {
        return new HitPoints(sample(["weak", "frail", "soft"]), 3);
    } else if (roll <= 9) {
        return new HitPoints("able-bodied", 6);
    } else if (roll <= 12) {
        return new HitPoints(sample(["tough", "strong", "hard"]), 9);
    }

    return new HitPoints();
}

const armors: Armor[] = [
    { description: "no armor", value: 0 },
    { description: "hide armor", value: 1 },
    { description: "leather armor", value: 1 },
    { description: "scale mail", value: 2 },
    { description: "chain mail", value: 2 },
    { description: "plate mail", value: 3 },
];

function rollArmor(): Armor {
    let armor = sample(armors);
    if (random(1, 2) == 2) {
        armor.description += " and a shield";
        armor.value += 1;
    }

    return armor;
}


function rollDamage(): Damage {
    let roll = random(1, 12);
    if (roll <= 4) {
        return new Damage("are not very dangerous", 4);
    } else if (roll <= 10) {
        return new Damage("can defend themselves", 6);
    } else if (roll <= 12) {
        return new Damage("are a veteran fighter", 8);
    }

    return new Damage();
}

function rollLoadAndGear(limit: number = 2): LoadAndGear {
    // Equip them with whatever is appropriate for the circumstances and prosperity of their home steading
    let load = new LoadAndGear(limit, ["Tools of their trade"]);
    times(limit, () => load.gear.push("Appropriate equipment for the circumstance and homesteading"));

    return load;
}

function rollHomesteading(kingdom: Kingdom): Homesteading {
    // I dunno what this should be but the load&gear section mentioned homesteading

    return new Homesteading(kingdom.description, sample(kingdom.steading));
}