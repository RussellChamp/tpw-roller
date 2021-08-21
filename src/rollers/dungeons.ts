import { random, replace, sample, times } from "lodash";
import { Creature, rollCreature, rollHumanoid, rollMonster } from "./creatures";
import { rollElement, rollOddity } from "./details";

export class Dungeon {
  size: Size;
  ruination: Ruination;
  builder: Builder;
  function: DunFunction;
  commonThemes: Theme[] = [];
  uniqueThemes: Theme[] = [];
  commonAreas: (Discovery | Danger)[] = [];
  uniqueAreas: (Discovery | Danger)[] = [];

  printDescription() {
    return `${this.size.description} ${this.function.description} built by ${this.builder.description}`;
  }
}

export class Size {
  constructor(public roll: number = 0, public description: string = "", public commonThemes: number = 0, public uniqueThemes: number = 0, public commonAreas: number = 0, public uniqueAreas: number = 0) { };
}

export class Ruination {
  constructor(public roll: number = 0, public description: string = "") { };
}

export class Builder {
  constructor(public roll: number = 0, public description: string = "") { };
}

export class DunFunction {
  constructor(public roll: number = 0, public description: string = "") { };
}

export class Theme {
  constructor(public roll: number = 0, public subroll: number = 0, public category: string = "", public description: string = "") { };
}

export class Discovery {
  constructor(public roll: number = 0, public subroll: number = 0, public category: string = "", public description: string = "") { };
  type: string = "discovery";
}

export class Danger {
  constructor(public roll: number = 0, public subroll: number = 0, public category: string = "", public description: string = "") { };
  type: string = "danger";
  creature?: Creature;
}

export function rollDungeon(): Dungeon {
  let dungeon = new Dungeon();
  dungeon.size = rollSize();
  dungeon.ruination = rollRuination();
  dungeon.builder = rollBuilder();
  dungeon.function = rollDunFunction();
  times(dungeon.size.commonThemes, () => dungeon.commonThemes.push(rollTheme()));
  times(dungeon.size.uniqueThemes, () => dungeon.uniqueThemes.push(rollTheme()));
  times(dungeon.size.commonAreas, () => dungeon.commonAreas.push(sample([rollDiscovery, rollDanger])()));
  times(dungeon.size.uniqueAreas, () => dungeon.uniqueAreas.push(sample([rollDiscovery, rollDanger])()));

  return dungeon;
}

function rollSize(roll: number = random(1, 12)): Size {
  if (roll <= 3) {
    return new Size(roll, "small", 2, random(1, 4), 6, random(1, 6 + 2));
  } else if (roll <= 9) {
    return new Size(roll, "medium", 3, random(1, 6), 12, random(1, 6) + random(1, 6) + 4);
  } else if (roll <= 11) {
    return new Size(roll, "large", 4, random(1, 6) + 1, 16, random(1, 6) + random(1, 6) + random(1, 6) + 6);
  } else if (roll <= 12) {
    return new Size(roll, "huge", 5, random(1, 6) + 2, 24, random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6) + 10);
  }

  return new Size(roll);
}

function rollRuination(roll: number = random(1, 12)): Ruination {

  if (roll <= 1) {
    return new Ruination(roll, "arcane disaster");
  } else if (roll <= 2) {
    return new Ruination(roll, "damnation/curse");
  } else if (roll <= 4) {
    return new Ruination(roll, "earthquake/fire/flood");
  } else if (roll <= 6) {
    return new Ruination(roll, "plague/famine/drought");
  } else if (roll <= 8) {
    return new Ruination(roll, "overrun by monsters");
  } else if (roll <= 10) {
    return new Ruination(roll, "war/invasion");
  } else if (roll <= 11) {
    return new Ruination(roll, "depleted resources");
  } else if (roll <= 12) {
    return new Ruination(roll, "better prospects elsewhere");
  }
  return new Ruination(roll);
}

function rollBuilder(roll: number = random(1, 12)): Builder {
  if (roll <= 1) {
    return new Builder(roll, sample(["aliens", "precursors"]));
  } else if (roll <= 2) {
    return new Builder(roll, sample(["a demigod", "a demon"]));
  } else if (roll <= 3) {
    return new Builder(roll, "natural means (caves, etc.)");
  } else if (roll <= 5) {
    return new Builder(roll, sample(["a religious order", "a cult"]));
  } else if (roll <= 6) {
    return new Builder(roll, `a ${rollHumanoid().description}`);
  } else if (roll <= 8) {
    return new Builder(roll, sample(["dwarves", "gnomes"]));
  } else if (roll <= 10) {
    return new Builder(roll, "elves");
  } else if (roll <= 11) {
    return new Builder(roll, sample(["a wizard", "a madman"]));
  } else if (roll <= 12) {
    return new Builder(roll, sample(["a monarch", "a warlord"]));
  }

  return new Builder(roll);
}

function rollDunFunction(roll: number = random(1, 12)): DunFunction {
  if (roll <= 1) {
    return new DunFunction(roll, sample(["source", "portal"]));
  } else if (roll <= 2) {
    return new DunFunction(roll, "mine");
  } else if (roll <= 4) {
    return new DunFunction(roll, sample(["tomb", "crypt"]));
  } else if (roll <= 5) {
    return new DunFunction(roll, "prison");
  } else if (roll <= 7) {
    return new DunFunction(roll, sample(["lair", "den", "hideout"]));
  } else if (roll <= 9) {
    return new DunFunction(roll, sample(["stronghold", "sanctuary"]));
  } else if (roll <= 10) {
    return new DunFunction(roll, sample(["shrine", "temple", "oracle"]));
  } else if (roll <= 11) {
    return new DunFunction(roll, sample(["archive", "library"]));
  } else if (roll <= 12) {
    return new DunFunction(roll, sample(["unknown", "mystery"]));
  }

  return new DunFunction(roll);
}

function rollTheme(roll: number = random(1, 12), subroll: number = random(1, 12)): Theme {
  if (roll <= 5) {
    return rollMundaneTheme(roll, subroll);
  } else if (roll <= 9) {
    return rollUnusualTheme(roll, subroll);
  } else if (roll <= 12) {
    return rollExtraordinaryTheme(roll, subroll);
  }

  return new Theme(roll, subroll);
}

function rollMundaneTheme(roll: number = random(1, 12), subroll: number = random(1, 12)): Theme {
  return new Theme(roll, subroll, "mundane", [
    "rot / decay",
    "torture / agony",
    "madness",
    "all is lost",
    "noble sacrifice",
    "savage fury",
    "survival",
    "criminal activity",
    "secrets / treachery",
    "tricks and traps",
    "invasion / infestation",
    "factions at war",
  ][subroll - 1]);
}

function rollUnusualTheme(roll: number = random(1, 12), subroll: number = random(1, 12)): Theme {
  return new Theme(roll, subroll, "unusual", [
    "creation / invention",
    `elemental ${rollElement().description}`,
    "knowledge / learning",
    "growth / expansion",
    "deepening mystery",
    "transformation / change",
    "chaos and destruction",
    "shadowy forces",
    "forbidden knowledge",
    "poison / disease	10",
    "corruption / blight",
    "impending disaster",
  ][subroll - 1]);
}

function rollExtraordinaryTheme(roll: number = random(1, 12), subroll: number = random(1, 12)): Theme {
  return new Theme(roll, subroll, "extraordinary", [
    "scheming evil",
    "divination / scrying",
    "blasphemy",
    "arcane research",
    "occult forces",
    "an ancient curse",
    "mutation",
    "the unquiet dead",
    "bottomless hunger",
    "incredible power",
    "unspeakable horrors",
    "holy war",
  ][subroll - 1]);
}

function rollDiscovery(roll: number = random(1, 12), subroll: number = random(1, 12)): Discovery {
  if (roll <= 3) {
    return rollDiscoveryDressing(roll, subroll);
  } else if (roll <= 9) {
    return rollDiscoveryFeature(roll, subroll);
  } else if (roll <= 12) {
    return rollDiscoveryFind(roll, subroll);
  }

  return new Discovery(roll, subroll);
}

function rollDiscoveryDressing(roll: number = random(1, 12), subroll: number = random(1, 12)): Discovery {
  return new Discovery(roll, subroll, "dressing", [
    sample(["junk", "debris"]),
    sample(["tracks", "marks"]),
    "signs of battle",
    sample(["writing", "carving"]),
    "warning",
    `dead ${rollCreature().description}`,
    sample(["bones", "remains"]),
    sample(["book", "scroll", "map"]),
    sample(["broken door", "broken wall"]),
    sample(["breeze", "wind", "smell"]),
    sample(["lichen", "moss", "fungus"]),
    rollOddity().description,
  ][subroll - 1]);
}

function rollDiscoveryFeature(roll: number = random(1, 12), subroll: number = random(1, 12)): Discovery {
  return new Discovery(roll, subroll, "feature", [
    sample(["cave-in", "collapse"]),
    sample(["pit", "shaft", "chasm"]),
    sample(["pillars", "columns"]),
    sample(["locked door", "gate"]),
    sample(["alcoves", "niches"]),
    sample(["bridge", "stairs", "ramp"]),
    sample(["fountain", "well", "pool"]),
    "puzzle",
    sample(["altar", "dais", "platform"]),
    sample(["statue", "idol"]),
    sample(["magic pool", "statue", "idol"]),
    "connection to another dungeon",
  ][subroll - 1]);
}

function rollDiscoveryFind(roll: number = random(1, 12), subroll: number = random(1, 12)): Discovery {
  var find = [
    "trinkets",
    "tools",
    sample(["weapons", "armor"]),
    sample(["supplies", "trade goods"]),
    sample(["coins", "gems", "jewelry"]),
    sample(["poisons", "potions"]),
    sample(["adventurer", "captive"]),
    "magic item",
    sample(["scroll", "book"]),
    sample(["magic weapon", "magic armor"]),
    "artifact",
    "[FIND] and [FIND]",
  ][subroll - 1];
  find = replace(find, /\[FIND\]/g, () => rollDiscovery(random(1, 11)).description);

  return new Discovery(roll, subroll, "find", find);
}


function rollDanger(roll: number = random(1, 12), subroll: number = random(1, 12)): Danger {
  if (roll <= 4) {
    return rollDangerTrap(roll, subroll);
  } else if (roll <= 11) {
    return rollDangerCreature(roll, subroll);
  } else if (roll <= 12) {
    return rollDangerEntity(roll, subroll);
  }

  return new Danger(roll, subroll);
}

function rollDangerTrap(roll: number = random(1, 12), subroll: number = random(1, 12)): Danger {
  let trap = [
    "alarm",
    sample(["ensnaring", "paralyzing"]),
    "pit",
    "crushing",
    sample(["piercing", "puncturing"]),
    sample(["chopping", "slashing"]),
    "confusing(maze, etc.)",
    "gas(poison, etc.)",
    rollElement().description,
    "ambush",
    "magical",
    "[TRAP] and [TRAP]",
  ][subroll - 1];
  trap = replace(trap, /\[TRAP\]/g, () => rollDangerTrap(random(1, 11)).description);

  return new Danger(roll, subroll, "trap", trap);
}

function rollDangerCreature(roll: number = random(1, 12), subroll: number = random(1, 12)): Danger {
  let creature = rollCreature();
  let activity = [
    "waiting in ambush",
    sample(["fighting", "squabbling"]),
    sample(["prowling", "on patrol"]),
    "looking for food",
    sample(["eating", "resting"]),
    "guarding",
    "on the move",
    sample(["searching", "scavenging"]),
    "returning to den",
    "making plans",
    "sleeping",
    "dying",
  ][subroll - 1];
  let danger = new Danger(roll, subroll, "creture", `${creature.description} that is ${activity}`);
  danger.creature = creature;

  return danger;
}

function rollDangerEntity(roll: number = random(1, 12), subroll: number = random(1, 12)): Danger {
  return new Danger(roll, subroll, "entity", [
    "alien interloper",
    "vermin lord",
    "criminal mastermind",
    "warlord",
    "high priest",
    "oracle",
    sample(["wizard", "witch", "alchemist"]),
    `${rollMonster().description} lord`,
    sample(["evil spirit", "ghost"]),
    sample(["undead lord", "lich"]),
    "demon",
    "dark god",
  ][subroll - 1]);
}
