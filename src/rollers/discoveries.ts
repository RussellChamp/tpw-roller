import { random, sample } from 'lodash';
import { Creature, rollCreature } from './creatures';
import { rollAlignment, rollElement, rollMagicType } from './details';
import { rollSteading, Steading } from './steadings';

export class Discovery {
  constructor(public roll: number = 0, public subroll: number = 0, public specificroll: number = 0, public category: string = "", public subcategory: string = "", public description: string = "") { };
  creature?: Creature;
  steading?: Steading;
}

export function rollDiscovery() {
  let roll = random(1, 12);
  let subroll = random(1, 12);
  let specificroll = random(1, 12);

  if (roll <= 1) {
    return rollUnnaturalFeature(roll, subroll, specificroll);
  } else if (roll <= 4) {
    return rollNaturalFeature(roll, subroll, specificroll);
  } else if (roll <= 6) {
    return rollEvidence(roll, subroll, specificroll);
  } else if (roll <= 8) {
    return rollDiscoveryCreature(roll);
  } else if (roll <= 12) {
    return rollStructure(roll, subroll, specificroll);
  }

  return new Discovery(roll, subroll, specificroll);
}

export function rollUnnaturalFeature(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)): Discovery {
  var discovery = new Discovery(roll, subroll, specificroll, "unnatural feature");

  if (subroll <= 9) {
    discovery.subcategory = "arcane";
    discovery.description = rollArcaneFeature(specificroll);
  } else if (subroll <= 11) {
    discovery.subcategory = "planar";
    discovery.description = rollPlanarFeature(specificroll);
  } else if (subroll <= 12) {
    discovery.subcategory = "divine";
    discovery.description = rollDivineFeature(specificroll);
  }

  return discovery;
}

export function rollArcaneFeature(roll: number = random(1, 12)): string {
  let feature = random(1, 3) == 3 ? sample([rollAlignment(), rollMagicType()]) + " " : "";

  if (roll <= 2) {
    feature += "residue";
  } else if (roll <= 5) {
    feature += "blight";
  } else if (roll <= 7) {
    feature += "alteration/mutation";
  } else if (roll <= 10) {
    feature += "enchantment";
  } else if (roll <= 12) {
    feature += "source/repository";
  }

  return feature;

}

export function rollPlanarFeature(roll: number = random(1, 12)): string {

  let feature = random(1, 3) == 3 ? sample([rollAlignment(), rollElement()]) + " " : "";

  if (roll <= 4) {
    feature += "distortion/warp";
  } else if (roll <= 8) {
    feature += "portal/gate";
  } else if (roll <= 10) {
    feature += "rift/tear";
  } else if (roll <= 12) {
    feature += "outpost";
  }

  return feature;
}

export function rollDivineFeature(roll: number = random(1, 12)) {
  let feature = random(1, 3) == 3 ? sample([rollAlignment(), rollElement()]) + " " : "";

  if (roll <= 3) {
    feature += "mark/sign";
  } else if (roll <= 6) {
    feature += "cursed place";
  } else if (roll <= 9) {
    feature += "hallowed place";
  } else if (roll <= 11) {
    feature += "watched place";
  } else if (roll <= 12) {
    feature += "presence";
  }

  return feature;
}

export function rollNaturalFeature(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)) {
  var discovery = new Discovery(roll, subroll, specificroll, "natural feature");

  if (subroll <= 2) {
    discovery.subcategory = "lair";
    discovery.description = rollLair(specificroll)
  } else if (subroll <= 4) {
    discovery.subcategory = "obstacle";
    discovery.description = rollObstacle(specificroll);
  } else if (subroll <= 7) {
    discovery.subcategory = "terrain change";
    discovery.description = rollTerrainChange(specificroll);
  } else if (subroll <= 9) {
    discovery.subcategory = "water feature";
    discovery.description = rollWaterFeature(specificroll);
  } else if (subroll <= 11) {
    discovery.subcategory = "terrain change";
    discovery.description = rollLandmark(specificroll);
  } else if (subroll <= 12) {
    discovery.subcategory = "terrain change";
    discovery.description = rollResource(specificroll);
  }

  return discovery;
}

export function rollLair(roll: number = random(1, 12)): string {
  // 1-2	LAIR

  // 1-3	burrow
  // 4-7	cave/tunnels
  // 8-9	nest/aerie
  // 10	hive
  // 1142	ruins (see STRUCTURE)
  return "";

}

export function rollObstacle(roll: number = random(1, 12)): string {
  // 3-4	OBSTACLE
  // 1-5	difficult ground
  // 	(specific to terrain)
  // 6-8	cliff/crevasse/chasm
  // 9-10	ravine/gorge
  // 11-12	ODDITY
  return "";
}

export function rollTerrainChange(roll: number = random(1, 12)): string {
  // 5-7	TERRAIN CHANGE
  // 14	limited area of an
  // 	another TERRAIN type
  // 5-6	crevice/hole/pit/cave
  // 7-8	altitude change
  // 9-10	canyon/valley
  // 11-12	rise/peak in distance
  return "";
}

export function rollWaterFeature(roll: number = random(1, 12)): string {
  // 8-9 WATER FEATURE 10-11 LANDMARK	12 RESOURCE
  // I	spring/hotspring	1-3	water-based (water-	1-4	game/fruit/vegetable
  // 2	waterfall/geyser	fall, geyser, etc.)	5-6	herb/spice/dye source
  // 3-6	creek/stream/brook	4-6	plant-based (ancient	7-9	timber/stone
  // 7-8	pond/lake	tree, giant flowers, etc.)	10-11	ore (copper, iron, etc.)
  // 9-10	river	7-10	earth-based (peak,	12	precious metal/gems
  // 11-12	sea/ocean	formation, crater, etc.)
  // 	SIZE,	............................... VISIBILITY.
  return "";
}

export function rollLandmark(roll: number = random(1, 12)): string {
  // 8-9 WATER FEATURE 10-11 LANDMARK	12 RESOURCE
  // I	spring/hotspring	1-3	water-based (water-	1-4	game/fruit/vegetable
  // 2	waterfall/geyser	fall, geyser, etc.)	5-6	herb/spice/dye source
  // 3-6	creek/stream/brook	4-6	plant-based (ancient	7-9	timber/stone
  // 7-8	pond/lake	tree, giant flowers, etc.)	10-11	ore (copper, iron, etc.)
  // 9-10	river	7-10	earth-based (peak,	12	precious metal/gems
  // 11-12	sea/ocean	formation, crater, etc.)
  // 	SIZE,	............................... VISIBILITY.
  return "";
}

export function rollResource(roll: number = random(1, 12)): string {
  // 8-9 WATER FEATURE 10-11 LANDMARK	12 RESOURCE
  // I	spring/hotspring	1-3	water-based (water-	1-4	game/fruit/vegetable
  // 2	waterfall/geyser	fall, geyser, etc.)	5-6	herb/spice/dye source
  // 3-6	creek/stream/brook	4-6	plant-based (ancient	7-9	timber/stone
  // 7-8	pond/lake	tree, giant flowers, etc.)	10-11	ore (copper, iron, etc.)
  // 9-10	river	7-10	earth-based (peak,	12	precious metal/gems
  // 11-12	sea/ocean	formation, crater, etc.)
  // 	SIZE,	............................... VISIBILITY.
  return "";
}

function rollEvidence(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)) {
  let discovery = new Discovery(roll, subroll, specificroll, "evidence");

  if (subroll <= 6) {
    discovery.subcategory = "tracks/spoor";
    discovery.description = rollTracksSpoor(specificroll);
  } else if (subroll <= 10) {
    discovery.subcategory = "remains/debris";
    discovery.description = rollRemainsDebris(specificroll);
  } else if (subroll <= 12) {
    discovery.subcategory = "stash/cache";
    discovery.description = rollStashCache(specificroll);
  }

  return discovery;

}


export function rollTracksSpoor(roll: number = random(1, 12)): string {

  // 1-6	TRACKS/SPOOR
  // 1-3	faint/unclear
  // 4-6	definite/clear
  // 7-8	multiple
  // 9-10	signs of violence
  // 11-12	trail of blood/other
  // AGE, CREATURE responsible
  // 44
  return "";
}

export function rollRemainsDebris(roll: number = random(1, 12)): string {

  // 7-10	REMAINS/DEBRIS
  // 1-4	bones
  // 5-7	corpse/carcass
  // 8-9	site of violence
  // 10	junk/refuse
  // 11	lost supplies/cargo
  // 12	tools/weapons/armor
  // AGE, VISIBILITY
  return "";
}

export function rollStashCache(roll: number = random(1, 12)): string {
  // 1142 STASH/CACHE	
  // 1-3	trinkets/coins
  // 4-5	tools/weapons/armor
  // 6-7	map
  // 8-9	food/supplies
  // 10-12	treasure (p43)
  return "";
}

export function rollDiscoveryCreature(roll: number = random(1, 12)): Discovery {
  let discovery = new Discovery(roll, 0, 0, "creature");
  discovery.creature = rollCreature();

  return discovery;
}

export function rollStructure(roll: number = random(1, 12), subroll: number = random(1, 12), specificroll: number = random(1, 12)) {
  let discovery = new Discovery(roll, subroll, specificroll, "structure");
  if (subroll <= 1) {
    discovery.subcategory = "enigmatic";
    discovery.description = rollEnigmaticStructure(specificroll);
  } else if (subroll <= 3) {
    discovery.subcategory = "infrastructure";
    discovery.description = rollInfrastructureStructure(specificroll);
  } else if (subroll <= 4) {
    discovery.subcategory = "dwelling";
    discovery.description = rollDwellingStructure(specificroll);
  } else if (subroll <= 6) {
    discovery.subcategory = "burial/religious";
    discovery.description = rollBurialReligiousStructure(specificroll);
  } else if (subroll <= 8) {
    discovery.subcategory = "steading";
    discovery.description = "steading";
    discovery.specificroll = 0;
    discovery.steading = rollSteading();
  } else if (subroll <= 12) {
    discovery.subcategory = "ruin";
    discovery.description = rollRuinStructure(specificroll);
  }

  return discovery;
}

export function rollEnigmaticStructure(roll: number = random(1, 12)): string {

  // 912 STRUCTURE. Who built it? Is it connected to anything else they made nearby?
  // 1	ENIGMATIC	2-3	INFRASTRUCTURE	4	DWELLING
  // 1-4	earthworks	14	track/path	1-3	campsite
  // 5-8	megalith	5-8	road	4-6	hovel/hut
  // 941	statue/idol/totem	9-10	bridge/ford	7-8	farm
  // 12	ODDITY	11	mine/quarry	9-10	inn/roadhouse
  // AGE (1d844) SIZE (1d844)		12	aqueduct/canal/portal	1112	tower/keep/estate
  // VISIBILITY		CREATURE responsible (1d4.4)		CREATURE responsible (1d4+4)
  return "";
}

export function rollInfrastructureStructure(roll: number = random(1, 12)): string {

  // 912 STRUCTURE. Who built it? Is it connected to anything else they made nearby?
  // 1	ENIGMATIC	2-3	INFRASTRUCTURE	4	DWELLING
  // 1-4	earthworks	14	track/path	1-3	campsite
  // 5-8	megalith	5-8	road	4-6	hovel/hut
  // 941	statue/idol/totem	9-10	bridge/ford	7-8	farm
  // 12	ODDITY	11	mine/quarry	9-10	inn/roadhouse
  // AGE (1d844) SIZE (1d844)		12	aqueduct/canal/portal	1112	tower/keep/estate
  // VISIBILITY		CREATURE responsible (1d4.4)		CREATURE responsible (1d4+4)
  return "";
}

export function rollDwellingStructure(roll: number = random(1, 12)): string {

  // 912 STRUCTURE. Who built it? Is it connected to anything else they made nearby?
  // 1	ENIGMATIC	2-3	INFRASTRUCTURE	4	DWELLING
  // 1-4	earthworks	14	track/path	1-3	campsite
  // 5-8	megalith	5-8	road	4-6	hovel/hut
  // 941	statue/idol/totem	9-10	bridge/ford	7-8	farm
  // 12	ODDITY	11	mine/quarry	9-10	inn/roadhouse
  // AGE (1d844) SIZE (1d844)		12	aqueduct/canal/portal	1112	tower/keep/estate
  // VISIBILITY		CREATURE responsible (1d4.4)		CREATURE responsible (1d4+4)
  return "";
}

export function rollBurialReligiousStructure(roll: number = random(1, 12)): string {

  // 5-6	BURIAL/RELIGIOUS	7-8	STEADING	9-12 RUIN
  // 1-2	grave marker/barrow	Roll on STEADING table		1-2	Ias'raucruRE (1d646)
  // 3-4	graveyard/necropolis			3-4	DWELLING (1d844)
  // 5-6	tomb/crypt			5-6	BURIAIJREIJGI0us
  // 7-9	shrine			(1d8+4)
  // 1041	temple/retreat			7-8	STEADING (00+2)
  // 12	great temple			9-12	DUNGEON (pp60-61)
  // CREATURE responsible (1d4+4),				CREATURE responsible (1d444),
  // ALIGNMENT, ASPECT				AGE (1d8.4), RUINATION,
  // 				VISIBILITY
  return "";
}

export function rollRuinStructure(roll: number = random(1, 12)): string {

  // 5-6	BURIAL/RELIGIOUS	7-8	STEADING	9-12 RUIN
  // 1-2	grave marker/barrow	Roll on STEADING table		1-2	Ias'raucruRE (1d646)
  // 3-4	graveyard/necropolis			3-4	DWELLING (1d844)
  // 5-6	tomb/crypt			5-6	BURIAIJREIJGI0us
  // 7-9	shrine			(1d8+4)
  // 1041	temple/retreat			7-8	STEADING (00+2)
  // 12	great temple			9-12	DUNGEON (pp60-61)
  // CREATURE responsible (1d4+4),				CREATURE responsible (1d444),
  // ALIGNMENT, ASPECT				AGE (1d8.4), RUINATION,
  // 				VISIBILITY
  return "";
}
