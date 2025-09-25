import { IsString, IsNotEmpty, Matches } from 'class-validator';
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

  @IsString()
  @Matches(/^SV-\d{4}-\d{4}$/, {
    message: 'sdvxId must follow the format "SV-XXXX-XXXX" where X is a digit',
  })
  @ApiProperty({
    description: '사볼 sv번호',
    default: 'SV-5264-9170',
  })
  sdvxId: string;
}
