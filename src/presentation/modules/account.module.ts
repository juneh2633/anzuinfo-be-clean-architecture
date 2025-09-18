import { Module } from '@nestjs/common';
import { AccountController } from '../controllers/account.controller';
import { ApplicationModule } from '../../application/application.module';
import { PrismaModule } from '../../infrastructure/persistence/prisma/prisma.module';

@Module({
  imports: [ApplicationModule, PrismaModule],
  controllers: [AccountController],
})
export class AccountModule {}
