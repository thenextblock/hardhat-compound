import { Signer } from 'ethers';

import {
  CErc20Delegator__factory,
  CErc20Immutable,
  CErc20Immutable__factory,
  CEther__factory,
  Comptroller,
  Comptroller__factory,
  CTokenInterface,
  JumpRateModelV2,
  JumpRateModelV2__factory,
  LegacyJumpRateModelV2,
  LegacyJumpRateModelV2__factory,
  SimplePriceOracle,
  SimplePriceOracle__factory,
  Unitroller,
  Unitroller__factory,
  WhitePaperInterestRateModel,
  WhitePaperInterestRateModel__factory,
} from '../typechain';

import {
  CErc20Args,
  CErc20DelegatorArgs,
  CEthArgs,
  CompoundV2,
  JumpRateModelV2Args,
  LegacyJumpRateModelV2Args,
  WhitePaperInterestRateModelArgs,
} from './interfaces';

export async function deployCompoundV2(deployer: Signer): Promise<CompoundV2> {
  const comptroller = await deployComptroller(deployer);
  const simpleOracle = await deployPriceOracle(deployer);
  await comptroller._setPriceOracle(simpleOracle.address);

  return {
    comptroller: comptroller.address,
    priceOracle: simpleOracle.address,
  };
}

export async function deployCToken(
  args: CErc20Args | CErc20DelegatorArgs,
  deployer: Signer
): Promise<CTokenInterface> {
  if ('implementation' in args) {
    return deployCErc20Delegator(args, deployer);
  }
  return deployCErc20Immutable(args, deployer);
}

export async function deployUnitroller(deployer: Signer): Promise<Unitroller> {
  return new Unitroller__factory(deployer).deploy();
}

export async function deployComptroller(deployer: Signer): Promise<Comptroller> {
  return new Comptroller__factory(deployer).deploy();
}

export async function deployWhitePaperInterestRateModel(
  args: WhitePaperInterestRateModelArgs,
  deployer: Signer
): Promise<WhitePaperInterestRateModel> {
  return new WhitePaperInterestRateModel__factory(deployer).deploy(
    args.baseRatePerYear,
    args.multiplierPerYear
  );
}

export async function deployJumpRateModelV2(
  args: JumpRateModelV2Args,
  deployer: Signer
): Promise<JumpRateModelV2> {
  return new JumpRateModelV2__factory(deployer).deploy(
    args.baseRatePerYear,
    args.multiplierPerYear,
    args.jumpMultiplierPerYear,
    args.kink,
    args.owner
  );
}

export async function deployLegacyJumpRateModelV2(
  args: LegacyJumpRateModelV2Args,
  deployer: Signer
): Promise<LegacyJumpRateModelV2> {
  return new LegacyJumpRateModelV2__factory(deployer).deploy(
    args.baseRatePerYear,
    args.multiplierPerYear,
    args.jumpMultiplierPerYear!,
    args.kink,
    args.owner
  );
}

export async function deployPriceOracle(deployer: Signer): Promise<SimplePriceOracle> {
  return new SimplePriceOracle__factory(deployer).deploy();
}

export async function deployCEth(args: CEthArgs, deployer: Signer): Promise<CTokenInterface> {
  return new CEther__factory(deployer).deploy(
    args.comptroller,
    args.interestRateModel,
    args.initialExchangeRateMantissa,
    args.name,
    args.symbol,
    args.decimals,
    args.admin
  );
}

async function deployCErc20Immutable(args: CErc20Args, deployer: Signer): Promise<CErc20Immutable> {
  return new CErc20Immutable__factory(deployer).deploy(
    args.underlying,
    args.comptroller,
    args.interestRateModel,
    args.initialExchangeRateMantissa,
    args.name,
    args.symbol,
    args.decimals,
    args.admin
  );
}

async function deployCErc20Delegator(
  args: CErc20DelegatorArgs,
  deployer: Signer
): Promise<CTokenInterface> {
  return new CErc20Delegator__factory(deployer).deploy(
    args.underlying,
    args.comptroller,
    args.interestRateModel,
    args.initialExchangeRateMantissa,
    args.name,
    args.symbol,
    args.decimals,
    args.admin,
    args.implementation,
    '0x00'
  );
}
