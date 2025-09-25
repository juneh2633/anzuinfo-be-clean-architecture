import { ValueObject } from './value-object';
import { InvalidArgumentException } from 'src/domain/common/exceptions/invalid-argument.exception';

export class CreatedAt extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
  }

  protected validate(value: Date): void {
    if (!(value instanceof Date)) {
      throw new InvalidArgumentException(
        'CreatedAt must be a valid Date object',
      );
    }
  }
}
