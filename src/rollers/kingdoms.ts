import { random, sample } from 'lodash';

export class Kingdom {
  constructor(public description: string = "", public subtitle: string = "") { };
  categories: string[];
  male: string[];
  female: string[];
  steading: string[];
  mount: string[];
}

export const kingdoms: { [kingdom: string]: Kingdom } = {
  arpad: {
    description: 'The Kingdom of Arpad',
    subtitle: 'Based loosely on Hungarian',
    categories: ['male', 'female', 'steading', 'mount'],
    male: ['Agoston', 'Arpad', 'Attila', 'Bognar', 'Denes', 'Edmond', 'Erno', 'Etele', 'Ferdinand', 'Florian', 'Geza', 'Gyula', 'Hugo', 'Karcsi', 'Konrad', 'Lazlo', 'Lukas', 'Marko', 'Miklos', 'Peti', 'Robi', 'Tamas', 'Ronold', 'Viktor', 'Zoltan',],
    female: ['Abigel', 'Aliz', 'Amalia', 'Andrea', 'Aranka', 'Csilla', 'Edit', 'Erzebet', 'Gertrud', 'Greta', 'Iren', 'Kamilla', 'Lara', 'Ua', 'Lujza', 'Matild', 'Olga', 'Otilia', 'Parma', 'Roza', 'Terez', 'Tunda', 'Valeria', 'Vilma', 'Viola',],
    steading: ['Aldott (Blessed)', 'Almahid (Applebridge)', 'Elesett (Fallen)', 'Feketz (Black Rock)', 'Godor (Pit)', 'Kelegaz (Eastford)', 'Kigyov (Snake Swamp)', 'Kiralokas (Queen\'s Castle)', 'Kiralsir (King\'s Grave)', 'Magziklar (Highcliff)', 'Mocsar (Fen)', 'Nagyvros (Hightown)', 'Okorm (Oxfield)', 'Orkfal (Orcwail)', 'Perov (Redwater)', 'Soterdo (Dark Wood)', 'Tehenvar (Cow Town)', 'Toron (Tower)', 'Torott (Ironhold)', 'Utolszer (Last Stand)', 'Valavolg (Greendale)', 'Vastar (Dwarf Watch)', 'Viz (Oxfield)', 'Volgyom (Valley)', 'Zoldom (Green Hill)',],
    mount: ['Barat (Friend)', 'Barsony (Velvet)', 'Eclesem (Sweetheart)', 'Egatz (Skyfire)', 'Eso (Rain)', 'Fakyla (Torch)', 'Feketsor (Black Mane)', 'Felho (Cloud)', 'Fiotta (Fleet)', 'Gazda (Master)', 'Hold (Moon)', 'Igaslo (Dobbin)', 'Ijeda (Skittish)', 'Koszalo (Rambler)', 'Megmento (Savior)', 'Napfen (Sunshine)', 'Rozsa (Rose)', 'Szamla (Bill)', 'Szellem (Spritied)', 'Szeplok (Freckles)', 'Szerence (Lucky)', 'Tusko (Stumps)', 'Vad (Wild One)', 'Vihar (Storm)', 'Villam (Lightning)',]
  },
  oloru: {
    description: 'Oloru, Sky-God\'s Home',
    subtitle: 'Based loosely on Yoruba',
    categories: ['male', 'female', 'steading', 'mount'],
    male: ['Mibemi', 'Aboye', 'Megoke', 'Ayokunle', 'Babajide', 'Babatunde', 'Enitan', 'Femi', 'Kayin', 'Kayode', 'Lanre', 'Lekan', 'Mongo', 'Nwachukwu', 'Oban', 'Ogun', 'Olukayode', 'Oluwalanni', 'Oluwatoke', 'Onipede', 'Sijuade', 'Toben', 'Utiba', 'Zaki', 'Zoputan',],
    female: ['Abeni', 'Me', 'Alaba', 'Bolanle', 'Bosade', 'Daraja', 'Fan', 'Gbemisola', 'Ife', 'Ige', 'Lewa', 'Mojisola', 'Monifa', 'Olufemi', 'Omolara', 'Oni', 'Orisa', 'Osa', 'Ronke', 'Shanum', 'Simisola', 'Titlayo', 'Yejide', 'Yewande', 'Zauna',],
    steading: ['Asala Ilu (Desert Town)', 'Atijo ma (Old Fire)', 'Bajesia (Broken Banner)', 'Dudu Olomi (Blackmarsh)', 'Ebutte Meta (Three Ports)', 'Eodo (Snake River)', 'Esukale (Devil\'s Dinner)', 'Fadormi (Silver Spring)', 'Funfumi (Whitewater)', 'Gooluna (Gold Road)', 'Ijisofo (Storm Hollow)', 'Ikukenu (Dearth\'s Door)', 'Twin Ago (Faery Watch)', 'Jinibi (Far Place)', 'Oba Ile (King\'s Home)', 'Oduroke (Prayer Hill)', 'Ogbinibi (Farming Place)', 'Ogunibi (Battle Place)', 'Okanigi (One Tree)', 'Okutasibo (Stone Marker)', 'Olorusura (God\'s Treasure)', 'Olusajeki (Wizard\'s Keep)', 'Oluwakaji (Lord\'s Tomb)', 'Opolokuta (Many Stones)', 'Opoligi (Many Trees)'],
    mount: ['Adiitu (Mystery)', 'Alayo (Happy)', 'Atale (Ginger)', 'Bilu (Bill)', 'Dudupatak (Dark Hoof)', 'Egun (Bramble)', 'Eniyan (Ember)', 'Esirun (Longshanks)', 'Fenuko (Kiss)', 'Funfungo (White Hair)', 'Gunirun (Longhair)', 'Imole (Bright)', 'Imole Uju (Bright Eye)', 'Ira (Rambler)', 'Itan (Story)', 'Iyebiye (Precious)', 'Lulu (Powder)', 'Nilera (Healthy)', 'Ogbo (Spotted)', 'Ogboju (Brave Heart)', 'Ojiji (Shadow)', 'Olooto (Faithful)', 'Orisa (Spring)', 'Orun (Heaven)', 'Sare (Flash)'],
  },
  valkoina: {
    description: 'Valkoina, Land of White Iron',
    subtitle: 'Based loosely on Finnish',
    categories: ['male', 'female', 'steading', 'mount'],
    male: ['Aatami', 'Armas', 'Arsi', 'Arvi', 'Eetu', 'Hannu', 'Heimo', 'Ilkka', 'Jorma', 'Kaapo', 'Kain', 'Kauko', 'Lari', 'Manu', 'Nuutti', 'Petri', 'Rairno', 'Reima', 'Risto', 'Sakari', 'Sampsa', 'Seppo', 'Taito', 'Terho', 'Vilppu',],
    female: ['Aija', 'Ama', 'Ainikki', 'Heini', 'Ilona', 'Irja', 'Jaana', 'Kirsi', 'Maija', 'Marita', 'Miina', 'Mimmi', 'Minja', 'Mira', 'Naemi', 'Outi', 'Pirjo', 'Paivikki', 'Riikka', 'Saimi', 'Suoma', 'Suvi', 'Tuula', 'Vellamo', 'Virpi',],
    steading: ['Etuvartio (Outpost)', 'Hopea Kaivos (Silver Mine)', 'Kalapunki (Fish Town)', 'Kivimurri (Stone Wall)', 'Maaginen (Magic)', 'Maki Linna (Hill Castle)', 'Merenranta (Seaside)', 'Metsastysniaat (Hunting Ground)', 'Mustakota (Black Hut)', 'Maenrinne (Hillside)', 'Paja (Forge)', 'Pienni Paikka (Low Place)', 'Pyha Paikka (Holy Place)', 'Rantakallio (Cliff)', 'Rikki (Broken)', 'Suo (Swamp)', 'Suosi (Favored)', 'Torni (Tower)', 'Turvapaikka (Refuge)', 'Uusipunki (New Town)', 'Valkoinen Kivi (Whitestone)', 'Valtaistuin (Throne)', 'Vapaanki (Free Town)', 'Vihrea Paikka (Green Place)', 'Viimeinen Koti (Last Home)',],
    mount: ['Aave (Ghost)', 'Enkeli (Angel)', 'Haiva (Shadow)', 'Hopea (Silver)', 'Ilmavirta (Current)', 'Kesi (Tame)', 'Kestaba (Durable)', 'Kiukuinnen (Angry)', 'Lansiviima (West Wind)', 'Luotettava (Trusty)', 'Myrskyisa (Stormy)', 'Nokka (Bill)', 'Noyra (Humble)', 'Pitkanena (Longnose)', 'Saikki (Skittish)', 'Salama (Thunderbolt)', 'Sankani (Hero)', 'Sisko (sister)', 'Upea (Magnificent)', 'Vahva (Strong)', 'Valkoinen (White)', 'Varmaotteinen (Surefoot)', 'Vesuri (Billhook)', 'Vinha (Fast)', 'Ystava (Friend)',]
  },
  tamanarugan: {
    description: 'The Tamanarugan Empire',
    subtitle: 'Based loosely on Indonesian',
    categories: ['male', 'female', 'steading', 'mount'],
    male: ['Me', 'Mi', 'Amaziah', 'Ayokunle', 'Ary', 'Bambang', 'Bima', 'Budi', 'Darma', 'Dian', 'Eli', 'Gunardi', 'Hartono', 'Irwan', 'Lauwita', 'Manusama', 'Okan', 'Onesimus', 'Sammin', 'Tameem', 'Tanaya', 'Tirto', 'Wiryono', 'Yandi', 'Zebulun',],
    female: ['Mah', 'Bulan', 'Candrakusuma', 'Devi', 'Hanjojo', 'Iman', 'Intan', 'Laksniini', 'Lestari', 'Limijanto', 'Marah', 'Megawati', 'Melati', 'Nadiyya', 'Ophrah', 'Ramza', 'Sapphiral', 'Selah', 'Suminten', 'Tamar', 'Tanjaya', 'Tjokro', 'Tri', 'Wangi', 'Zenze',],
    steading: ['Airdib (Blessed Waters)', 'Airjinh (Clearwater)', 'Akhir Jalan (Road\'s End)', 'Berdarah (Bloody)', 'Bidang Bera (Fallow Field)', 'Candibula (Moon Temple)', 'Ditingga (Forsaken)', 'Emasungai (Gold Creek)', 'Gunung (Mountain)', 'Kayu (Timber)', 'Kuil (Temple)', 'Ladang Hijau (Greenfield)', 'Lembah (Valley)', 'Menjau (Far Away)', 'Ngarai (Canyon)', 'Persimpangan (Crossroads)', 'Puncakit (Hilltop)', 'Sungairac (Bison River)', 'Teibing (Cliffside)', 'Tempat Aman (Safe Place)', 'Tempat Istir (Rest Place)', 'Terkutuk (Cursed)', 'Tersentu (Touched by God)', 'Wahah (Oasis)', 'Yangtinggi (High Tower)',],
    mount: ['Anginu (North Wind)', 'Api (Blaze)', 'Bakat (Felicity)', 'Bakti (Loyal)', 'Beruntung (Lucky)', 'Bilah (Blade)', 'Biru (Blue)', 'Gemetar (Quiver)', 'Guntur (Thunder)', 'Hidungi (Black Nose)', 'Janda (Widow)', 'Kakicerah (Bright Foot)', 'Kakiring (Light Foot)', 'Keriangan (Sunshine)', 'Kunang (Firefly)', 'Lapar (Hungry)', 'Murni (Pure)', 'Paruh (Bill)', 'Penebus (Avenger)', 'Penyelemat (Savior)', 'Prajurit (Warrior)', 'Rusak (Broken)', 'Satucep (Fast One)', 'Setia (True Heart)', 'Tahanla (Durable)',]
  },
};

export function rollKingdom(roll: number = random(1, 4)): Kingdom {
  let key = Object.keys(kingdoms)[roll - 1];

  return kingdoms[key];
}

export function rollCategory(kingdom: string = "", category: string = ""): string {
  if (kingdoms[kingdom] && kingdoms[kingdom][category]) {
    return sample(kingdoms[kingdom][category]);
  }
  return "";
}