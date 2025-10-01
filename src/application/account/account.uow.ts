import { IAccountReadRepository } from "src/domain/account/port/out/account.read-repository.port";
import { IAccountWriteRepository } from "src/domain/account/port/out/account.write-repository.port";



export type TxIsolation = 'read committed' | 'repeatable read' | 'serializable';

export type AccountReposRead = {
    accountReadRepo: IAccountReadRepository;
};
export type AccountReposWrite = AccountReposRead & {
    accountWriteRepo: IAccountWriteRepository;
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