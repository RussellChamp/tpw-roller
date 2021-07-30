import { random, sample } from 'lodash';
import { Creature, rollCreature } from './creatures';
import { rollAlignment, rollElement, rollMagicType, rollOddity, rollTerrain } from './details';
import { rollDungeon } from './dungeons';
import { rollSteading, Steading } from './steadings';
import { rollTreasure } from './treasures';

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
  let feature = random(1, 3) == 3 ? sample([rollAlignment().description, rollMagicType().description]) + " " : "";

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
  if (roll <= 3) {
    return "burrow";
  } else if (roll <= 7) {
    return "cave/tunnels";
  } else if (roll <= 9) {
    return "nest/aerie";
  } else if (roll <= 10) {
    return "hive";
  } else if (roll <= 10) {
    return `${rollRuinStructure()} ruins`;
  }

  return "";
}

export function rollObstacle(roll: number = random(1, 12)): string {
  if (roll <= 5) {
    return "difficult ground";
  } else if (roll <= 8) {
    return "cliff/crevasse/chasm";
  } else if (roll <= 10) {
    return "ravine/gorge";
  } else if (roll <= 12) {
    return rollOddity().description;
  }

  return "";
}

export function rollTerrainChange(roll: number = random(1, 12)): string {
  if (roll <= 4) {
    return `limited area of ${rollTerrain()}`;
  } else if (roll <= 6) {
    return "crevice/hole/pit/cave";
  } else if (roll <= 8) {
    return "altitude change";
  } else if (roll <= 10) {
    return "canyon/valley";
  } else if (roll <= 12) {
    return "rise/peak in distance";
  }

  return "";
}

export function rollWaterFeature(roll: number = random(1, 12)): string {
  if (roll <= 1) {
    return "spring/hotspring";
  } else if (roll <= 2) {
    return "waterfall/geyser";
  } else if (roll <= 6) {
    return "creek/stream/brook";
  } else if (roll <= 8) {
    return "pond/lake";
  } else if (roll <= 10) {
    return "river";
  } else if (roll <= 12) {
    return "sea/ocean";
  }

  return "";
}

export function rollLandmark(roll: number = random(1, 12)): string {
  if (roll <= 3) {
    return "water-based (water-fall, geyser, etc.)";
  } else if (roll <= 6) {
    return "plant-based (ancient tree, giant flowers, etc.)";
  } else if (roll <= 10) {
    return "earth-based (peak, formation, crater, etc.)";
  } else if (roll <= 12) {
    return rollOddity().description
  }

  return "";
}

export function rollResource(roll: number = random(1, 12)): string {
  if (roll <= 4) {
    return "game/fruit/vegetable";
  } else if (roll <= 6) {
    return "herb/spice/dye source";
  } else if (roll <= 9) {
    return "timber/stone";
  } else if (roll <= 11) {
    return "ore (copper, iron, etc.)";
  } else if (roll <= 12) {
    return "precious metal/gems";
  }

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
  if (roll <= 3) {
    return "faint/unclear";
  } else if (roll <= 6) {
    return "definite/clear";
  } else if (roll <= 8) {
    return "multiple";
  } else if (roll <= 10) {
    return "signs of violence";
  } else if (roll <= 12) {
    return "trail of blood/other";
  }

  return "";
}

export function rollRemainsDebris(roll: number = random(1, 12)): string {
  if (roll <= 4) {
    return "bones";
  } else if (roll <= 7) {
    return "corpse/carcass";
  } else if (roll <= 9) {
    return "site of violence";
  } else if (roll <= 10) {
    return "junk/refuse";
  } else if (roll <= 11) {
    return "lost supplies/cargo";
  } else if (roll <= 12) {
    return "tools/weapons/armor";
  }

  return "";
}

export function rollStashCache(roll: number = random(1, 12)): string {
  if (roll <= 3) {
    return "trinkets/coins";
  } else if (roll <= 5) {
    return "tools/weapons/armor";
  } else if (roll <= 7) {
    return "map";
  } else if (roll <= 9) {
    return "food/supplies";
  } else if (roll <= 12) {
    return rollTreasure();
  }

  return "";
}

export function rollDiscoveryCreature(roll: number = random(1, 12)): Discovery {
  let discovery = new Discovery(roll, 0, 0, "creature");
  discovery.creature = rollCreature();
  discovery.subcategory = `${discovery.creature.type}/${discovery.creature.subtype}`;
  discovery.description = discovery.creature.description;

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
    discovery.steading = rollSteading();
    discovery.description = discovery.steading.description;
    discovery.specificroll = 0;
  } else if (subroll <= 12) {
    discovery.subcategory = "ruin";
    discovery.description = rollRuinStructure(specificroll);
  }

  return discovery;
}

export function rollEnigmaticStructure(roll: number = random(1, 12)): string {
  if (roll <= 4) {
    return "earthworks";
  } else if (roll <= 8) {
    return "megalith";
  } else if (roll <= 11) {
    return "statue/idol/totem";
  } else if (roll <= 12) {
    return rollOddity().description;
  }

  return "";
}

export function rollInfrastructureStructure(roll: number = random(1, 12)): string {
  if (roll <= 4) {
    return "track/path";
  } else if (roll <= 8) {
    return "road";
  } else if (roll <= 10) {
    return "bridge/ford";
  } else if (roll <= 11) {
    return "mine/quarry";
  } else if (roll <= 12) {
    return "aqueduct/canal/portal";
  }

  return "";
}

export function rollDwellingStructure(roll: number = random(1, 12)): string {
  if (roll <= 3) {
    return "campsite";
  } else if (roll <= 6) {
    return "hovel/hut";
  } else if (roll <= 8) {
    return "farm";
  } else if (roll <= 10) {
    return "inn/roadhouse";
  } else if (roll <= 12) {
    return "tower/keep/estate";
  }

  return "";
}

export function rollBurialReligiousStructure(roll: number = random(1, 12)): string {
  if (roll <= 2) {
    return "grave marker/barrow";
  } else if (roll <= 4) {
    return "graveyard/necropolis";
  } else if (roll <= 6) {
    return "tomb/crypt";
  } else if (roll <= 9) {
    return "shrine";
  } else if (roll <= 11) {
    return "temple/retreat";
  } else if (roll <= 12) {
    return "great temple";
  }

  return "";
}

export function rollRuinStructure(roll: number = random(1, 12)): string {
  if (roll <= 2) {
    return `${rollInfrastructureStructure(random(1, 6) + 6)} ruins`;
  } else if (roll <= 4) {
    return `${rollDwellingStructure(random(1, 8) + 4)} ruins`;
  } else if (roll <= 6) {
    return `${rollBurialReligiousStructure(random(1, 8) + 4)} ruins`;
  } else if (roll <= 8) {
    return `${rollSteading(random(1, 10) + 2).description} ruins`;
  } else if (roll <= 12) {
    return `${rollDungeon().printDescription()} ruins`;
  }

  return "";
}
