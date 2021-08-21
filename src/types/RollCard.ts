// Generic type to hold data for multiple different card types
// Maybe down the road I'll just make the other types inherit this
export class RollCard {
  constructor(public type: string, public value: any, public timestamp: string) { };
}