import { Account as PrismaAccount } from '@prisma/client';
import { Account } from '../../../../domain/account/entity/account.entity';


import { AccountId } from 'src/domain/account/entity/value-objects/account-id.vo';
import { Password } from 'src/domain/account/entity/value-objects/account-password.vo';
import { SdvxId } from 'src/domain/account/entity/value-objects/sdvx-id.vo';
import { PlayerName } from 'src/domain/account/entity/value-objects/player-name.vo';
import { SkillLevel } from 'src/domain/account/entity/value-objects/skill-level.vo';

export class AccountMapper {
  static toDomain(raw: PrismaAccount): Account {
    const account = new Account();

    account.idx = raw.idx;
    account.id = new AccountId(raw.id);
    account.pw = new Password(raw.pw);
    account.sdvxId = raw.sdvxId ? new SdvxId(raw.sdvxId) : null;
    account.playerName = raw.playerName ? new PlayerName(raw.playerName) : null;
    account.skillLevel = raw.skillLevel ? new SkillLevel(raw.skillLevel) : null;
    account.vf = raw.vf;
    account.playCount = raw.playCount;
    account.rankIdx = raw.rankIdx;
    account.isHidden = raw.isHidden;
    account.createdAt = raw.createdAt;
    account.updatedAt = raw.updatedAt;
    account.deletedAt = raw.deletedAt;

    return account;
  }

  static toPersistence(account: Account) {
    return {
      idx: account.idx,
      pw: account.pw.getValue(),
      sdvxId: account.sdvxId?.value,
      playerName: account.playerName?.value,
      skillLevel: account.skillLevel?.value,
      vf: account.vf,
      playCount: account.playCount,
      rankIdx: account.rankIdx,
      isHidden: account.isHidden,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      deletedAt: account.deletedAt,
    };
  }
}
