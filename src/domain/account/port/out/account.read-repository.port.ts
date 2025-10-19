import { Account } from "../../entity/account.entity";

export interface AccountReadRepositoryPort {
  findByIdx(idx: number): Promise<Account | null>;
  findById(id: string): Promise<Account | null>;
  findBySdvxId(sdvxId: string): Promise<Account | null>;
  findByPlayerName(playerName: string): Promise<Account | null>;
}