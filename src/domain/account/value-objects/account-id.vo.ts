export class AccountId {
  private readonly _value: number;

  constructor(value: number) {
    if (value <= 0) {
      throw new Error('AccountId must be a positive number.');
    }
    this._value = value;
  }

  public get value(): number {
    return this._value;
  }
}
