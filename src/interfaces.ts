export interface CompoundV2 {
  simpleOracle?: string;
  comptroller?: string;
  unitroller?: string;
}

export interface CToken {
  symbol: string;
  decimals: number;
  address: string;
  underlying: string;
  irm: string;
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

export interface InterestRateModelArgs {
  baseRatePerYear: string;
  multiplierPerYear: string;
  jumpMultiplierPerYear?: number;
  kink?: number;
  owner?: string;
}
