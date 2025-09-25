import { CreateAccountDto } from '../../../../presentation/dtos';
import { Account } from '../../entity/account.entity';

export const CreateAccountUseCase = Symbol('CreateAccountUseCase');

export interface CreateAccountUseCase {
  execute(dto: CreateAccountDto): Promise<Account>;
}
