import { Account } from "../../entity/account.entity";

export interface IAccountWriteRepository {
  create(account: Account): Promise<Account>;
  // update, delete 등...
}