import { task } from 'hardhat/config';

import { deployComptroller, deployPriceOracle, deployUnitroller } from './deployment';
import { CompoundV2, CToken } from './interfaces';

export const COMPOUND_CORE_DEPLOY = 'compound:periphery:deploy';
export const COMPOUND_CTOKEN_DEPLOY = 'compound:ctoken:deploy';

task(COMPOUND_CORE_DEPLOY, 'Deploy Compound V2 contracts').setAction(async function (
  args,
  hre
): Promise<CompoundV2> {
  const [deployer] = await hre.ethers.getSigners();

  const unitroller = await deployUnitroller(deployer);
  console.log(`unitroller: ${unitroller.address}`);

  const comptroller = await deployComptroller(deployer);
  console.log(`comptroller: ${comptroller.address}`);

  await unitroller._setPendingImplementation(comptroller.address);
  await comptroller._become(unitroller.address);

  const simpleOracle = await deployPriceOracle(deployer);
  console.log(`simpleOracle: ${simpleOracle.address}`);

  await comptroller._setPriceOracle(simpleOracle.address);

  return {
    simpleOracle: simpleOracle.address,
    comptroller: comptroller.address,
    unitroller: unitroller.address,
  };
});

task(COMPOUND_CTOKEN_DEPLOY, 'Deploy cTokens')
  .addParam('name', 'cToken name')
  .addParam('symbol', 'cToken symbol')
  .addOptionalParam('decimals', 'cToken decimals', '8')
  .addParam('underlying', 'Underlying token address')
  .addParam('comptroller', 'Comptroller address')
  .addParam('interestratemodel', 'InterestRateModel address')
  .setAction(async (args, hre): Promise<CToken> => {
    throw 1;
  });
