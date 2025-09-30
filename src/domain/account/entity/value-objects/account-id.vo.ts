import { ValueObject } from 'src/domain/common/value-objects/value-object';

export class AccountId extends ValueObject<string> {

  constructor(value: string) {
    super(value);
  }
  protected validate(value: string): void {
    if (!value) throw new Error('ID is required.');
    if (value.length > 255)
      throw new Error('ID must be 255 characters or less.');
  }
}
