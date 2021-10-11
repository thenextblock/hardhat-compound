import { BigNumberish } from 'ethers';

import {
  BaseJumpRateModelV2,
  CErc20,
  CErc20Delegator,
  CErc20Immutable,
  CEther,
  Comptroller,
  SimplePriceOracle,
  WhitePaperInterestRateModel,
} from '../typechain';

import { CTokenType, InterestRateModelType } from './enums';

export interface CompoundV2 {
  readonly comptroller: Comptroller;
  readonly priceOracle: SimplePriceOracle;
  readonly interestRateModels: InterestRateModels;
  readonly cTokens: CTokens;
}

export interface InterestRateModels {
  [key: string]: WhitePaperInterestRateModel | BaseJumpRateModelV2;
}

export class CTokens {
  [key: string]: CTokenLike;

  get cETH(): CEther {
    return this.cEth as CEther;
  }
  set cETH(value: CTokenLike) {
    this.cEth = value;
  }
}

export type CTokenLike = CErc20 | CErc20Immutable | CErc20Delegator | CEther;

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
  implementation?: string;
}

export interface CErc20DelegatorArgs extends CErc20Args {
  implementation: string;
}

export type CTokenArgs = CErc20Args | CErc20DelegatorArgs;

export type WhitePaperInterestRateModelArgs = {
  baseRatePerYear: string;
  multiplierPerYear: string;
};

export type BaseJumpRateModelV2Args = {
  baseRatePerYear: string;
  multiplierPerYear: string;
  jumpMultiplierPerYear: string;
  kink: string;
  owner: string;
};

export type LegacyJumpRateModelV2Args = BaseJumpRateModelV2Args;

export type JumpRateModelV2Args = BaseJumpRateModelV2Args;

export interface InterestRateModelConfigs {
  readonly [key: string]: InterestRateModelConfig;
}

export interface InterestRateModelConfig {
  name: string;
  type: InterestRateModelType;
  args: WhitePaperInterestRateModelArgs | LegacyJumpRateModelV2Args | JumpRateModelV2Args;
}

export interface CTokenConfigs {
  readonly [key: string]: CTokenConfig;
}

export interface CTokenConfig {
  symbol: string;
  type: CTokenType;
  args: CEthArgs | CErc20Args | CErc20DelegatorArgs;
  interestRateModel: InterestRateModelConfig;
}

export interface CTokenDeployArg {
  cToken: string;
  underlying?: string;
  underlyingPrice?: BigNumberish;
  collateralFactor?: BigNumberish;
}
