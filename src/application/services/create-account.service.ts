import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountUseCase } from 'src/domain/account/port/in/create-account.use-case';
import { CreateAccountDto } from 'src/presentation/dtos/create-account.dto';
import type { UnitOfWork } from 'src/domain/common/interfaces/unit-of-work';
import { Account } from 'src/domain/account/entity/account.entity';
import { AccountId } from 'src/domain/account/entity/value-objects/account-id.vo';
import { PlayerName } from 'src/domain/account/entity/value-objects/player-name.vo';
// ... 다른 Value Object import

@Injectable()
export class CreateAccountService implements CreateAccountUseCase {
  // NestJS의 DI를 통해 UnitOfWork 인터페이스의 구현체(PrismaUnitOfWork)를 주입받습니다.
  constructor(@Inject('UnitOfWork') private readonly uow: UnitOfWork) {}

  async execute(dto: CreateAccountDto): Promise<Account> {
    // withTransaction을 호출하여 트랜잭션을 실행합니다.
    return this.uow.withTransaction(async (repos) => {
      // 인자로 받은 repos 객체에는 트랜잭션이 적용된 리포지토리들이 들어있습니다.
      const { accountRepo } = repos;

      // --- 비즈니스 로직 시작 ---
      const existingAccount = await accountRepo.findById(dto.id);
      if (existingAccount) {
        throw new Error('Id already exists'); // 여기서 에러가 나면 자동 롤백!
      }

      const newAccount = new Account(
        new AccountId(dto.id),
        // new Password(dto.pw), --- IGNORE ---
        dto.pw,
        // new SdvxId(dto.sdvxId), --- IGNORE ---
        dto.sdvxId,
        dto.playerName ? new PlayerName(dto.playerName) : null,
        dto.skillLevel ? new SkillLevel(dto.skillLevel) : null,
        dto.vf ? new Vf(dto.vf) : null,
        dto.playCount ? new PlayCount(dto.playCount) : null,
        null, // rankIdx 초기값
        new IsHidden(false), // isHidden 기본값 false
        null, // createdAt 초기값
        null, // updatedAt 초기값
        null, // deletedAt 초기값
        null,
      );

      const savedAccount = await accountRepo.create(newAccount);

      // --- 다른 리포지토리 작업이 필요하다면? ---
      // const { chartRepo } = repos;
      // await chartRepo.doSomething(...);
      // --------------------------------------

      return savedAccount; // 성공적으로 반환되면 자동 커밋!
      // --- 비즈니스 로직 끝 ---
    });
  }
}
