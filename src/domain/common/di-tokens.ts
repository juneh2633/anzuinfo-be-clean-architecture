export const DI_TOKENS = {
  TokenEncoderPort: Symbol('Auth.TokenEncoderPort'),
  AccountReadRepository: Symbol('AccountReadRepository'),
  AccountWriteRepository: Symbol('AccountWriteRepository'),
} as const;

export type DiToken = (typeof DI_TOKENS)[keyof typeof DI_TOKENS];