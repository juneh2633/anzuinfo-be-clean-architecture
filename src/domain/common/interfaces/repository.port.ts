export interface RepositoryPort<T, Idx = number> {
  findByIdx(idx: Idx): Promise<T | null>;
  save(entity: T): Promise<void>;
  deleteByIdx(idx: Idx): Promise<void>;
}