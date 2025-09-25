import { InvalidArgumentException } from 'src/domain/common/exceptions/invalid-argument.exception';
import { ValueObject } from 'src/domain/common/value-objects/value-object';

export class SdvxId extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): void {
    if (value.length > 255) {
      throw new InvalidArgumentException(
        'SDVX ID must be 255 characters or less.',
      );
    }
  }
}
