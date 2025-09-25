import { Account as PrismaAccount } from '@prisma/client';
import { Account } from '../../../../domain/account/entity/account.entity';
import { AccountId } from '../../../../domain/account/entity/value-objects/account-id.vo';
import { Password } from '../../../../domain/account/entity/value-objects/account-password.vo';
import { SdvxId } from '../../../../domain/account/entity/value-objects/sdvx-id.vo';
import { PlayerName } from '../../../../domain/account/entity/value-objects/player-name.vo';
import { SkillLevel } from '../../../../domain/account/entity/value-objects/skill-level.vo';
import { Vf } from '../../../../domain/account/entity/value-objects/vf.vo';
import { PlayCount } from '../../../../domain/account/entity/value-objects/play-count.vo';
import { IsHidden } from '../../../../domain/account/entity/value-objects/isHidden.vo';
import { CreatedAt } from '../../../../domain/common/value-objects/createdAt.vo';
import { UpdatedAt } from '../../../../domain/common/value-objects/updatedAt.vo';
import { DeletedAt } from '../../../../domain/common/value-objects/deletedAt.vo';

export class AccountMapper {
  static toDomain(raw: PrismaAccount): Account {
    const account = new Account();

    account.idx = raw.idx;
    account.id = new AccountId(raw.id);
    account.pw = new Password(raw.pw);
    account.sdvxId = raw.sdvxId ? new SdvxId(raw.sdvxId) : null;
    account.playerName = raw.playerName ? new PlayerName(raw.playerName) : null;
    account.skillLevel = raw.skillLevel ? new SkillLevel(raw.skillLevel) : null;
    account.vf = new Vf(raw.vf);
    account.playCount = new PlayCount(raw.playCount);
    account.rankIdx = raw.rankIdx;
    account.isHidden = new IsHidden(raw.isHidden);
    account.createdAt = new CreatedAt(raw.createdAt);
    account.updatedAt = new UpdatedAt(raw.updatedAt);
    account.deletedAt = new DeletedAt(raw.deletedAt);

    return account;
  }

  static toPersistence(account: Account) {
    return {
      idx: account.idx,
      id: account.id.getValue(),
      pw: account.pw.getValue(),
      sdvxId: account.sdvxId?.getValue(),
      playerName: account.playerName?.getValue(),
      skillLevel: account.skillLevel?.getValue(),
      vf: account.vf?.getValue(),
      playCount: account.playCount?.getValue(),
      rankIdx: account.rankIdx,
      isHidden: account.isHidden?.getValueAsNumber(),
      createdAt: account.createdAt.getValue(),
      updatedAt: account.updatedAt.getValue(),
      deletedAt: account.deletedAt.getValue(),
    };
  }
}
