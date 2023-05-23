export class Pickup {
  public id: number;

  public x: number;

  public y: number;

  public type: string; // cash or exp

  public amount: number;

  constructor(id: number, x: number, y: number, type: string, amount: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.amount = amount;
  }
}
