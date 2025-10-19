import { AccountReadRepositoryPort } from "src/domain/account/port/out/account.read-repository.port";
import { AccountWriteRepositoryPort } from "src/domain/account/port/out/account.write-repository.port";


export type TxIsolation = 'read committed' | 'repeatable read' | 'serializable';

export type AccountReposRead = {
    accountReadRepo: AccountReadRepositoryPort;
};
export type AccountReposWrite = AccountReposRead & {
    accountWriteRepo: AccountWriteRepositoryPort;
};

export interface AccountUnitOfWork {
    read<T>(
        work: (repos: AccountReposRead) => Promise<T>,
        opts?: { isolationLevel?: TxIsolation; timeoutMs?: number },
    ): Promise<T>;

    write<T>(
        work: (repos: AccountReposWrite) => Promise<T>,
        opts?: { isolationLevel?: TxIsolation; timeoutMs?: number },
    ): Promise<T>;
}