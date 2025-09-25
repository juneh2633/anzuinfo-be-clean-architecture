import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Account } from '../../domain/account/entity/account.entity';
import { IAccountRepository } from '../../domain/account/port/out/account.repository.port';
import { GetAccountUseCase } from '../../domain/account/port/in/get-account.use-case';

@Injectable()
export class GetAccountService implements GetAccountUseCase {
  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(idx: number): Promise<Account> {
    const account = await this.accountRepository.findById(idx);
    if (!account) {
      throw new NotFoundException(`Account with ID "${idx}" not found.`);
    }
    return account;
  }
}
