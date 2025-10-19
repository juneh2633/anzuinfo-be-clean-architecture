import { Account } from "../../entity/account.entity";

export interface AccountWriteRepositoryPort {
  create(account: Account): Promise<Account>;
  // update, delete 등...
}