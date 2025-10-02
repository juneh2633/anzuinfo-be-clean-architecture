// src/presentation/http/common/decorators/auth-check.decorator.ts
import { BadRequestException, ForbiddenException, UnauthorizedException, UseGuards, applyDecorators } from '@nestjs/common';
import { Rank } from './rank.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RankGuard } from '../guard/rank.gauard';

export const AuthCheck = (rank: number) => {
  const decos = [Rank(rank), UseGuards(RankGuard)];
  if (rank !== 0) decos.push(ApiBearerAuth());
  return applyDecorators(...decos);
};
