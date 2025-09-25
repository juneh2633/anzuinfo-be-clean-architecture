import { InvalidArgumentException } from 'src/domain/common/exceptions/invalid-argument.exception';
import { ValueObject } from 'src/domain/common/value-objects/value-object';

export class Vf extends ValueObject<number> {
  constructor(value: number) {
    super(value);
  }

  protected validate(value: number): void {
    if (!Number.isInteger(value) || value < 0) {
      throw new InvalidArgumentException('VF must be a non-negative integer.');
    }
  }
}
