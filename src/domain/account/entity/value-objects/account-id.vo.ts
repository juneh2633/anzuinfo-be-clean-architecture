export class AccountId {
  private readonly value: string;

  constructor(value: string) {
    if (!value) throw new Error('ID is required.');
    if (value.length > 255)
      throw new Error('ID must be 255 characters or less.');
    // Add other validation rules as needed (e.g., regex for allowed characters)
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}
