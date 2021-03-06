import { sample } from "lodash";
import { bodgeString } from "./utils";

export type Place = string;

export const places = {
  templates: [
    'The [PLACE]',
    'The [ADJECTIVE] [PLACE]',
    'The [PLACE] of (the) [NOUN]',
    '(The) [NOUN]\'s [PLACE]',
    '[PLACE] of the [ADJECTIVE] [NOUN]',
    'The [ADJECTIVE] [NOUN]'
  ],
  place: ['Barrier', 'Beach', 'Bowl', 'Camp', 'Cave', 'Circle', 'City', 'Cliff', 'Crater', 'Crossing', 'Crypt', 'Den', 'Ditch', 'Falls', 'Fence', 'Field', 'Fort', 'Gate', 'Grove', 'Hill', 'Hole', 'Hut', 'Keep', 'Lake', 'Marsh', 'Meadow', 'Mountain', 'Pit', 'Post', 'Ridge', 'Ring', 'Rise', 'Road', 'Rock', 'Ruin', 'Shrine', 'Spire', 'Spring', 'Stone', 'Tangle', 'Thmple', 'Throne', 'Tomb', 'Tower', 'Town', 'Tree', 'Vale', 'Valley', 'Village', 'Wall',],
  adjective: ['Ancient', 'Ashen', 'Black', 'Bloody', 'Blue', 'Bright', 'Broken', 'Burning', 'Clouded', 'Copper', 'Cracked', 'Dark', 'Dead', 'Doomed', 'Endless', 'Fallen', 'Far', 'Fearsome', 'Floating', 'Forbidden', 'Frozen', 'Ghostly', 'Gloomy', 'Golden', 'Grim', 'Hidden', 'High', 'Iron', 'Jagged', 'Lonely', 'Lost', 'Low', 'Near', 'Petrified', 'Red', 'Screaming', 'Sharp', 'Shattered', 'Shifting', 'Shining', 'Shivering', 'Shrouded', 'Silver', 'Stalwart', 'Stoney', 'Sunken', 'Thorny', 'Thundering', 'White', 'Withered',],
  noun: ['[Name]', 'Arm', 'Ash', 'Blood', 'Child', 'Cinder', 'Corpse', 'Crystal', 'Dagger', 'Death', 'Demon', 'Devil', 'Doom', 'Eye', 'Fear', 'Finger', 'Fire', 'Foot', 'Ghost', 'Giant', 'Goblin', 'God', 'Gold', 'Hand', 'Head', 'Heart', 'Hero', 'Hope', 'King', 'Knave', 'Knight', 'Muck', 'Mud', 'Priest', 'Queen', 'Sailor', 'Silver', 'Skull', 'Smoke', 'Souls', 'Spear', 'Spirit', 'Stone', 'Sword', 'Thief', 'Troll', 'Warrior', 'Water', 'Witch', 'Wizard',],
};

export function rollPlace(): Place {
  let template = sample(places.templates);
  let place = bodgeString(template, places);

  return place;
}