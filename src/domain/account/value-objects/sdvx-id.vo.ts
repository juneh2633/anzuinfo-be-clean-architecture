export class SdvxId {
  private readonly _value: string;

  constructor(value: string) {
    const sdvxIdRegex = /^SV-\d{4}-\d{4}$/;
    if (!sdvxIdRegex.test(value)) {
      throw new Error('Invalid SdvxId format.');
    }
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }
}
