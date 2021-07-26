import { random, sample } from 'lodash';
import { Follower, rollFollower } from './followers';
import { kingdoms, rollKingdom } from './kingdoms';

export class Npc {
  constructor(public name: string = "") { };

  gender: "male" | "female";
  hometown: string;

  context: Context;
  occupation: Occupation
  trait: Trait;
  follower: Follower;
}

export function rollNpc(): Npc {
  let kingdom = rollKingdom();

  let npc = new Npc();
  npc.gender = sample(["male", "female"]);
  npc.name = sample(kingdom[npc.gender]);
  npc.hometown = sample(kingdom.steading);

  npc.context = rollContext();
  npc.occupation = rollOccupation();
  npc.trait = rollTrait();
  npc.follower = rollFollower();

  return npc;
}

export class Context {
  constructor(public roll: number = 0, public subroll: number = 0, public category: string = "", public subcategory: string = "") { };
}

export function rollContext(): Context {
  let roll = random(1, 12);
  let subroll = random(1, 12);
  let context = new Context(roll, subroll);
  if (roll <= 3) {
    context.category = "wilderness";
    context.subcategory = rollWildernessNpc(subroll);
  } else if (roll <= 9) {
    context.category = "rural";
    context.subcategory = rollRuralNpc(subroll);
  } else if (roll <= 12) {
    context.category = "urban";
    context.subcategory = rollUrbanNpc(subroll);
  }

  return context;
}

export function rollWildernessNpc(roll: number = random(1, 12)): string {
  return [
    `${rollCriminal()} -4`,
    `${rollCriminal()} -4`,
    "adventurer/explorer",
    "adventurer/explorer",
    "hunter/gatherer",
    "hunter/gatherer",
    rollCommoner(),
    rollCommoner(),
    "ranger/scout",
    "ranger/scout",
    "soldier/mercenary",
    rollOfficial(),
  ][roll - 1];
}

export function rollRuralNpc(roll: number = random(1, 12)): string {
  return [
    "beggar/urchin",
    `${rollCriminal()} -1`,
    "adventurer/explorer",
    "hunter/gatherer",
    rollCommoner(),
    rollCommoner(),
    rollCommoner(),
    rollCommoner(),
    rollTradeperson(),
    `${rollMerchant()} -1`,
    "militia/soldier/guard",
    rollOfficial(),
  ][roll - 1];
}

export function rollUrbanNpc(roll: number = random(1, 12)): string {
  return [
    "beggar/urchin",
    "beggar/urchin",
    rollCriminal(),
    rollCommoner(),
    rollCommoner(),
    rollCommoner(),
    rollCommoner(),
    rollTradeperson(),
    rollMerchant(),
    rollSpecialist(),
    "militia/soldier/guard",
    rollOfficial(),
  ][roll - 1];
}

export class Occupation {
  constructor(public roll: number = 0, public subroll: number = 0, public category: string = "", public subcategory: string = "") { };
}

export function rollOccupation(roll: number = random(1, 12), subroll: number = random(1, 12)): Occupation {

  let occupation = new Occupation(roll, subroll);
  if (roll <= 1) {
    occupation.category = "criminal";
    occupation.subcategory = rollCriminal(subroll);
  } else if (roll <= 6) {
    occupation.category = "commoner";
    occupation.subcategory = rollCommoner(subroll);
  } else if (roll <= 8) {
    occupation.category = "tradeperson";
    occupation.subcategory = rollTradeperson(subroll);
  } else if (roll <= 10) {
    occupation.category = "merchant";
    occupation.subcategory = rollMerchant(subroll);
  } else if (roll <= 11) {
    occupation.category = "specialist";
    occupation.subcategory = rollSpecialist(subroll);
  } else if (roll <= 12) {
    occupation.category = "officiail";
    occupation.subcategory = rollOfficial(subroll);
  }

  return occupation;
}

function rollCriminal(roll: number = random(1, 12)): string {
  return [
    "bandit/brigand/thug",
    "bandit/brigand/thug",
    "thief",
    "thief",
    "bodyguard/tough",
    "bodyguard/tough",
    "burglar",
    "burglar",
    "dealer/fence",
    "racketeer",
    "lieutenant",
    "boss"
  ][roll - 1]
}

function rollCommoner(roll: number = random(1, 12)): string {
  return [
    "housewife/husband",
    "hunter/gatherer",
    "hunter/gatherer",
    "farmer/herder",
    "farmer/herder",
    "farmer/herder",
    "laborer/servant",
    "laborer/servant",
    "driver/porter/guide",
    "sailor/soldier/guard",
    "clergy/monk",
    "apprentice/adventurer"
  ][roll - 1];
}

function rollTradeperson(roll: number = random(1, 12)): string {
  return [
    "cobbler/furrier/tailor",
    "weaver/basketmaker",
    "potter/carpenter",
    "mason/baker/chandler",
    "cooper/wheelwright",
    "tanner/ropemaker",
    "smith/tinker",
    "stablekeeper/herbalist",
    "vintner/jeweler",
    "inkeeper/tavernkeeper",
    "artist/actor/minstrel",
    "armorer/weaponsmith",
  ][roll - 1];
}

function rollMerchant(roll: number = random(1, 12)): string {
  return [
    "general goods/outfitter",
    "general goods/outfitter",
    "general goods/outfitter",
    "raw materials",
    "grain/livestock",
    "ale/wine/spirits",
    "clothing/jewelry",
    "weapons/armor",
    "spices/tobacco",
    "labor/slaves",
    "books/scrolls",
    "magic supplies/items"
  ][roll - 1];
}

function rollSpecialist(roll: number = random(1, 12)): string {
  return [
    "undertaker",
    "sage/scholar/wizard",
    "writer/illuminator",
    "perfumer",
    "architect/engineer",
    "locksmith/clockmaker",
    "physician/apothecary",
    "navigator/guide",
    "alchemist/astrologer",
    "spy/diplomat",
    "cartographer",
    "inventor"
  ][roll - 1];
}

function rollOfficial(roll: number = random(1, 12)): string {
  return [
    "town crier",
    "tax collector",
    "armiger/gentry",
    "armiger/gentry",
    "reeve/sheriff/constable",
    "mayor/magistrate",
    "priest/bishop/abbot",
    "guildmaster",
    "knightltemplar",
    "elder/high priest",
    "noble (baron, etc.)",
    "lord/lady/king/queen",
  ][roll - 1];
}

class Trait {
  constructor(public roll: number = 0, public subroll: number = 0, public category: string = "", public description: string = "") { };
}

function rollTrait(roll: number = random(1, 12), subroll: number = random(1, 12)): Trait {
  let trait = new Trait(roll, subroll);
  if (roll <= 6) {
    trait.category = "physical appearance";
    trait.description = rollAppearance(subroll);
  } else if (roll <= 9) {
    trait.category = "personality";
    trait.description = rollPersonality(subroll);
  } else if (roll <= 12) {
    trait.category = "quirk";
    trait.description = rollQuirk(subroll);
  }

  return trait;
}

function rollAppearance(roll: number = random(1, 12)): string {
  let appearance = [
    "disfigured (missing teeth, eye, etc.)",
    "lasting injury (bad leg, arm, etc.)",
    "tattooed/pockmarked/scarred",
    "unkempt/shabby/grubby",
    "big/thick/brawny",
    "small/scrawny/emaciated",
    "notable hair (wild, long, none, etc.)",
    "notable nose (big, hooked, etc.)",
    "notable eyes (blue, bloodshot, etc.)",
    "clean/well-dressed/well-groomed",
    "attractive/handsome/stunning",
    "they are [APPEARANCE] despite [a contradictory detail of your choice]"
  ][roll - 1];

  return appearance.replace("[APPEARANCE]", () => rollAppearance(random(1, 11)));
}

export function rollPersonality(roll: number = random(1, 12)): string {
  let personality = [
    "loner/alienated/antisocial",
    "cruel/belligerent/bully",
    "anxious/fearful/cowardly",
    "envious/covetous/greedy",
    "aloof/haughty/arrogant",
    "awkward/shy/self-loathing",
    "orderly/compulsive/controlling",
    "confident/impulsive/reckless",
    "kind/generous/compassionate",
    "easygoing/relaxed/peaceful",
    "cheerful/happy/optimistic",
    "they are [PERSONALITY] despite [a contradictory detail of your choice]",
  ][roll - 1];

  return personality.replace("[PERSONALITY]", () => rollPersonality(random(1, 11)));
};

export function rollQuirk(roll: number = random(1, 12)): string {
  let quirk = [
    "insecure/racist/xenophobic",
    "addict (sweets, drugs, sex, etc.)",
    "phobia (spiders, fire, darkness, etc.)",
    "allergic/asthmatic/chronically ill",
    "skeptic/paranoid",
    "superstitious/devout/fanatical",
    "miser/pack-rat",
    "spendthrift/wastrel",
    "smart aleck/know-it-all",
    "artistic/dreamer/delusional",
    "naive/idealistic",
    "they are [QUIRK] despite [a contradictory detail of your choice]",
  ][roll - 1];

  return quirk.replace("[QUIRK]", () => rollQuirk(random(1, 11)));
}

// *** THESE TABLES OVERLAP HEAVILY WITH THE ONES IN THE FOLLOWER CREATION SECTION *** //
// Right now we'll use the roller from that section and maybe mash them together later

// NPC FOLLOWER
// Roll 1d12 for each category; reconcile to the fiction, tag, and equip as you see fit.

// COMPETENCE
// 1-3	A liability: Quality -1, +0 tags
// 4-9 Competent: Quality .0, +1 tags 
// 10-11 Fully capable: Quality +1, +2 tags 
// 12	Exceptional: Quality +2, +4 tags

// BACKGROUND
// 1-2 Life of servitude/oppression: #Meek
// 3	Past their prime: -1 to Quality, +1 Wise
// 4-5 Has lived a life of dangec +2 tags
// 6-9 Unremarkable
// 10	Has lived a life of privilege: +1 tag
// 11	Specialist: .1 to Quality, -2 tags
// 12	Roll twice on this table

// LOYALTY	
// 1-2	0 (little faith in leader's cause)
// 3-10	+1
// 11-12	+2 (great faith in leader's cause)
// INSTINCT	
// 1	Loot, pillage, and burn
// 2	Hold a grudge and seek payback
// 3	Question leadership or authority
// 4-5	Lord over others
// 6-7	Act impulsively
// 8-9	Give in to temptation
// 10-11	Slack off
// 12	Avoid danger or punishment

// COST	
// I	Debauchery
// 2	Vengeance
// 3-5	Lucre
// 6-7	Renown
// 8-9	Glory
// 10	Affection
// 11	Knowledge
// 12	Good

// HIT POINTS DAMAGE DIE	
// 1-3	3	H	d4
// 4-9	6	H	d6
// 10-12	9 HP	d8