import { Controller, Post, Body, Get, Param, ParseIntPipe, Inject } from '@nestjs/common';
import { CreateAccountDto } from '../dtos';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Account } from '../../domain/account/entity/account.entity';

// Import interfaces (ports) and tokens
import { CreateAccountUseCase } from '../../domain/account/port/in/create-account.use-case';
import { GetAccountUseCase } from '../../domain/account/port/in/get-account.use-case';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(
    @Inject(CreateAccountUseCase)
    private readonly createAccountUseCase: CreateAccountUseCase,
    @Inject(GetAccountUseCase)
    private readonly getAccountUseCase: GetAccountUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: '계정 생성' })
  @ApiResponse({ status: 201, description: '계정이 성공적으로 생성되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    // 실제로는 pw를 제외한 DTO를 반환해야 합니다.
    return this.createAccountUseCase.execute(createAccountDto);
  }

  @Get(':idx')
  @ApiOperation({ summary: 'ID로 계정 조회' })
  @ApiResponse({ status: 200, description: '계정 정보를 반환합니다.', type: Account })
  @ApiResponse({ status: 404, description: '계정을 찾을 수 없습니다.' })
  async findOne(@Param('idx', ParseIntPipe) idx: number): Promise<Account> {
    // 실제로는 pw를 제외한 DTO를 반환해야 합니다.
    return this.getAccountUseCase.execute(idx);
  }
}