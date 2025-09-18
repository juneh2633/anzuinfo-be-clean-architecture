export class PlayerName {
  private readonly _value: string;

  constructor(value: string) {
    if (value.length > 8) {
      throw new Error('PlayerName cannot be longer than 8 characters.');
    }
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }
}
