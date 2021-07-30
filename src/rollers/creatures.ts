import { random, sample } from 'lodash';
import { rollUnnaturalEntity } from './dangers';

import { Ability, Activity, Adjective, Age, Alignment, Aspect, Condition, Disposition, Feature, NumAppearing, rollAbility, rollActivity, rollAlignment, rollDisposition, rollFeature, rollNumAppearing, rollOddity, rollSize, Size, Tag } from './details';
import { Npc, rollNpc } from './npcs';

export class Creature {
  constructor(public roll: number = 0, public subroll: number = 0, public specifcroll: number = 0, public type: string = "", public subtype: string = "", public description: string = "") { };

  ability?: Ability;
  activity?: Activity;
  adjective?: Adjective;
  age?: Age;
  alignment?: Alignment;
  aspect?: Aspect;
  condition?: Condition;
  disposition?: Disposition;
  feature?: Feature;
  npc?: Npc;
  numAppearing?: NumAppearing;
  size?: Size;
  tags: Tag[] = [];
}


export function rollCreature(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)) {
  if (roll <= 4) {
    return rollBeast(roll, subroll, specificroll);
  } else if (roll <= 6) {
    let human = new Creature(roll, subroll, specificroll);
    human.type = "human";
    human.npc = rollNpc();
    human.description = human.npc.getDescription(true);
    human.activity = rollActivity();
    human.alignment = rollAlignment();
    human.disposition = rollDisposition();
    human.numAppearing = rollNumAppearing();

    return human;
  } else if (roll <= 8) {
    return rollHumanoid(roll, subroll, specificroll);
  } else if (roll <= 12) {
    return rollMonster();
  }

  return new Creature(roll, subroll, specificroll);
}

export function rollBeast(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)): Creature {
  let creature = new Creature(roll, subroll, specificroll);

  creature.type = "beast";
  creature.activity = rollActivity();
  creature.disposition = rollDisposition();
  creature.numAppearing = rollNumAppearing();
  creature.size = rollSize();

  if (subroll <= 7) {
    creature.subtype = "earthbound";
    creature.description = rollEarthboundBeast(specificroll);
  } else if (subroll <= 10) {
    creature.subtype = "airborne";
    creature.description = rollAirborneBeast(specificroll);
  } else if (subroll <= 12) {
    creature.subtype = "water-going";
    creature.description = rollWaterGoingBeast(specificroll);
  }

  return creature;
}

export function rollEarthboundBeast(roll: number = random(1, 12)): string {
  return [
    sample(["termite", "tick", "louse"]),
    sample(["snail", "slug", "worm"]),
    sample(["ant", "centipede", "scorpion"]),
    sample(["snake", "lizard"]),
    sample(["vole", "rat", "weasel"]),
    sample(["boar", "pig"]),
    sample(["dog", "fox", "wolf"]),
    sample(["cat", "lion", "panther"]),
    sample(["deer", "horse", "camel"]),
    sample(["ox", "rhino"]),
    sample(["bear", "ape", "gorilla"]),
    sample(["mammoth", "dinosaur"])
  ][roll - 1];
}

export function rollAirborneBeast(roll: number = random(1, 12)): string {
  return [
    sample(["mosquito", "firefly"]),
    sample(["locust", "dragonfly", "moth"]),
    sample(["bee", "wasp"]),
    sample(["chicken", "duck", "goose"]),
    sample(["songbird", "parrot"]),
    sample(["gull", "waterbird"]),
    sample(["heron", "crane", "stork"]),
    sample(["crow", "raven"]),
    sample(["hawk", "falcon"]),
    sample(["eagle", "owl"]),
    "condor",
    "pteranodon",
  ][roll - 1];
}

export function rollWaterGoingBeast(roll: number = random(1, 12)): string {
  return [
    "insect",
    sample(["jelly", "anemone"]),
    sample(["clam", "oyster", "snail"]),
    sample(["eel", "snake"]),
    sample(["frog", "toad"]),
    "fish",
    sample(["crab", "lobster"]),
    "turtle",
    sample(["alligator", "crocodile"]),
    sample(["dolphin", "shark"]),
    sample(["squid", "octopus"]),
    "whale",
  ][roll - 1];
}

export function rollHumanoid(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)): Creature {
  let creature = new Creature(roll, subroll, specificroll, "humanoid");

  creature.activity = rollActivity();
  creature.alignment = rollAlignment();
  creature.disposition = rollDisposition();
  creature.numAppearing = rollNumAppearing();
  creature.npc = rollNpc(); /* figure out how to do this */

  if (subroll <= 7) {
    creature.subtype = "common";
    creature.description = rollCommonHumanoid(specificroll);
  } else if (subroll <= 10) {
    creature.subtype = "uncommon";
    creature.description = rollUncommonHumanoid(specificroll);
  } else if (subroll <= 12) {
    creature.subtype = "hybrid";
    creature.description = rollHybridHumanoid(specificroll);
  }

  return creature;
}

export function rollCommonHumanoid(roll: number = random(1, 12)): string {
  if (roll <= 3) {
    return "halfling (small)";
  } else if (roll <= 5) {
    return sample(["goblin", "kobold"]) + " (small)";
  } else if (roll <= 7) {
    return sample(["dwarf", "gnome"]) + " (small)";
  } else if (roll <= 9) {
    return sample(["orc", "hobgoblin", "gnoll"]);
  } else if (roll <= 11) {
    return "elf";
  } else if (roll <= 12) {
    return "half-" + rollCommonHumanoid(random(1, 11));
  }

  return "";
}

export function rollUncommonHumanoid(roll: number = random(1, 12)): string {
  if (roll <= 1) {
    return "fey (tiny)";
  } else if (roll <= 3) {
    return sample(["catfolk", "dogfolk"]);
  } else if (roll <= 6) {
    return sample(["lizardfolk", "merfolk"]);
  } else if (roll <= 7) {
    return "birdfolk";
  } else if (roll <= 10) {
    return sample(["ogre", "troll"]) + " (large)";
  } else if (roll <= 12) {
    return sample(["cyclops", "giant"]) + " (large)";
  }

  return "";
}

export function rollHybridHumanoid(roll: number = random(1, 12)): string {
  if (roll <= 2) {
    return "centaur";
  } else if (roll <= 5) {
    return sample(["werewolf", "werebear"]);
  } else if (roll <= 6) {
    return `werecreature (human + ${rollBeast().description})`;
  } else if (roll <= 10) {
    return `human ${rollBeast().description}`;
  }
  else if (roll <= 12) {
    return `human ${rollBeast().description}-${rollBeast().description}`;
  }

  return "";
}

export function rollMonster(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)): Creature {
  let creature = new Creature(roll, subroll, specificroll, "monster");

  creature.activity = rollActivity();
  creature.alignment = rollAlignment();
  creature.disposition = rollDisposition();
  creature.numAppearing = rollNumAppearing();
  creature.size = rollSize();

  if (subroll <= 7) {
    creature.subtype = "unusual";
    creature.description = rollUnusualMonster(specificroll);
  } else if (roll <= 10) {
    creature.subtype = "rare";
    creature.description = rollRareMonster(specificroll);
  } else if (roll <= 12) {
    creature.subtype = "legendary";
    creature.description = rollLegendaryMonster(specificroll);
  }

  return creature;
}

export function rollUnusualMonster(roll: number = random(1, 12)): string {
  if (roll <= 3) {
    return "plant/fungus";
  } else if (roll <= 5) {
    return "undead human";
  } else if (roll <= 6) {
    return `undead ${rollHumanoid().description}`;
  } else if (roll <= 8) {
    return `${rollBeast().description}-${rollBeast().description}`;
  } else if (roll <= 10) {
    return `${rollBeast().description} with ${rollAbility().description}`;
  } else if (roll <= 12) {
    return `${rollBeast().description} with ${rollFeature().description}`;
  }
  return "";
}

export function rollRareMonster(roll: number = random(1, 12)): string {
  if (roll <= 3) {
    return sample(["slime", "ooze"]) + " (amorphous)";
  } else if (roll <= 6) {
    return "creation (construct)";
  } else if (roll <= 9) {
    return `${rollOddity().description} ${rollBeast().description}`;
  } else if (roll <= 12) {
    return rollUnnaturalEntity().description;
  }
}

export function rollLegendaryMonster(roll: number = random(1, 12)): string {
  if (roll <= 3) {
    return `${sample(["dragon", "colossus"])} (huge)`;
  } else if (roll <= 6) {
    return `${rollUnusualMonster()} (huge)`;
  } else if (roll <= 9) {
    return `${rollRareMonster()} (huge)`;
  } else if (roll <= 10) {
    return `${rollBeast().description} dragon`;
  } else if (roll <= 11) {
    return `${rollUnusualMonster()} dragon`;
  } else if (roll <= 12) {
    return `${rollRareMonster()} dragon`;
  }

  return "";
}
