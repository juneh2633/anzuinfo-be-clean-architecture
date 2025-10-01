import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AccountUnitOfWork } from "../account.uow";

@Injectable()
export class GetAccountUseCase {
    constructor(@Inject(ACCOUNT_UOW) private readonly uow: AccountUnitOfWork) { }

    async execute(idx: number) {
        return this.uow.withTransaction(async ({ accountReadRepo }) => {
            const acc = await accountReadRepo.findByIdx(idx);
            if (!acc) throw new NotFoundException('account.not_found');
            return acc;
        }, { readOnly: true, isolationLevel: 'read committed' });
    }
}