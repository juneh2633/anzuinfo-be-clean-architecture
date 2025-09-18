import { Module } from '@nestjs/common';
import { PrismaModule } from '../infrastructure/persistence/prisma/prisma.module';

// Ports (Tokens)
import { CreateAccountUseCase } from '../domain/account/port/in/create-account.use-case';
import { GetAccountUseCase } from '../domain/account/port/in/get-account.use-case';
import { IAccountRepository } from '../domain/account/port/out/account.repository.port';

// Implementations
import { CreateAccountService } from './services/create-account.service';
import { GetAccountService } from './services/get-account.service';
import { AccountPrismaRepository } from '../infrastructure/persistence/prisma/repositories/account.prisma.repository';

const USE_CASE_PROVIDERS = [
  {
    provide: GetAccountUseCase,
    useClass: GetAccountService,
  },
  {
    provide: CreateAccountUseCase,
    useClass: CreateAccountService,
  },
];

const REPOSITORY_PROVIDERS = [
  {
    provide: IAccountRepository,
    useClass: AccountPrismaRepository,
  },
];

@Module({
  imports: [PrismaModule],
  providers: [...USE_CASE_PROVIDERS, ...REPOSITORY_PROVIDERS],
  exports: [...USE_CASE_PROVIDERS],
})
export class ApplicationModule {}