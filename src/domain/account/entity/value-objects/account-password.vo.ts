export class Password {
  // This value should be the hashed password, not plain text.
  private readonly value: string;

  constructor(value: string) {
    if (!value) throw new Error('Password is required.');
    // In a real scenario, you might validate the plain text password's complexity
    // *before* it gets hashed and passed to this constructor.
    // The constructor here just ensures the hashed value is not empty.
    this.value = value;
  }

  toString(): string {
    // Avoid returning the hashed password unless necessary.
    // This could be for persistence purposes.
    return this.value;
  }
}
