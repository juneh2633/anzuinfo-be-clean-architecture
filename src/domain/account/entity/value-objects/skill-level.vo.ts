export class SkillLevel {
  private readonly value: string;

  constructor(value: string) {
    // Based on schema, skillLevel is optional.
    if (value.length > 255) throw new Error('Skill level must be 255 characters or less.');
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}
