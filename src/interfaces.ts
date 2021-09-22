export interface CompoundV2 {
  priceOracle?: string;
  comptroller?: string;
}

export interface CToken {
  symbol: string;
  decimals: number;
  address: string;
  underlying: string;
  interestRateModel: string;
}

export interface CEthArgs {
  comptroller: string;
  interestRateModel: string;
  initialExchangeRateMantissa: string;
  name: string;
  symbol: string;
  decimals: number;
  admin: string;
}

export interface CErc20Args {
  underlying: string;
  comptroller: string;
  interestRateModel: string;
  initialExchangeRateMantissa: string;
  name: string;
  symbol: string;
  decimals: number;
  admin: string;
}

export interface CErc20DelegatorArgs extends CErc20Args {
  implementation: string;
}

export type WhitePaperInterestRateModelArgs = {
  baseRatePerYear: string;
  multiplierPerYear: string;
};

export type BaseJumpRateModelV2Args = {
  baseRatePerYear: string;
  multiplierPerYear: string;
  jumpMultiplierPerYear: number;
  kink: number;
  owner: string;
};

export type LegacyJumpRateModelV2Args = BaseJumpRateModelV2Args;

export type JumpRateModelV2Args = BaseJumpRateModelV2Args;
