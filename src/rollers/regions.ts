import { sample } from "lodash";
import { bodgeString } from "./utils";

export type Region = string;

export const regions = {
  templates: [
    '[ADJECTIVE] [TERRAIN]',
    '[TERRAIN] of (the) [NOUN]',
    'The [TERRAIN] [ADJECTIVE]',
    '[NOUN] [TERRAIN]',
    '[NOUN]\'s [ADJECTIVE] [TERRAIN]',
    '[ADJECTIVE] [TERRAIN] of (the) [NOUN]'
  ],
  terrain: ['Bay', 'Bluffs', 'Bog', 'Cliffs', 'Desert', 'Downs', 'Dunes', 'Expanse', 'Fells', 'Fen', 'Flats', 'Foothills', 'Forest', 'Groves', 'Heath', 'Heights', 'Hills', 'Hollows', 'Jungle', 'Lake', 'Lowland', 'March', 'Marsh', 'Meadows', 'Moor', 'Morass', 'Mounds', 'Mountains', 'Peaks', 'Plains', 'Prairie', 'Quagmire', 'Range', 'Reach', 'Sands', 'Savanna', 'Scarps', 'Sea', 'Slough', 'Sound', 'Steppe', 'Swamp', 'Sweep', 'Teeth', 'Thicket', 'Upland', 'Wall', 'Waste', 'Wasteland', 'Woods',],
  adjective: ['Ageless', 'Ashen', 'Black', 'Blessed', 'Blighted', 'Blue', 'Broken', 'Burning', 'Cold', 'Cursed', 'Dark', 'Dead', 'Deadly', 'Deep', 'Desolate', 'Diamond', 'Dim', 'Dismal', 'Dun', 'Eerie', 'Endless', 'Fallen', 'Far', 'Fell', 'Flaming', 'Forgotten', 'Forsaken', 'Frozen', 'Glittering', 'Golden', 'Green', 'Grim', 'Holy', 'Impassable', 'Jagged', 'Light', 'Long', 'Misty', 'Perilous', 'Purple', 'Red', 'Savage', 'Shadowy', 'Shattered', 'Shifting', 'Shining', 'Silver', 'White', 'Wicked', 'Yellow',],
  noun: ['[NAME]', 'Ash', 'Bone', 'Darkness', 'Dead', 'Death', 'Desolation', 'Despair', 'Devil', 'Doom', 'Dragon', 'Fate', 'Fear', 'Fire', 'Fury', 'Ghost', 'Giant', 'God', 'Gold', 'Heaven', 'Hell', 'Honor', 'Hope', 'Horror', 'King', 'Life', 'Light', 'Lord', 'Mist', 'Peril', 'Queen', 'Rain', 'Refuge', 'Regret', 'Savior', 'Shadow', 'Silver', 'Skull', 'Sky', 'Smoke', 'Snake', 'Sorrow', 'Storm', 'Sun', 'Thorn', 'Thunder', 'Traitor', 'Troll', 'Victory', 'Witch',]
};

export function rollRegion(): string {
  let template = sample(regions.templates);
  let region = bodgeString(template, regions);

  return region;
}