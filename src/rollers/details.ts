import { random, replace, sample, sampleSize } from "lodash";

export class Ability {
  constructor(public roll: number = 0, public description = "") { };
}

export function rollAbility(roll: number = random(1, 12)): Ability {
  let ability = new Ability(roll);
  ability.description = [
    "bless/curse",
    "entangle/trap/snare",
    "poison/disease",
    "paralyze/petrify",
    "mimic/camouflage",
    "seduce/hypnotize",
    "dissolve/disintegrate",
    rollMagicType().description,
    "drain life/magic",
    `immunity to ${rollElement().description}`,
    "read/control minds",
    "[ABILITY] and [ABILITY]"
  ][roll - 1];
  ability.description = replace(ability.description, /\[ABILITY\]/g, () => rollAbility(random(1, 11)).description);

  return ability;
}

export class Activity {
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollActivity(roll: number = random(1, 12)): Activity {
  let activity = new Activity(roll);
  activity.description = [
    "laying trap/ambush",
    "fighting/at war",
    "prowling/on patrol",
    "hunting/foraging",
    "eating/resting",
    "crafting/praying",
    "traveling/relocating",
    "exploring/lost",
    "returning home",
    "building/excavating",
    "sleeping",
    "dying",
  ][roll - 1];

  return activity;
}

export class Adjective {
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollAdjective(roll: number = random(1, 12)): Adjective {
  let adjective = new Adjective(roll);
  adjective.description = [
    "slick/slimy",
    "rough/hard/sharp",
    "smooth/soft/dull",
    "corroded/rusty",
    "rotten/decaying",
    "broken/brittle",
    "stinking/smelly",
    "weak/thin/drained",
    "strong/fat/full",
    "pale/poor/shallow",
    "dark/rich/deep",
    "colorful",
  ][roll - 1];

  return adjective;
}

export class Age {
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
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollAspect(roll: number = random(1, 12)): Aspect {
  let aspect = new Aspect(roll);
  aspect.description = [
    "power/strength",
    "trickery/dexterity",
    "time/constitution",
    "knowledge/intelligence",
    "nature/wisdom",
    "culture/charisma",
    "war/lies/discord",
    "peace/truth/balance",
    "hate/envy",
    "love/admiration",
    rollElement().description,
    "[ASPECT] and [ASPECT]"
  ][roll - 1];
  aspect.description = replace(aspect.description, /\[ASPECT\]/g, () => rollAspect(random(1, 11)).description);

  return aspect;
}

export class Condition {
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollCondition(roll: number = random(1, 12)): Condition {
  let condition = new Condition(roll);

  if (roll <= 1) {
    condition.description = "being built/born";
  } else if (roll <= 4) {
    condition.description = "intact/healthy/stable";
  } else if (roll <= 7) {
    condition.description = "occupied/active/alert";
  } else if (roll <= 9) {
    condition.description = "worn/tired/weak";
  } else if (roll <= 10) {
    condition.description = "vacant/lost";
  } else if (roll <= 11) {
    condition.description = "ruined/defiled/dying";
  } else if (roll <= 12) {
    condition.description = "disappeared/dead";
  }

  return condition;
}

export class Disposition {
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollDisposition(roll: number = random(1, 12)): Disposition {
  let disposition = new Disposition(roll);

  if (roll <= 1) {
    disposition.description = "attacking";
  } else if (roll <= 4) {
    disposition.description = "hostile/aggressive";
  } else if (roll <= 6) {
    disposition.description = "cautious/doubtful";
  } else if (roll <= 7) {
    disposition.description = "fearful/fleeing";
  } else if (roll <= 10) {
    disposition.description = "neutral";
  } else if (roll <= 11) {
    disposition.description = "curious/hopeful";
  } else if (roll <= 12) {
    disposition.description = "friendly";
  }

  return disposition;
}

export class Element {
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
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollFeature(roll: number = random(1, 12)): Feature {
  let feature = new Feature(roll);

  if (roll <= 1) {
    feature.description = "heavily armored";
  } else if (roll <= 3) {
    feature.description = "winged/flying";
  } else if (roll <= 4) {
    feature.description = "multiple heads/headless";
  } else if (roll <= 5) {
    feature.description = "many eyes/one eye";
  } else if (roll <= 6) {
    feature.description = "many limbs/tails";
  } else if (roll <= 7) {
    feature.description = "tentacles/tendrils";
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
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollOddity(roll: number = random(1, 12)): Oddity {
  let oddity = new Oddity(roll);
  oddity.description = [
    "weird color/smell/sound",
    "geometric",
    "web/network/system",
    "crystalline/glass-like",
    "fungal",
    "gaseous/smokey",
    "mirage/illusion",
    "volcanic/explosive",
    "magnetic/repellant",
    "devoid of life",
    "unexpectedly alive",
    "[ODDITY] and [ODDITY]",
  ][roll - 1];
  oddity.description = replace(oddity.description, /\[ODDITY\]/g, () => rollOddity(random(1, 11)).description);

  return oddity;
}

export class Orientation {
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
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollRuination(roll: number = random(1, 12)): Ruination {
  let ruination = new Ruination(roll);

  if (roll <= 1) {
    ruination.description = "arcane disaster";
  } else if (roll <= 2) {
    ruination.description = "damnation/curse";
  } else if (roll <= 4) {
    ruination.description = "earthquake/fire/flood";
  } else if (roll <= 6) {
    ruination.description = "plague/famine/drought";
  } else if (roll <= 8) {
    ruination.description = "overrun by monsters";
  } else if (roll <= 10) {
    ruination.description = "war/invasion";
  } else if (roll <= 11) {
    ruination.description = "depleted resources";
  } else if (roll <= 12) {
    ruination.description = "better prospects elsewhere";
  }

  return ruination;
}

export class Size {
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
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollTerrain(roll: number = random(1, 12)): Terrain {
  let terrain = new Terrain(roll);

  if (roll <= 1) {
    terrain.description = "wasteland/desert";
  } else if (roll <= 3) {
    terrain.description = "flatland/plain";
  } else if (roll <= 4) {
    terrain.description = "wetland/marsh/swamp";
  } else if (roll <= 7) {
    terrain.description = "woodland/forest/jungle";
  } else if (roll <= 9) {
    terrain.description = "highland/hills";
  } else if (roll <= 11) {
    terrain.description = "mountains";
  } else if (roll <= 12) {
    terrain.description = rollOddity().description;
  }

  return terrain;
}

export class Visibility {
  constructor(public roll: number = 0, public description: string = "") { };
}

export function rollVisibility(roll: number = random(1, 12)): Visibility {
  let visibility = new Visibility(roll);

  if (roll <= 2) {
    visibility.description = "buried/camouflaged/nigh invisible";
  } else if (roll <= 6) {
    visibility.description = "partly covered/overgrown/hidden";
  } else if (roll <= 9) {
    visibility.description = "obvious/in plain sight";
  } else if (roll <= 11) {
    visibility.description = "visible at near distance";
  } else if (roll <= 12) {
    visibility.description = "visible at great distance/focal point";
  }

  return visibility;
}



