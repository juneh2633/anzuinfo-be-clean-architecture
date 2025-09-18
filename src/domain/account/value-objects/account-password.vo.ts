export class Password {
  private readonly _value: string;

  constructor(value: string) {
    // Add more complex password validation if needed
    if (value.length < 4) {
      throw new Error('Password must be at least 4 characters long.');
    }
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }
}
