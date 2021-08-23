import { capitalize, random, sample } from 'lodash';
import { Activity, Alignment, rollActivity, rollAlignment } from './details';
import { Follower, rollFollower } from './followers';
import { kingdoms, rollKingdom } from './kingdoms';

export class Npc {
  constructor(public name: string = "") { };

  gender: "male" | "female";
  hometown: string;
  context: Context;
  occupation: Occupation
  traits: Trait[];
  follower: Follower;

  getDescription(fullDesc: boolean = false) {
    let str = `${this.name} the ${this.gender} ${capitalize(this.occupation.category)} (${this.occupation.description})`;
    str += fullDesc ? ` from ${this.hometown}` : '';

    return str;
  }

}

export function rollNpc(): Npc {
  let kingdom = rollKingdom();

  let npc = new Npc();
  npc.gender = sample(["male", "female"]);
  npc.name = sample(kingdom[npc.gender]);
  npc.hometown = sample(kingdom.steading);

  npc.context = rollContext();
  npc.occupation = rollOccupation();
  npc.traits.push(rollTrait());
  npc.follower = rollFollower();

  return npc;
}

export class Context {
  constructor(public roll: number = 0, public subroll: number = 0, public category: string = "", public description: string = "") { };
  activity?: Activity;
  alignment?: Alignment;
  trait?: Trait;
}

export function rollContext(): Context {
  let roll = random(1, 12);
  let subroll = random(1, 12);
  let context = new Context(roll, subroll);
  if (roll <= 3) {
    context.category = "wilderness";
    context.description = rollWildernessNpc(subroll);
  } else if (roll <= 9) {
    context.category = "rural";
    context.description = rollRuralNpc(subroll);
  } else if (roll <= 12) {
    context.category = "urban";
    context.description = rollUrbanNpc(subroll);
  }
  context.activity = rollActivity();
  context.alignment = rollAlignment();
  context.trait = rollTrait();

  return context;
}

export function rollWildernessNpc(roll: number = random(1, 12)): string {
  return [
    `criminal ${rollCriminal()} -4`,
    `criminal ${rollCriminal()} -4`,
    "adventurer",
    "explorer",
    "hunter",
    "gatherer",
    `commoner ${rollCommoner()}`,
    `commoner ${rollCommoner()}`,
    "ranger",
    "scout",
    sample(["soldier", "mercenary"]),
    `official ${rollOfficial()}`,
  ][roll - 1];
}

export function rollRuralNpc(roll: number = random(1, 12)): string {
  return [
    sample(["beggar", "urchin"]),
    `criminal ${rollCriminal()} -1`,
    sample(["adventurer", "explorer"]),
    sample(["hunter", "gatherer"]),
    `commoner ${rollCommoner()}`,
    `commoner ${rollCommoner()}`,
    `commoner ${rollCommoner()}`,
    `commoner ${rollCommoner()}`,
    `tradeperson ${rollTradeperson()}`,
    `merchant ${rollMerchant()} -1`,
    sample(["militia", "soldier", "guard"]),
    `official ${rollOfficial()}`,
  ][roll - 1];
}

export function rollUrbanNpc(roll: number = random(1, 12)): string {
  return [
    "beggar",
    "urchin",
    `commoner ${rollCriminal()}`,
    `commoner ${rollCommoner()}`,
    `commoner ${rollCommoner()}`,
    `commoner ${rollCommoner()}`,
    `commoner ${rollCommoner()}`,
    `tradeperson ${rollTradeperson()}`,
    `merchant ${rollMerchant()}`,
    `specialist ${rollSpecialist()}`,
    sample(["militia", "soldier", "guard"]),
    `official ${rollOfficial()}`,
  ][roll - 1];
}

export class Occupation {
  constructor(public roll: number = 0, public subroll: number = 0, public category: string = "", public description: string = "") { };
}

export function rollOccupation(roll: number = random(1, 12), subroll: number = random(1, 12)): Occupation {

  let occupation = new Occupation(roll, subroll);
  if (roll <= 1) {
    occupation.category = "criminal";
    occupation.description = rollCriminal(subroll);
  } else if (roll <= 6) {
    occupation.category = "commoner";
    occupation.description = rollCommoner(subroll);
  } else if (roll <= 8) {
    occupation.category = "tradeperson";
    occupation.description = rollTradeperson(subroll);
  } else if (roll <= 10) {
    occupation.category = "merchant";
    occupation.description = rollMerchant(subroll);
  } else if (roll <= 11) {
    occupation.category = "specialist";
    occupation.description = rollSpecialist(subroll);
  } else if (roll <= 12) {
    occupation.category = "official";
    occupation.description = rollOfficial(subroll);
  }

  return occupation;
}

function rollCriminal(roll: number = random(1, 12)): string {
  return [
    sample(["bandit", "brigand", "thug"]),
    sample(["bandit", "brigand", "thug"]),
    "thief",
    "thief",
    "bodyguard",
    "tough",
    "burglar",
    "burglar",
    sample(["dealer", "fence"]),
    "racketeer",
    "lieutenant",
    "boss"
  ][roll - 1]
}

function rollCommoner(roll: number = random(1, 12)): string {
  return [
    "housewife/husband",
    "hunter",
    "gatherer",
    "farmer",
    "herder",
    sample(["farmer", "herder"]),
    "laborer",
    "servant",
    sample(["driver", "porter", "guide"]),
    sample(["sailor", "soldier", "guard"]),
    sample(["clergy", "monk"]),
    sample(["apprentice", "adventurer"]),
  ][roll - 1];
}

function rollTradeperson(roll: number = random(1, 12)): string {
  return [
    sample(["cobbler", "furrier", "tailor"]),
    sample(["weaver", "basketmaker"]),
    sample(["potter", "carpenter"]),
    sample(["mason", "baker", "chandler"]),
    sample(["cooper", "wheelwright"]),
    sample(["tanner", "ropemaker"]),
    sample(["smith", "tinker"]),
    sample(["stablekeeper", "herbalist"]),
    sample(["vintner", "jeweler"]),
    sample(["inkeeper", "tavernkeeper"]),
    sample(["artist", "actor", "minstrel"]),
    sample(["armorer", "weaponsmith"]),
  ][roll - 1];
}

function rollMerchant(roll: number = random(1, 12)): string {
  return [
    "general goods",
    "outfitter",
    sample(["general goods", "outfitter"]),
    "raw materials",
    sample(["grain", "livestock"]),
    sample(["ale", "wine", "spirits"]),
    sample(["clothing", "jewelry"]),
    sample(["weapons", "armor"]),
    sample(["spices", "tobacco"]),
    sample(["labor", "slaves"]),
    sample(["books", "scrolls"]),
    sample(["magic supplies", "magic items"]),
  ][roll - 1];
}

function rollSpecialist(roll: number = random(1, 12)): string {
  return [
    "undertaker",
    sample(["sage", "scholar", "wizard"]),
    sample(["writer", "illuminator"]),
    "perfumer",
    sample(["architect", "engineer"]),
    sample(["locksmith", "clockmaker"]),
    sample(["physician", "apothecary"]),
    sample(["navigator", "guide"]),
    sample(["alchemist", "astrologer"]),
    sample(["spy", "diplomat"]),
    "cartographer",
    "inventor"
  ][roll - 1];
}

function rollOfficial(roll: number = random(1, 12)): string {
  return [
    "town crier",
    "tax collector",
    "armiger",
    "gentry",
    sample(["reeve", "sheriff", "constable"]),
    sample(["mayor", "magistrate"]),
    sample(["priest", "bishop", "abbot"]),
    "guildmaster",
    "knightltemplar",
    sample(["elder", "high priest"]),
    "noble (baron, etc.)",
    sample(["lord", "lady", "king", "queen"]),
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
    sample(["tattooed", "pockmarked", "scarred"]),
    sample(["unkempt", "shabby", "grubby"]),
    sample(["big", "thick", "brawny"]),
    sample(["small", "scrawny", "emaciated"]),
    "notable hair (wild, long, none, etc.)",
    "notable nose (big, hooked, etc.)",
    "notable eyes (blue, bloodshot, etc.)",
    sample(["clean", "well-dressed", "well-groomed"]),
    sample(["attractive", "handsome", "stunning"]),
    "they are [APPEARANCE] despite [a contradictory detail of your choice]"
  ][roll - 1];

  return appearance.replace("[APPEARANCE]", () => rollAppearance(random(1, 11)));
}

export function rollPersonality(roll: number = random(1, 12)): string {
  let personality = [
    sample(["loner", "alienated", "antisocial"]),
    sample(["cruel", "belligerent", "bully"]),
    sample(["anxious", "fearful", "cowardly"]),
    sample(["envious", "covetous", "greedy"]),
    sample(["aloof", "haughty", "arrogant"]),
    sample(["awkward", "shy", "self-loathing"]),
    sample(["orderly", "compulsive", "controlling"]),
    sample(["confident", "impulsive", "reckless"]),
    sample(["kind", "generous", "compassionate"]),
    sample(["easygoing", "relaxed", "peaceful"]),
    sample(["cheerful", "happy", "optimistic"]),
    "they are [PERSONALITY] despite [a contradictory detail of your choice]",
  ][roll - 1];

  return personality.replace("[PERSONALITY]", () => rollPersonality(random(1, 11)));
};

export function rollQuirk(roll: number = random(1, 12)): string {
  let quirk = [
    sample(["insecure", "racist", "xenophobic"]),
    sample(["addict (sweets, drugs, sex, etc.)"]),
    sample(["phobia (spiders, fire, darkness, etc.)"]),
    sample(["allergic", "asthmatic", "chronically ill"]),
    sample(["skeptic", "paranoid"]),
    sample(["superstitious", "devout", "fanatical"]),
    sample(["miser", "pack-rat"]),
    sample(["spendthrift", "wastrel"]),
    sample(["smart aleck", "know-it-all"]),
    sample(["artistic", "dreamer", "delusional"]),
    sample(["naive", "idealistic"]),
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