import { ValueObject } from "src/domain/common/value-objects/value-object";

export class Password extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): void {
    if (!value) throw new Error('Password is required.');
  }
}
