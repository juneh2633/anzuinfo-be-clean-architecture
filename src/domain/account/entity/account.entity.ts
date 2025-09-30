import { CreatedAt } from '../../common/value-objects/createdAt.vo';
import { DeletedAt } from '../../common/value-objects/deletedAt.vo';
import { IsHidden } from './value-objects/isHidden.vo';
import { UpdatedAt } from '../../common/value-objects/updatedAt.vo';
import { AccountId } from './value-objects/account-id.vo';
import { Password } from './value-objects/account-password.vo';
import { PlayCount } from './value-objects/play-count.vo';
import { PlayerName } from './value-objects/player-name.vo';
import { SdvxId } from './value-objects/sdvx-id.vo';
import { SkillLevel } from './value-objects/skill-level.vo';
import { Vf } from './value-objects/vf.vo';
import { RankIdx } from './value-objects/rank-idx.vo';

export class Account {
  private readonly _idx: number | null;

  constructor(
    public readonly id: AccountId,
    public readonly pw: Password,
    public readonly sdvxId: SdvxId | null,
    public readonly playerName: PlayerName | null,
    public readonly skillLevel: SkillLevel | null,
    public readonly vf: Vf | null,
    public readonly playCount: PlayCount | null,
    public readonly rankIdx: RankIdx | null,
    public readonly isHidden: IsHidden,
    public readonly createdAt: CreatedAt,
    public readonly updatedAt: UpdatedAt | null,
    public readonly deletedAt: DeletedAt | null,
    idx?: number | null, // Optional parameter for idx
  ) {
    this._idx = idx ?? null; // Assign idx or default to null
  }

  getIdx(): number | null {
    return this._idx;
  }
}
