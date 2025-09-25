import { IAccountRepository } from "src/domain/account/port/out/account.repository.port";

export interface UnitOfWork {
  withTransaction<T>(
    work: (repos: UowRepositories) => Promise<T>,
    options?: TxOptions
  ): Promise<T>;
}

export interface UowRepositories {
  accountRepo: IAccountRepository;
  // chartRepo?: IChartRepository;
}

export interface TxOptions {
  readOnly?: boolean; // 기본 false
  isolationLevel?: 'read committed' | 'repeatable read' | 'serializable';
  timeoutMs?: number;
}
