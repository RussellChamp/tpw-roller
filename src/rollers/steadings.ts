import { random, sample } from 'lodash';
import { Creature, rollCreature } from './creatures';
import type { Kingdom } from './kingdoms';

export class Benefit {
  constructor(public description: string, public tags: string[] = []) { };
}

export class Problem {
  constructor(public description: string, public tags: string[] = []) { };
}

export class Steading {
  constructor(public roll: number = 0, public category: string = "", public description: string = "", public benefitRoll: number = 0, public problemRoll: number = 0) { };
  builtBy: Creature;
  condition: string;
  kingdom: Kingdom;
  oathSteading?: Steading;
  tags: string[];
  benefit: Benefit;
  problem: Problem;
}

// TODO: This section is gonna need a lot of work
export function rollSteading(roll: number = random(1, 12), benefitRoll: number = random(1, 12), problemRoll: number = random(1, 12)): Steading {
  let steading = new Steading();

  if (roll <= 5) {
    steading = rollVillage(benefitRoll, problemRoll);
  } else if (roll <= 8) {
    steading = rollTown(benefitRoll, problemRoll);
  } else if (roll <= 11) {
    steading = rollKeep(benefitRoll, problemRoll);
  } else if (roll <= 12) {
    steading = rollCity(benefitRoll, problemRoll);
  }

  steading.builtBy = rollCreature(random(1, 4) + 4);
  steading.roll = roll;

  return steading;
}


export function rollVillage(benefitRoll: number = random(1, 12), problemRoll: number = random(1, 12)): Steading {
  let steading = new Steading(0, "village", "village", benefitRoll, problemRoll);
  steading.tags = ["poor", "steady", "militia", "resource(GM choice)", "Oath(steading of GM's choice)"];
  steading.condition = "If the village is part of a kingdom or empire";

  if (benefitRoll <= 3) {
    steading.benefit = new Benefit("natural defenses", ["safe", "-defenses"]);
  } else if (benefitRoll <= 6) {
    steading.benefit = new Benefit("abundant resources", ["+prosperity", "resource(GM choice)", "enmity(GM choice)"]);
  } else if (benefitRoll <= 8) {
    steading.oathSteading = new Steading();
    steading.benefit = new Benefit("protected by another steading", ["oath(that steading)", "+defenses"]);
  } else if (benefitRoll <= 10) {
    steading.benefit = new Benefit("on a major road", ["trade(GM choice)", "+prosperity"]);
  } else if (benefitRoll <= 11) {
    steading.benefit = new Benefit("built around a wizard's tower", ["personage (the wizard)", "blight (arcane creatures)"]);
  } else if (benefitRoll <= 12) {
    steading.benefit = new Benefit("built on a site of religious significance", ["divine", "history(GM choice)"]);
  }

  if (problemRoll <= 2) {
    steading.problem = new Problem("surrounded by and or uncultivable land", ["need (food)"]);
  } else if (problemRoll <= 4) {
    steading.problem = new Problem("dedicated to a deity", ["religious(that deity)", "enmity (steading of opposing deity)"]);
  } else if (problemRoll <= 6) {
    steading.problem = new Problem("recently at war", ["-population", "-prosperity if they fought to the end", "-defenses if they lost"]);
  } else if (problemRoll <= 8) {
    steading.problem = new Problem("monster problem", ["blight (that monster)", "need (adventurers)"]);
  } else if (problemRoll <= 10) {
    steading.problem = new Problem("absorbed another village", ["+population", "lawless"]);
  } else if (problemRoll <= 12) {
    steading.problem = new Problem("remote or unwelcoming", ["-prosperity", "dwarven or elven or other non-human"]);
  }

  return steading;
}

export function rollTown(benefitRoll: number = random(1, 12), problemRoll: number = random(1, 12)): Steading {
  let steading = new Steading(0, "town", "town", benefitRoll, problemRoll);
  steading.tags = ["moderate", "steady", "watch", "trade (with 2 places of GM's choice)"];
  steading.condition = "if the town is listed as Trade by another steading";

  if (benefitRoll <= 1) {
    steading.benefit = new Benefit("booming", ["booming", "lawless"]);
  } else if (benefitRoll <= 3) {
    steading.benefit = new Benefit("at a crossroads", ["market", "+prosperity"]);
  } else if (benefitRoll <= 5) {
    steading.oathSteading = new Steading();
    steading.benefit = new Benefit("defended by another steading", ["oath (that steading)", "+defenses"]);
  } else if (benefitRoll <= 7) {
    steading.benefit = new Benefit("built around a church", ["power(divine)"]);
  } else if (benefitRoll <= 10) {
    steading.benefit = new Benefit("built around a craft", ["craft (your choice)", "resource (something required for that craft)"]);
  } else if (benefitRoll <= 12) {
    steading.benefit = new Benefit("built around a military post", ["+Defenses"]);
  }

  if (problemRoll <= 2) {
    steading.problem = new Problem("outgrowing a vital resource", ["need (that resource)", "trade (a steading with that resource)"]);
  } else if (problemRoll <= 4) {
    steading.problem = new Problem("offers defense to others", ["oath (GM choice)", "-defenses"]);
  } else if (problemRoll <= 6) {
    steading.problem = new Problem("outlaw rumored to live there", ["personage (the outlaw)", "enmity (steading preyed upon)"]);
  } else if (problemRoll <= 8) {
    steading.problem = new Problem("controls a good / service", ["exotic (that good / service)", "enmity (steading with ambition)"]);
  } else if (problemRoll <= 10) {
    steading.problem = new Problem("suffers from disease", ["-population"]);
  } else if (problemRoll <= 12) {
    steading.problem = new Problem("popular meeting place", ["+population", "lawless"]);
  }

  return steading;
}

export function rollKeep(benefitRoll: number = random(1, 12), problemRoll: number = random(1, 12)): Steading {
  let steading = new Steading(0, "keep", "keep", benefitRoll, problemRoll);
  steading.tags = ["poor", "shrinking", "guard", "need (supplies)", "trade (someplace with supplies)", "oath (GM's choice)"];
  steading.condition = "if the keep is owed fealty by at least one other steading";

  if (benefitRoll <= 2) {
    steading.benefit = new Benefit("belongs to a noble family", ["+prosperity", "power (political)"]);
  } else if (benefitRoll <= 4) {
    steading.benefit = new Benefit("run by a skilled commander", ["personage (the commander)", "+defenses"]);
  } else if (benefitRoll <= 6) {
    steading.benefit = new Benefit("stands watch over a trade road", ["+prosperity", "guild (trade)"]);
  } else if (benefitRoll <= 8) {
    steading.benefit = new Benefit("used to train special troops", ["arcane", "-population"]);
  } else if (benefitRoll <= 10) {
    steading.benefit = new Benefit("surrounded by fertile land", ["remove need (supplies)"]);
  } else if (benefitRoll <= 12) {
    steading.benefit = new Benefit("stands on a border", ["+defenses", "enmity (steading on the other side of the border)"]);
  }

  if (problemRoll <= 3) {
    steading.problem = new Problem("built on a naturally defensible position", ["safe", "-population"]);
  } else if (problemRoll <= 4) {
    steading.problem = new Problem("formerly occupied by another power", ["enmity (steadings of that power)"]);
  } else if (problemRoll <= 5) {
    steading.problem = new Problem("safe haven for brigands", ["lawless"]);
  } else if (problemRoll <= 6) {
    steading.problem = new Problem("built to defend from a specific threat", ["blight (that threat)"]);
  } else if (problemRoll <= 7) {
    steading.problem = new Problem("has seen horrible bloody war", ["history (battle), blight (restless spirits)"]);
  } else if (problemRoll <= 8) {
    steading.problem = new Problem("is given the worst of the worst", ["need (skilled recruits)"]);
  } else if (problemRoll <= 10) {
    steading.problem = new Problem("suffers from disease", ["-population"]);
  } else if (problemRoll <= 12) {
    steading.problem = new Problem("popular meeting place", ["+population, -law"]);
  }

  return steading;
}

export function rollCity(benefitRoll: number = random(1, 12), problemRoll: number = random(1, 12)): Steading {
  let steading = new Steading(0, "city", "city");
  steading.tags = ["moderate", "steady", "guard", "market", "guild (GM's choice)", "2+ oaths (steadings of GM's choice)"];
  steading.condition = "if the city has trade with and fealty from at least 1 steading";

  if (benefitRoll <= 3) {
    steading.benefit = new Benefit("permanent defenses, such as walls", ["+defenses", "oath (GM's choice)"]);
  } else if (benefitRoll <= 6) {
    steading.benefit = new Benefit("ruled by a single individual", ["personage (the ruler)", "power (political)"]);
  } else if (benefitRoll <= 7) {
    steading.benefit = new Benefit("diverse", ["dwarven or elven or both"]);
  } else if (benefitRoll <= 10) {
    steading.benefit = new Benefit("trade hub", ["trade (every nearby steading)", "+prosperity"]);
  } else if (benefitRoll <= 11) {
    steading.benefit = new Benefit("ancient, built on top of its own ruins", ["history (your choice)", "divine"]);
  } else if (benefitRoll <= 12) {
    steading.benefit = new Benefit("center of learning", ["arcane", "craft (your choice)", "power(arcane)"]);
  }

  if (problemRoll <= 3) {
    steading.problem = new Problem("outgrown its resources", ["+population", "need (food)"]);
  } else if (problemRoll <= 6) {
    steading.problem = new Problem("designs on nearby territory", ["enmity (nearby steadings)", "+defenses"]);
  } else if (problemRoll <= 8) {
    steading.problem = new Problem("ruled by a theocracy", ["-defenses", "power (divine)"]);
  } else if (problemRoll <= 10) {
    steading.problem = new Problem("ruled by the people", ["-defenses", "+population"]);
  } else if (problemRoll <= 11) {
    steading.problem = new Problem("supernatural defenses", ["+defenses", "blight (related supernatural creatures)"]);
  } else if (problemRoll <= 12) {
    steading.problem = new Problem("occupies a place of power", ["arcane", "personage (whoever watches the place of power)", "blight (arcane creatures)"]);
  }

  return steading;
}