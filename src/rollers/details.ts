import { random, replace, sample, sampleSize } from "lodash";

export type DetailType = "ability" | "activity" | "adjective" | "age" | "alignment" | "aspect" | "condition" | "disposition" | "element" |
  "feature" | "magic type" | "num appearing" | "oddity" | "orientation" | "ruination" | "size" | "tag" | "terrain" | "visibility";

// This is the general implemenetation of details.
// We are not doing strict class inheritance because that way leads to pain
export class Detail {
  constructor(public type: DetailType, public roll: number, public description: string) { }
}

export function rollDetail(type: DetailType): { type: DetailType, roll: number, description: string } {
  switch (type) {
    case "ability": return rollAbility();
    case "activity": return rollActivity();
    case "adjective": return rollAdjective();
    case "age": return rollAge();
    case "alignment": return rollAlignment();
    case "aspect": return rollAspect();
    case "condition": return rollCondition();
    case "disposition": return rollDisposition();
    case "element": return rollElement();
    case "feature": return rollFeature();
    case "magic type": return rollMagicType();
    case "num appearing": return rollNumAppearing();
    case "oddity": return rollOddity();
    case "orientation": return rollOrientation();
    case "ruination": return rollRuination();
    case "size": return rollSize();
    case "tag": return rollTag();
    case "terrain": return rollTerrain();
    case "visibility": return rollVisibility();
    default: return { type: type, roll: 0, description: "invalid type" };
  }
}

export class Ability {
  type: DetailType = "ability";
  constructor(public roll: number = 0, public description = "") { };
}

export function rollAbility(roll: number = random(1, 12)): Ability {
  let ability = new Ability(roll);
  ability.description = [
    sample(["bless", "curse"]),
    sample(["entangle", "trap", "snare"]),
    sample(["poison", "disease"]),
    sample(["paralyze", "petrify"]),
    sample(["mimic", "camouflage"]),
    sample(["seduce", "hypnotize"]),
    sample(["dissolve", "disintegrate"]),
    rollMagicType().description,
    sample(["drain life", "drain magic"]),
    `immunity to ${rollElement().description}`,
    sample(["read minds", "control minds"]),
    "[ABILITY] and [ABILITY]"
  ][roll - 1];
  ability.description = replace(ability.description, /\[ABILITY\]/g, () => rollAbility(random(1, 11)).description);

  return ability;
}

export class Activity {
  type: DetailType = "activity";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollActivity(roll: number = random(1, 12)): Activity {
  let activity = new Activity(roll);
  activity.description = [
    sample(["laying trap", "ambush"]),
    sample(["fighting", "at war"]),
    sample(["prowling", "on patrol"]),
    sample(["hunting", "foraging"]),
    sample(["eating", "resting"]),
    sample(["crafting", "praying"]),
    sample(["traveling", "relocating"]),
    sample(["exploring", "lost"]),
    "returning home",
    sample(["building", "excavating"]),
    "sleeping",
    "dying",
  ][roll - 1];

  return activity;
}

export class Adjective {
  type: DetailType = "adjective";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollAdjective(roll: number = random(1, 12)): Adjective {
  let adjective = new Adjective(roll);
  adjective.description = [
    sample(["slick", "slimy"]),
    sample(["rough", "hard", "sharp"]),
    sample(["smooth", "soft", "dull"]),
    sample(["corroded", "rusty"]),
    sample(["rotten", "decaying"]),
    sample(["broken", "brittle"]),
    sample(["stinking", "smelly"]),
    sample(["weak", "thin", "drained"]),
    sample(["strong", "fat", "full"]),
    sample(["pale", "poor", "shallow"]),
    sample(["dark", "rich", "deep"]),
    "colorful",
  ][roll - 1];

  return adjective;
}

export class Age {
  type: DetailType = "age";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollAge(roll: number = random(1, 12)): Age {
  let age = new Age(roll);

  if (roll <= 1) {
    age.description = "being born/built";
  } else if (roll <= 4) {
    age.description = "young/recent";
  } else if (roll <= 7) {
    age.description = "middle-aged";
  } else if (roll <= 9) {
    age.description = "old";
  } else if (roll <= 11) {
    age.description = "ancient";
  } else if (roll <= 12) {
    age.description = "pre-historic";
  }

  return age;
}

export class Alignment {
  type: DetailType = "alignment";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollAlignment(roll: number = random(1, 12)): Alignment {
  let alignment = new Alignment(roll);

  if (roll <= 2) {
    alignment.description = "chaotic";
  } else if (roll <= 4) {
    alignment.description = "evil";
  } else if (roll <= 8) {
    alignment.description = "neutral";
  } else if (roll <= 10) {
    alignment.description = "good";
  } else if (roll <= 12) {
    alignment.description = "lawful";
  }

  return alignment;
}

export class Aspect {
  type: DetailType = "aspect";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollAspect(roll: number = random(1, 12)): Aspect {
  let aspect = new Aspect(roll);
  aspect.description = [
    sample(["power", "strength"]),
    sample(["trickery", "dexterity"]),
    sample(["time", "constitution"]),
    sample(["knowledge", "intelligence"]),
    sample(["nature", "wisdom"]),
    sample(["culture", "charisma"]),
    sample(["war", "lies", "discord"]),
    sample(["peace", "truth", "balance"]),
    sample(["hate", "envy"]),
    sample(["love", "admiration"]),
    rollElement().description,
    "[ASPECT] and [ASPECT]"
  ][roll - 1];
  aspect.description = replace(aspect.description, /\[ASPECT\]/g, () => rollAspect(random(1, 11)).description);

  return aspect;
}

export class Condition {
  type: DetailType = "condition";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollCondition(roll: number = random(1, 12)): Condition {
  let condition = new Condition(roll);

  if (roll <= 1) {
    condition.description = sample(["being built", "being born"]);
  } else if (roll <= 4) {
    condition.description = sample(["intact", "healthy", "stable"]);
  } else if (roll <= 7) {
    condition.description = sample(["occupied", "active", "alert"]);
  } else if (roll <= 9) {
    condition.description = sample(["worn", "tired", "weak"]);
  } else if (roll <= 10) {
    condition.description = sample(["vacant", "lost"]);
  } else if (roll <= 11) {
    condition.description = sample(["ruined", "defiled", "dying"]);
  } else if (roll <= 12) {
    condition.description = sample(["disappeared", "dead"]);
  }

  return condition;
}

export class Disposition {
  type: DetailType = "disposition";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollDisposition(roll: number = random(1, 12)): Disposition {
  let disposition = new Disposition(roll);

  if (roll <= 1) {
    disposition.description = "attacking";
  } else if (roll <= 4) {
    disposition.description = sample(["hostile", "aggressive"]);
  } else if (roll <= 6) {
    disposition.description = sample(["cautious", "doubtful"]);
  } else if (roll <= 7) {
    disposition.description = sample(["fearful", "fleeing"]);
  } else if (roll <= 10) {
    disposition.description = "neutral";
  } else if (roll <= 11) {
    disposition.description = sample(["curious", "hopeful"]);
  } else if (roll <= 12) {
    disposition.description = "friendly";
  }

  return disposition;
}

export class Element {
  type: DetailType = "element";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollElement(roll: number = random(1, 12)): Element {
  let element = new Element(roll);

  if (roll <= 2) {
    element.description = "air";
  } else if (roll <= 4) {
    element.description = "earth";
  } else if (roll <= 6) {
    element.description = "fire";
  } else if (roll <= 8) {
    element.description = "water";
  } else if (roll <= 10) {
    element.description = "life";
  } else if (roll <= 12) {
    element.description = "death";
  }

  return element;
}

export class Feature {
  type: DetailType = "feature";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollFeature(roll: number = random(1, 12)): Feature {
  let feature = new Feature(roll);

  if (roll <= 1) {
    feature.description = "heavily armored";
  } else if (roll <= 3) {
    feature.description = "winged/flying";
  } else if (roll <= 4) {
    feature.description = sample(["multiple heads", "headless"]);
  } else if (roll <= 5) {
    feature.description = sample(["many eyes", "one eye"]);
  } else if (roll <= 6) {
    feature.description = sample(["many limbs", "tails"]);
  } else if (roll <= 7) {
    feature.description = sample(["tentacles", "tendrils"]);
  } else if (roll <= 8) {
    feature.description = rollAspect().description;
  } else if (roll <= 9) {
    feature.description = rollElement().description;
  } else if (roll <= 10) {
    feature.description = rollMagicType().description;
  } else if (roll <= 11) {
    feature.description = rollOddity().description;
  } else if (roll <= 12) {
    feature.description = `${rollFeature(random(1, 11)).description} and ${rollFeature(random(1, 11)).description}`;
  }

  return feature;
}

export class MagicType {
  type: DetailType = "magic type";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollMagicType(roll: number = random(1, 12)): MagicType {
  let magicType = new MagicType(roll);
  if (roll <= 2) {
    magicType.description = "divination";
  } else if (roll <= 4) {
    magicType.description = "enchantment";
  } else if (roll <= 6) {
    magicType.description = "evocation";
  } else if (roll <= 8) {
    magicType.description = "illusion";
  } else if (roll <= 10) {
    magicType.description = "necromancy";
  } else if (roll <= 12) {
    magicType.description = "summoning";
  }

  return magicType;
}

export class NumAppearing {
  type: DetailType = "num appearing";
  constructor(public roll: number = 0, public description: string = "", public count: string = "") { };
}

export function rollNumAppearing(roll: number = random(1, 12)): NumAppearing {
  let numAppearing = new NumAppearing(roll);
  if (roll <= 4) {
    numAppearing.description = "solitary";
    numAppearing.count = "1";
  } else if (roll <= 9) {
    numAppearing.description = "group";
    numAppearing.count = "1d6+2";
  } else if (roll <= 12) {
    numAppearing.description = "horde";
    numAppearing.count = "4d6 per wave";
  }

  return numAppearing;
}

export class Oddity {
  type: DetailType = "oddity";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollOddity(roll: number = random(1, 12)): Oddity {
  let oddity = new Oddity(roll);
  oddity.description = [
    sample(["weird color", "smell", "sound"]),
    "geometric",
    sample(["web", "network", "system"]),
    sample(["crystalline", "glass-like"]),
    "fungal",
    sample(["gaseous", "smokey"]),
    sample(["mirage", "illusion"]),
    sample(["volcanic", "explosive"]),
    sample(["magnetic", "repellant"]),
    "devoid of life",
    "unexpectedly alive",
    "[ODDITY] and [ODDITY]",
  ][roll - 1];
  oddity.description = replace(oddity.description, /\[ODDITY\]/g, () => rollOddity(random(1, 11)).description);

  return oddity;
}

export class Orientation {
  type: DetailType = "orientation";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollOrientation(roll: number = random(1, 12)): Orientation {
  let orientation = new Orientation(roll);

  if (roll <= 2) {
    orientation.description = "down/earthward";
  } else if (roll <= 3) {
    orientation.description = "north";
  } else if (roll <= 4) {
    orientation.description = "northeast";
  } else if (roll <= 5) {
    orientation.description = "east";
  } else if (roll <= 6) {
    orientation.description = "southeast";
  } else if (roll <= 7) {
    orientation.description = "south";
  } else if (roll <= 8) {
    orientation.description = "southwest";
  } else if (roll <= 9) {
    orientation.description = "west";
  } else if (roll <= 10) {
    orientation.description = "northwest";
  } else if (roll <= 12) {
    orientation.description = "up/skyward	";
  }

  return orientation;
}

export class Ruination {
  type: DetailType = "ruination";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollRuination(roll: number = random(1, 12)): Ruination {
  let ruination = new Ruination(roll);

  if (roll <= 1) {
    ruination.description = "arcane disaster";
  } else if (roll <= 2) {
    ruination.description = sample(["damnation", "curse"]);
  } else if (roll <= 4) {
    ruination.description = sample(["earthquake", "fire", "flood"]);
  } else if (roll <= 6) {
    ruination.description = sample(["plague", "famine", "drought"]);
  } else if (roll <= 8) {
    ruination.description = "overrun by monsters";
  } else if (roll <= 10) {
    ruination.description = sample(["war", "invasion"]);
  } else if (roll <= 11) {
    ruination.description = "depleted resources";
  } else if (roll <= 12) {
    ruination.description = "better prospects elsewhere";
  }

  return ruination;
}

export class Size {
  type: DetailType = "size";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollSize(roll: number = random(1, 12)): Size {
  let size = new Size(roll);

  if (roll <= 1) {
    size.description = "tiny";
  } else if (roll <= 3) {
    size.description = "small";
  } else if (roll <= 9) {
    size.description = "medium-sized";
  } else if (roll <= 11) {
    size.description = "large";
  } else if (roll <= 12) {
    size.description = "huge";
  }

  return size;
}

export class Tag {
  type: DetailType = "tag";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollTag(roll: number = random(1, 12)) {
  let tag = new Tag(roll);

  if (roll <= 1) {
    tag.description = "amorphous";
  } else if (roll <= 2) {
    tag.description = "cautious";
  } else if (roll <= 3) {
    tag.description = "construct";
  } else if (roll <= 4) {
    tag.description = "devious";
  } else if (roll <= 5) {
    tag.description = "intelligent";
  } else if (roll <= 6) {
    tag.description = "magical";
  } else if (roll <= 8) {
    tag.description = "organized";
  } else if (roll <= 9) {
    tag.description = "planar";
  } else if (roll <= 10) {
    tag.description = "stealthy";
  } else if (roll <= 11) {
    tag.description = "terrifying";
  } else if (roll <= 12) {
    tag.description = `${rollTag(random(1, 11)).description} and ${rollTag(random(1, 11)).description}`;
  }
  return tag;
}

export class Terrain {
  type: DetailType = "terrain";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollTerrain(roll: number = random(1, 12)): Terrain {
  let terrain = new Terrain(roll);

  if (roll <= 1) {
    terrain.description = sample(["wasteland", "desert"]);
  } else if (roll <= 3) {
    terrain.description = sample(["flatland", "plain"]);
  } else if (roll <= 4) {
    terrain.description = sample(["wetland", "marsh", "swamp"]);
  } else if (roll <= 7) {
    terrain.description = sample(["woodland", "forest", "jungle"]);
  } else if (roll <= 9) {
    terrain.description = sample(["highland", "hills"]);
  } else if (roll <= 11) {
    terrain.description = "mountains";
  } else if (roll <= 12) {
    terrain.description = `${rollOddity().description} oddity`;
  }

  return terrain;
}

export class Visibility {
  type: DetailType = "visibility";
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollVisibility(roll: number = random(1, 12)): Visibility {
  let visibility = new Visibility(roll);

  if (roll <= 2) {
    visibility.description = sample(["buried", "camouflaged", "nigh invisible"]);
  } else if (roll <= 6) {
    visibility.description = sample(["partly covered", "partly overgrown", "partly hidden"]);
  } else if (roll <= 9) {
    visibility.description = sample(["obvious", "in plain sight"]);
  } else if (roll <= 11) {
    visibility.description = "visible at near distance";
  } else if (roll <= 12) {
    visibility.description = sample(["visible at great distance", "focal point"]);
  }

  return visibility;
}



