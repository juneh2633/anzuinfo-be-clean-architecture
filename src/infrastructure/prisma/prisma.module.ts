    import { Module } from '@nestjs/common';

    import { PrismaService } from './prisma.service';
    import { AccountReadPrismaRepository, AccountWritePrismaRepository } from '../persistence/account/prisma/account.prisma.repository';


    @Module({
        imports: [PrismaModule],    
        providers: [
            { provide: IAccountReadRepository, useFactory: (ps: PrismaService) => new AccountReadPrismaRepository(ps), inject: [PrismaService] },
            { provide: IAccountWriteRepository, useFactory: (ps: PrismaService) => new AccountWritePrismaRepository(ps), inject: [PrismaService] },
        ],
        exports: [IAccountReadRepository, IAccountWriteRepository],
    })
    export class PrismaModule { }
