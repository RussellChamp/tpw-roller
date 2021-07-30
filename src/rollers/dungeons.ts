export class Dungeon {
  size: Size;
  ruination: string;
  builder: string;
  function: string;
  themes: string[];
  discovery: string;
  danger: string;

  printDescription() {
    return `${this.size.size} ${this.builder} ${this.function}`;
  }
}

export class Size {
  constructor(public size: string = "", public themes: string = "", public areas: string = "") { };
}

export function rollDungeon(): Dungeon {
  // TODO: Add the who dungeon thing
  let dungeon = new Dungeon();
  dungeon.size = new Size("huge");
  dungeon.builder = "dwarves";
  dungeon.function = "mine";

  return new Dungeon();
}