import { ValueObject } from 'src/domain/common/value-objects/value-object';
import { InvalidArgumentException } from 'src/domain/common/exceptions/invalid-argument.exception';

export class IsHidden extends ValueObject<boolean> {
  constructor(value: boolean | number) {
    const validatedValue = IsHidden.convertAndValidate(value);
    super(validatedValue);
  }

  protected validate(value: boolean): void {
    // The conversion logic handles validation, so this can be empty
    // or contain additional checks if needed.
  }

  public getValueAsNumber(): 0 | 1 {
    return this.value ? 1 : 0;
  }

  private static convertAndValidate(value: boolean | number | null): boolean {
    if (value === null || value === undefined) {
      throw new InvalidArgumentException('IsHidden must be a boolean, 0, or 1');
    }
    if (typeof value === 'boolean') {
      return value;
    }
    if (value === 0) {
      return false;
    }
    if (value === 1) {
      return true;
    }
    throw new InvalidArgumentException('IsHidden must be a boolean, 0, or 1');
  }
}
