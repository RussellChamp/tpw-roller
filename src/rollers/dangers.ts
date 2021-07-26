import { random, sample } from 'lodash';
import { Creature, rollCreature } from './creatures';
import { rollOddity } from './details';

export class Danger {
  constructor(public roll: number = 0, public subroll: number = 0, public specificroll: number = 0, public category: string = "", public subcategory: string = "", public description: string = "") { };
  creature?: Creature;
}

export function rollDanger(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)): Danger {

  if (roll <= 1) {
    return rollUnnaturalEntity(roll, subroll, specificroll);
  } else if (roll <= 6) {
    return rollHazard(roll, subroll, specificroll);
  } else if (roll <= 12) {
    return rollDangerCreature(roll);
  }

  return new Danger();
}

export function rollUnnaturalEntity(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)): Danger {
  let danger = new Danger(roll, subroll, specificroll, "unnatural entity");

  if (subroll <= 8) {
    danger.subcategory = "undead";
    danger.description = rollUndeadEntity(specificroll);
  } else if (subroll <= 11) {
    danger.subcategory = "planar";
    danger.description = rollPlanarEntity(specificroll);
  } else if (subroll <= 12) {
    danger.subcategory = "divine";
    danger.description = rollDivineEntity(specificroll);
  }

  return danger;
}

export function rollUndeadEntity(roll: number = random(1, 12)): string {
  if (roll <= 4) {
    return sample(["haunt", "wisp"]);
  } else if (roll <= 8) {
    return sample(["ghost", "spectre"]);
  } else if (roll <= 9) {
    return "banshee";
  } else if (roll <= 11) {
    return sample(["wraith", "wight"]);
  } else if (roll <= 12) {
    return `spirit ${sample(["lord", "master"])}`;
  }
}

export function rollPlanarEntity(roll: number = random(1, 12)): string {
  if (roll <= 3) {
    return "imp (small)";
  } else if (roll <= 6) {
    return "lesser elemental";
  } else if (roll <= 9) {
    return `lesser ${sample(["demon", "horror"])}`;
  } else if (roll <= 10) {
    return "greater elemental";
  } else if (roll <= 11) {
    return `greater ${sample(["demon", "horror"])}`
  } else if (roll <= 12) {
    return `${sample(["devil", "elemental"])} lord`;
  }
}

export function rollDivineEntity(roll: number = random(1, 12)): string {
  if (roll <= 5) {
    return "agent";
  } else if (roll <= 9) {
    return "champion";
  } else if (roll <= 11) {
    return "army (horde)";
  } else if (roll <= 12) {
    return "avatar";
  }
}

export function rollHazard(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)): Danger {
  let danger = new Danger(roll, subroll, specificroll, "hazard");

  if (subroll <= 2) {
    danger.subcategory = "unnatural";
    danger.description = rollUnnaturalHazard(specificroll);
  } else if (subroll <= 10) {
    danger.subcategory = "natural";
    danger.description = rollNaturalHazard(specificroll);
  } else if (subroll <= 12) {
    danger.subcategory = "trap";
    danger.description = rollTrapHazard(specificroll);
  }

  return danger;
}

export function rollUnnaturalHazard(roll: number = random(1, 12)): string {
  if (roll <= 3) {
    return sample(["taint", "blight", "curse"]);
  } else if (roll <= 8) {
    return `arcane ${sample(["trap", "effect"])}`;
  } else if (roll <= 11) {
    return `planar ${sample(["trap", "effect"])}`;
  } else if (roll <= 12) {
    return "divine";
  }

  return "";
}

export function rollNaturalHazard(roll: number = random(1, 12)): string {
  if (roll <= 2) {
    return `blinding ${sample(["mist", "fog"])}`;
  } else if (roll <= 4) {
    return sample(["bog", "mire", "quicksand"]);
  } else if (roll <= 7) {
    return sample(["pitfall", "sinkhole", "chasm"]);
  } else if (roll <= 9) {
    return sample(["poison", "disease"]);
  } else if (roll <= 11) {
    return sample(["flood", "fire", "tornado"]);
  } else if (roll <= 12) {
    return rollOddity().description;
  }

  return "";
}

export function rollTrapHazard(roll: number = random(1, 12)): string {
  if (roll <= 2) {
    return "alarm";
  } else if (roll <= 5) {
    return sample(["ensnaring", "paralyzing"]);
  } else if (roll <= 8) {
    return "injurious (pit, etc.)";
  } else if (roll <= 9) {
    return sample(["gas", "fire", "poison"]);
  } else if (roll <= 12) {
    return "ambush";
  }

  return "";
}

// 1-3		1-2		1-2	
// 4-8		34		3-5	
// 9-11		5-7		6-8	
// 12	divine	8-9		9	
// 		10-11		10-12 ambush
// ASPECT, VISIBILITY		12	ODDITY	CREATURE responsible,
// 				ASPECT, VISIBILITY

export function rollDangerCreature(roll: number = random(1, 12)): Danger {
  let danger = new Danger(roll, 0, 0, "creature");
  danger.creature = rollCreature();

  return danger;
}