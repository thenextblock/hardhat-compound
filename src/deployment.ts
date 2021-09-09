import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BaseContract, Signer } from 'ethers';

import {
  CErc20Delegator__factory,
  CErc20Immutable,
  CErc20Immutable__factory,
  CEther__factory,
  Comptroller,
  Comptroller__factory,
  CTokenInterface,
  JumpRateModelV2__factory,
  LegacyJumpRateModelV2__factory,
  SimplePriceOracle,
  SimplePriceOracle__factory,
  Unitroller,
  Unitroller__factory,
  WhitePaperInterestRateModel__factory,
} from '../typechain';

import { CTOKEN_TYPE, IRM } from './enums';
import { CErc20Args, CErc20DelegatorArgs, CEthArgs, InterestRateModelArgs } from './interfaces';

export async function deployCToken(
  type: CTOKEN_TYPE,
  args: CErc20Args | CErc20DelegatorArgs,
  deployer: SignerWithAddress
): Promise<CTokenInterface> {
  if (type === CTOKEN_TYPE.CErc20Delegator) {
    return deployCErc20Delegator(args as CErc20DelegatorArgs, deployer);
  }
  return deployCErc20Immutable(args, deployer);
}

export async function deployUnitroller(deployer: Signer): Promise<Unitroller> {
  return new Unitroller__factory(deployer).deploy();
}

export async function deployComptroller(deployer: Signer): Promise<Comptroller> {
  return new Comptroller__factory(deployer).deploy();
}

export async function deployInterestRateModel(
  irm: IRM,
  args: InterestRateModelArgs,
  deployer: SignerWithAddress
): Promise<BaseContract> {
  switch (irm) {
    case IRM.WhitePaperInterestRateModel:
      return new WhitePaperInterestRateModel__factory(deployer).deploy(
        args.baseRatePerYear,
        args.multiplierPerYear
      );
    case IRM.JumpRateModelV2:
      return new JumpRateModelV2__factory(deployer).deploy(
        args.baseRatePerYear,
        args.multiplierPerYear,
        args.jumpMultiplierPerYear!,
        args.kink!,
        args.owner!
      );
    case IRM.LegacyJumpRateModelV2:
      return new LegacyJumpRateModelV2__factory(deployer).deploy(
        args.baseRatePerYear,
        args.multiplierPerYear,
        args.jumpMultiplierPerYear!,
        args.kink!,
        args.owner!
      );
  }
}

export async function deployCEth(
  args: CEthArgs,
  deployer: SignerWithAddress
): Promise<CTokenInterface> {
  return new CEther__factory(deployer).deploy(
    args.comptroller,
    args.interestRateModel,
    args.initialExchangeRateMantissa,
    args.name,
    args.symbol,
    args.decimals,
    deployer.address
  );
}

export async function deployPriceOracle(deployer: SignerWithAddress): Promise<SimplePriceOracle> {
  return new SimplePriceOracle__factory(deployer).deploy();
}

async function deployCErc20Immutable(
  args: CErc20Args,
  deployer: SignerWithAddress
): Promise<CErc20Immutable> {
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
  deployer: SignerWithAddress
): Promise<CTokenInterface> {
  return new CErc20Delegator__factory(deployer).deploy(
    args.underlying,
    args.comptroller,
    args.interestRateModel,
    args.initialExchangeRateMantissa,
    args.name,
    args.symbol,
    args.decimals,
    deployer.address,
    args.implementation,
    '0x00'
  );
}
