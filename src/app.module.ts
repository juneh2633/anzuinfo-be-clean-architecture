import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/persistence/prisma/prisma.module';
import { AccountModule } from './presentation/modules/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    PrismaModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
