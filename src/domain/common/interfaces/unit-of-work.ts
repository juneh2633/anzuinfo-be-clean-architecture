import { AccountReadRepositoryPort } from "src/domain/account/port/out/account.read-repository.port";
import { AccountWriteRepositoryPort } from "src/domain/account/port/out/account.write-repository.port";

export interface UnitOfWork {
  withTransaction<T>(
    work: (repos: UowRepositories) => Promise<T>,
    options?: TxOptions,
  ): Promise<T>;
}

export interface UowRepositories {
  accountReadRepo: AccountReadRepositoryPort;
  accountWriteRepo?: AccountWriteRepositoryPort;
  // chartRepo?: IChartRepository;
}

export interface TxOptions {
  readOnly?: boolean; // 기본 false
  isolationLevel?: 'read committed' | 'repeatable read' | 'serializable';
  timeoutMs?: number;
}
