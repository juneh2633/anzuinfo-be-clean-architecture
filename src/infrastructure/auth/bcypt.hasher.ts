import { Injectable } from "@nestjs/common";
import { PasswordHasher } from "src/domain/auth/port/out/password-hasher.port";
import { compareSync , hashSync} from 'bcrypt'

@Injectable()
export class BcryptHasher implements PasswordHasher {
  hash(plain: string) { return hashSync(plain, 1); }
  compare(plain: string, hashed: string) { return compareSync(plain, hashed); }
}