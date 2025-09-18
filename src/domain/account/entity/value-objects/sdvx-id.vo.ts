export class SdvxId {
  private readonly value: string;

  constructor(value: string) {
    // Based on schema, sdvxId is optional. The VO represents a valid, existing sdvxId.
    if (value.length > 255) throw new Error('SDVX ID must be 255 characters or less.');
    // Example validation: check for format like 'SV-XXXX-XXXX'
    // if (!/^SV-\d{4}-\d{4}$/.test(value)) {
    //   throw new Error('Invalid SDVX ID format.');
    // }
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}
