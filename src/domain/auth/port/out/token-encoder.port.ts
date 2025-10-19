import { AuthUserClaim } from "../../entity/auth-user-claim";

export interface TokenEncoderPort {
  sign(payload: AuthUserClaim, options?: { expiresIn?: string | number }): Promise<string>;

  verify<T extends object = AuthUserClaim>(token: string): Promise<T>;  

  tryVerify<T extends object = AuthUserClaim>(token: string): Promise<T | null>;
     
  decode<T = any>(token: string): T | null
}

   