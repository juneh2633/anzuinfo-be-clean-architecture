import { Account as PrismaAccount, Prisma } from "@prisma/client";
import { AccountRecord } from "./account.record";

export class PrismaAccountMap {
    static toRecord(row: PrismaAccount): AccountRecord {
        return {
            idx: row.idx ?? null,                 // number | null
            id: row.id,
            pw: row.pw ?? null,
            sdvxId: row.sdvxId ?? null,
            playerName: row.playerName ?? null,
            skillLevel: row.skillLevel ?? null,
            vf: row.vf ?? null,
            playCount: row.playCount ?? null,
            rankIdx: row.rankIdx ?? null,
            isHidden: (row.isHidden ?? 0) as 0 | 1, // boolean이면 여기서 0/1 변환
            createdAt: row.createdAt,
            updatedAt: row.updatedAt ?? null,
            deletedAt: row.deletedAt ?? null,
        }
    };

    static fromRecord(rec: AccountRecord): Prisma.AccountCreateInput {
        return {
            id: rec.id,
            pw: rec.pw ?? undefined,
            sdvxId: rec.sdvxId ?? undefined,
            playerName: rec.playerName ?? undefined,
            skillLevel: rec.skillLevel ?? undefined,
            vf: rec.vf ?? undefined,
            playCount: rec.playCount ?? undefined,
            rankIdx: rec.rankIdx ?? undefined,
            isHidden: rec.isHidden ?? undefined,
            //createdAt: rec.createdAt,             // 필요하면 DB default 사용
            updatedAt: rec.updatedAt ?? undefined,
            deletedAt: rec.deletedAt ?? undefined,
        };
    }

    static toUpdateData(rec: Partial<AccountRecord>): Prisma.AccountUpdateInput {
        return {
            // id는 보통 변경 안 함
            pw: rec.pw ?? undefined,
            sdvxId: rec.sdvxId ?? undefined,
            playerName: rec.playerName ?? undefined,
            skillLevel: rec.skillLevel ?? undefined,
            vf: rec.vf ?? undefined,
            playCount: rec.playCount ?? undefined,
            rankIdx: rec.rankIdx ?? undefined,
            isHidden: rec.isHidden ?? undefined,
            updatedAt: rec.updatedAt ?? new Date(),
            deletedAt: rec.deletedAt ?? undefined,
        };
    }
}