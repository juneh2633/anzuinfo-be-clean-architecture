import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AccountPrismaRepository } from './repositories/account.prisma.repository';
import { IAccountRepository } from 'src/domain/account/port/out/account.repository.port';

@Module({
  providers: [
    PrismaService,
    {
      provide: IAccountRepository,
      useClass: AccountPrismaRepository,
    },
  ],
  exports: [PrismaService, IAccountRepository],
})
export class PrismaModule {}
