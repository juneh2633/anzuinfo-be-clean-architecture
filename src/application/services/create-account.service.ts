import { Inject, Injectable } from '@nestjs/common';
import { Account } from '../../domain/account/entity/account.entity';
import { IAccountRepository } from '../../domain/account/port/out/account.repository.port';
import { CreateAccountUseCase } from '../../domain/account/port/in/create-account.use-case';

@Injectable()
export class CreateAccountService implements CreateAccountUseCase {
  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(accountData: Omit<Account, 'idx' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Account> {
    // TODO: 비밀번호 해싱, sdvxId 중복 체크 등 비즈니스 로직 추가
    return this.accountRepository.create(accountData);
  }
}