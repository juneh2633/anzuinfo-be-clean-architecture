export type AccountRecord = {
  idx: number | null;
  id: string;
  pw: string;
  sdvxId: string | null;
  playerName: string | null;
  skillLevel: string | null;
  vf: number | null;
  playCount: number | null;
  rankIdx: number | null;
  isHidden: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};
