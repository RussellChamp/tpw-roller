import { random, sample } from 'lodash';
import { Creature, rollCreature } from './creatures';
import type { Kingdom } from './kingdoms';

export class Steading {
  constructor(public roll: number = 0, public category: string = "", public description: string = "") { };
  builtBy: Creature;
  kingdom: Kingdom;
  problem: string;
}

// TODO: This section is gonna need a lot of work
export function rollSteading(roll: number = random(1, 12)): Steading {
  let steading = new Steading();
  steading.builtBy = rollCreature(random(1, 4) + 4);

  if (roll <= 5) {
    steading = rollVillage();
  } else if (roll <= 8) {
    steading = rollTown();
  } else if (roll <= 11) {
    steading = rollKeep();
  } else if (roll <= 12) {
    steading = rollCity();
  }
  steading.roll = roll;

  return steading;
}


export function rollVillage(): Steading {
  return new Steading(0, "village", "village");
}

export function rollTown(): Steading {
  return new Steading(0, "town", "town");
}

export function rollKeep(): Steading {
  return new Steading(0, "keep", "keep");
}

export function rollCity(): Steading {
  return new Steading(0, "city", "city");
}



// 1 - 5 VILLAGE
// Poor, Steady, Militia, Resource(GM choice) and has an Oath(steading of GM's choice). If the village is part of a kingdom or empire, choose I or roll 1d12:
// 1 - 3 Natural defenses: Safe, -Defenses
// 4 - 6 Abundant resources: +Prosperity, Resource(GM choice), Enmity(GM choice) 7 - 8 Protected by another steading: Oath(that steading), .Defenses
// 9 - 10 On a major road: Trade(GM choice), +Prosperity
// 11	Built around a wizard's tower: Personage (the wizard), Blight (arcane creatures)
// 12	Built on a site of religious significance: Divine, History(GM choice)
// Then, choose I problem or roll 1d12:
//   1 - 2 Surrounded by and or uncultivable land: Need(food)
// 3 - 4 Dedicated to a deity: Religious(that deity), Enmity(steading of opposing deity)
// 5 - 6 Recently at war: -Population, -Prosperity if they fought to the end, -Defenses if they lost 7 - 8 Monster problem: Blight(that monster), Need(adventurers)
// 9 - 10 Absorbed another village: +Population, Lawless
// 11 - 12 Remote or unwelcoming: -Prosperity, Dwarven or Elven or other non - human
// 6 - 8 TowN
// Moderate, Steady, Watch, and Trade(with 2 places of GM's choice).
// If the town is listed as Trade by another steading, choose I or roll 1d12:
// 1	Booming: Booming, Lawless
// 2 - 3 At a crossroads: Market, +Prosperity
// 4 - 5 Defended by another steading: Oath(that steading), +Defenses
// 6 - 7 Built around a church: Power(divine)
// 8 - 10 Built around a craft: Craft(your choice), Resource(something required for that craft) 11 - 12 Built around a military post.Defenses
// Then, choose 1 problem or roll 1d12:
// 1 - 2 Outgrowing a vital resource: Need(that resource), Trade(a steading with that resource) 3 - 4 Offers defense to others: Oath(GM choice), -Defenses
// 5 - 6 Outlaw rumored to live there: Personage(the outlaw), Enmity(steading preyed upon) 7 - 8 Controls a good / service: Exotic(that good / service), Enmity(steading with ambition) 9 - 10 Suffers from disease: -Population
// 11 - 12 lkpular meeting place: +Population, Lawless
// Then, choose I problem or roll 1d12:
// 9 - 11 KEEP
// Poor, Shrinking, Guard, Need(supplies), Trade(somei
// If the keep is owed fealty by at least one other stea, E
// 1 - 2 Belongs to a noble family: +Prosperity, Tozer(p 3 - 4 Run by a skilled commander: Personage(the
// 5 - 6 Stands watch over a trade road: .Prosperity, GNI 7 - 8 Used to train special troops: Arcane, -Population 9 - 10 Surrounded by fertile land: remove Need(Supçifr 11 - 12 Stands on a border: .Defenses, Enmity(steadinga
// Then, choose I problem or roll 1d12:
//   1 - 3	Built on a naturally defensible position: Safe, -fl, p.
// 4	Formerly occupied by another power: Enmity(Sim
// 5	Safe haven for brigands: Lawless
// 6	Built to defend from a specific threat: Blight(tbat
// 7	Has seen horrible bloody war: History(battle),
//   8	Is given the worst of the worst: Need(skilled recrn
// 9 - 10 Suffers from disease: -Population
// 11 - 12 Ik)pular meeting place: * Population, -Law
// 12 QTY
// Moderate, Steady, Guard, Market, Guild(GM's choice), 2. If the city has trade with and fealty from at least 1 steadin
// 1 - 3 Permanent defenses, such as walls: +Defenses, Oath 4 - 6 Ruled by a single individual: Personage(the ruler). 7 Diverse: Dwarven or Elven or both
// 8 - 10 Trade hub: Trade(every nearby steading), +Prosperi
// 11	Ancient, built on top of its own ruins: History(yoa
// 12	Center of learning: Arcane, Craft(your choice), Fbs
// 		1 - 3 Outgrown its resources: +Population, Need(food) 4 - 6 Designs on nearby territory: Enmity(nearby stead 7 - 8 Ruled by a theocracy: -Defenses, Power(divine) 9 - 10 Ruled by the people: -Defenses, +Population
// 		11	Supernatural defenses: .Defenses, Blight(related sti
// 		12	Occupies a place of power: Arcane, Personage(who
// 		Blight(arcane creatures)
// 9 - 11 KEEP
// Poor, Shrinking, Guard, Need(supplies), Trade(someplace with supplies), Oath(GM's choice). If the keep is owed fealty by at least one other steading, choose 1 or roll 1d12:
// 1 - 2 Belongs to a noble family: +Prosperity, Power(political)
// 3 - 4 Run by a skilled commander: Personage(the commander), .Defenses 5 - 6 Stands watch over a trade road: +Prosperity, Guild(trade)
// 7 - 8 Used to train special troops: Arcane, -Population
// 9 - 10 Surrounded by fertile land: remove Need(Supplies)
// 11 - 12 Stands on a border: .Defenses, Enmity(steading on the other side of the border)
// Then, choose I problem or roll 1d12:
//     1 - 3	Built on a naturally defensible position: Safe, -Population
// 4	Formerly occupied by another power: Enmity(steadings of that power)
// 5	Safe haven for brigands: Lawless
// 6	Built to defend from a specific threat: Blight(that threat)
// 7	Has seen horrible bloody war: History(battle), Blight(restless spirits)
// 8	Is given the worst of the worst: Need(skilled recruits)
// 9 - 10 Suffers from disease: -Population
// 11 - 12 Popular meeting place: .Population, -Law
// 12 QTY
// Moderate, Steady, Guard, Market, Guild(GM's choice), 2+ Oaths (steadings of GM's choice) If the city has trade with and fealty from at least 1 steading, choose I or roll 1d12:
// 1 - 3 Permanent defenses, such as walls: +Defenses, Oath((M's choice) 4-6 Ruled by a single individual: Personage (the ruler), Power (political) 7	Diverse: Dwarven or Elven or both
// 8 - 10 Trade hub: Trade(every nearby steading), +Prosperity
// 11	Ancient, built on top of its own ruins: History(your choice), Divine
// 12	Center of learning: Arcane, Craft(your choice), Power(arcane)
// Then, choose I problem or roll 1d12:
//   1 - 3 Outgrown its resources: +Population, Need(food)
// 4 - 6 Designs on nearby territory: Enmity(nearby steadings), .Defenses 7 - 8 Ruled by a theocracy: -Defenses, Power(divine)
// 9 - 10 Ruled by the people: -Defenses, +Population
// 11	Supernatural defenses: +Defenses, Blight(related supernatural creatures)
// 12	Occupies a place of power: Arcane, Personage(whoever watches the place of power),
//   Blight(arcane creatures)