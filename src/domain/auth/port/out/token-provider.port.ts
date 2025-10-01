export type AuthUserClaim = {
  idx: number;
  id: string;
  rankIdx?: number | null;
  vf?: number | null;
};

export interface TokenProvider {
  sign(payload: AuthUserClaim, options?: { expiresIn?: string | number }): Promise<string>;


  verify<T extends object = AuthUserClaim>(token: string): T;

  tryVerify<T extends object = AuthUserClaim>(token: string): T | null;

  decode<T = any>(token: string): T | null;
}

