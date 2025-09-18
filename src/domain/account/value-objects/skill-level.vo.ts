export class SkillLevel {
  private readonly _value: number;

  constructor(value: number) {
    if (value < 1 || value > 11) {
      throw new Error('SkillLevel must be between 1 and 11.');
    }
    this._value = value;
  }

  public get value(): number {
    return this._value;
  }
}
