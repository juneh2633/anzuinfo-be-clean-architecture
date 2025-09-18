export class PlayerName {
  private readonly value: string;

  constructor(value: string) {
    // Based on schema, playerName is optional.
    if (value.length > 255)
      throw new Error('Player name must be 255 characters or less.');
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}
