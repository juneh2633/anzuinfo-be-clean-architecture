import { ValueObject } from 'src/domain/common/value-objects/value-object';
import { InvalidArgumentException } from 'src/domain/common/exceptions/invalid-argument.exception';

export class RankIdx extends ValueObject<number> {
  constructor(value: number) {
    super(value);
  }

  protected validate(value: number): void {
    if (
      typeof value !== 'number' ||
      !Number.isInteger(value) ||
      ![0, 1, 2].includes(value)
    ) {
      throw new InvalidArgumentException('rankIdx must be one of 0, 1, or 2');
    }
  }
}
