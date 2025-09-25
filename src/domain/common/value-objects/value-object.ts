export abstract class ValueObject<T> {
  // 값은 외부에서 바꾸지 못하게 private
  private readonly _value: T;

  protected constructor(value: T) {
    this.validate(value);
    this._value = value;
    Object.freeze(this); // 얕은 불변성
  }

  /** 서브클래스가 유효성 규칙 구현 */
  protected abstract validate(value: T): void;

  /** 값 읽기(참조만) */
  public get value(): T {
    return this._value;
  }

  /** 서브클래스에서 비교 커스터마이즈 가능 */
  protected isEqual(a: T, b: T): boolean {
    // 기본: Object.is (원시, bigint, NaN, -0 케이스 안전)
    return Object.is(a as unknown, b as unknown);
  }

  /** 타입까지 포함해 동등성 비교 */
  public equals(other?: ValueObject<T> | null): boolean {
    if (!other) return false;
    if (other.constructor !== this.constructor) return false;
    return this.isEqual(this._value, other._value);
  }

  public toString(): string {
    return String(this._value);
  }

  public toJSON(): unknown {
    return this._value as unknown;
  }

  /** 언랩 헬퍼 */
  public unwrap(): T {
    return this._value;
  }
}

