import { Account } from "src/domain/account/entity/account.entity";
import { AccountRecord } from "./account.record";
import { AccountId } from "src/domain/account/entity/value-objects/account-id.vo";
import { Password } from "src/domain/account/entity/value-objects/account-password.vo";
import { SdvxId } from "src/domain/account/entity/value-objects/sdvx-id.vo";
import { PlayerName } from "src/domain/account/entity/value-objects/player-name.vo";
import { SkillLevel } from "src/domain/account/entity/value-objects/skill-level.vo";
import { Vf } from "src/domain/account/entity/value-objects/vf.vo";
import { PlayCount } from "src/domain/account/entity/value-objects/play-count.vo";
import { RankIdx } from "src/domain/account/entity/value-objects/rank-idx.vo";
import { IsHidden } from "src/domain/account/entity/value-objects/isHidden.vo";
import { CreatedAt } from "src/domain/common/value-objects/createdAt.vo";
import { UpdatedAt } from "src/domain/common/value-objects/updatedAt.vo";
import { DeletedAt } from "src/domain/common/value-objects/deletedAt.vo";

const isNil = (v: unknown): v is null | undefined => v == null;

export class AccountMapper {
  static toDomain(raw: AccountRecord): Account {
    return new Account(
      new AccountId(raw.id),
      new Password(raw.pw),
      isNil(raw.sdvxId) ? null : new SdvxId(raw.sdvxId),
      isNil(raw.playerName) ? null : new PlayerName(raw.playerName),
      isNil(raw.skillLevel) ? null : new SkillLevel(raw.skillLevel),
      isNil(raw.vf) ? null : new Vf(raw.vf),
      isNil(raw.playCount) ? null : new PlayCount(raw.playCount),
      isNil(raw.rankIdx) ? null : new RankIdx(raw.rankIdx),
      new IsHidden(raw.isHidden),
      new CreatedAt(raw.createdAt),
      isNil(raw.updatedAt) ? null : new UpdatedAt(raw.updatedAt),
      isNil(raw.deletedAt) ? null : new DeletedAt(raw.deletedAt),
      raw.idx,
    );
  }

  static toPersistence(account: Account): AccountRecord {
    return {
      idx: account.getIdx(),
      id: account.id.value,
      pw: account.pw.value,
      sdvxId: account.sdvxId?.value ?? null,
      playerName: account.playerName?.value ?? null,
      skillLevel: account.skillLevel?.value ?? null,
      vf: account.vf?.value ?? null,
      playCount: account.playCount?.value ?? null,
      rankIdx: account.rankIdx?.value ?? null,
      isHidden: account.isHidden?.getValueAsNumber(),
      createdAt: account.createdAt.value ?? null,
      updatedAt: account.updatedAt?.value ?? null,
      deletedAt: account.deletedAt?.value ?? null,
    };
  }
}
