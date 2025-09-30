// src/infrastructure/persistence/account/prisma/account.prisma.map.ts
import { Account as PrismaAccount } from '@prisma/client';
import { AccountRecord } from '../account.record';

export const PrismaAccountMap = {
  toRecord(raw: PrismaAccount): AccountRecord {
    return {
      idx: raw.idx ?? null,
      id: raw.id,
      pw: raw.pw,
      sdvxId: raw.sdvxId ?? null,
      playerName: raw.playerName ?? null,
      skillLevel: raw.skillLevel ?? null,
      vf: raw.vf ?? null,
      playCount: raw.playCount ?? null,
      rankIdx: raw.rankIdx ?? null,
      isHidden: raw.isHidden as 0 | 1,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? null,
      deletedAt: raw.deletedAt ?? null,
    };
  },

  fromRecord(rec: AccountRecord) {
    return {
      idx: rec.idx ?? undefined, // create 시 undefined로 제외
      id: rec.id,
      pw: rec.pw,
      sdvxId: rec.sdvxId,
      playerName: rec.playerName,
      skillLevel: rec.skillLevel,
      vf: rec.vf,
      playCount: rec.playCount,
      rankIdx: rec.rankIdx,
      isHidden: rec.isHidden,
      createdAt: rec.createdAt,
      updatedAt: rec.updatedAt,
      deletedAt: rec.deletedAt,
    };
  },
};
