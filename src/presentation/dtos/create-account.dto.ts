import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ description: '로그인 아이디', example: 'testuser' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  pw: string;

  @ApiProperty({ description: '플레이어 이름', example: 'TEST' })
  @IsString()
  @IsNotEmpty()
  playerName: string;
}
