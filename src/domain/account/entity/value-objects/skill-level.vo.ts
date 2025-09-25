import { ValueObject } from 'src/domain/common/value-objects/value-object';
import { InvalidArgumentException } from 'src/domain/common/exceptions/invalid-argument.exception';

export class SkillLevel extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): void {
    if (value.length > 255) {
      throw new InvalidArgumentException(
        'Skill level must be 255 characters or less.',
      );
    }
  }
}
