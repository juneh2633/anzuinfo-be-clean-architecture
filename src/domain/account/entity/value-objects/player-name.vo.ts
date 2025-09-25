import { ValueObject } from "src/domain/common/value-objects/value-object";

export class PlayerName extends ValueObject<string> {
  
  protected validate(value: string): void {
    if (value.length > 255) {
      throw new Error('Player name must be 255 characters or less.');
    }
  }
}
