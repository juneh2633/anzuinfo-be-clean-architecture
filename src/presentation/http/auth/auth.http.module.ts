// src/infrastructure/auth/auth.infrastructure.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenProvider } from 'src/infrastructure/auth/jwt.token-provider';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    JwtTokenProvider,
    { provide: 'TOKEN_PROVIDER', useExisting: JwtTokenProvider },
  ],
  exports: ['TOKEN_PROVIDER', JwtModule],
})
export class AuthInfrastructureModule {}
