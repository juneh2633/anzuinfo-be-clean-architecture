import { AccountId } from './value-objects/account-id.vo';
import { Password } from './value-objects/account-password.vo';
import { PlayerName } from './value-objects/player-name.vo';
import { SdvxId } from './value-objects/sdvx-id.vo';
import { SkillLevel } from './value-objects/skill-level.vo';

export class Account {
  id: AccountId;
  pw: Password;
  sdvxId: SdvxId | null;
  playerName: PlayerName | null;
  skillLevel: SkillLevel | null;
  vf: number | null;
  playCount: number | null;
  rankIdx: number | null;
  isHidden: number | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  // Relationships (can be kept as IDs or full entities depending on use case)
  // playdata: Playdata[];
  // tag: Tag[];
}