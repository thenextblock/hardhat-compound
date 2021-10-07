import { task } from 'hardhat/config';

import { deployCompoundV2 } from './deployment';

export const COMPOUND_CORE_DEPLOY = 'compound:periphery:deploy';
export const COMPOUND_CTOKEN_DEPLOY = 'compound:ctoken:deploy';

task(COMPOUND_CORE_DEPLOY, 'Deploy Compound V2 contracts')
  .addOptionalParam('signer', 'deployer address')
  .setAction(async (args: { signer?: string }, hre) => {
    let deployer;
    if (typeof args.signer === 'string') {
      deployer = await hre.ethers.getSigner(args.signer);
    } else {
      [deployer] = await hre.ethers.getSigners();
    }
    return deployCompoundV2([], deployer);
  });

task(COMPOUND_CTOKEN_DEPLOY, 'Deploy cTokens')
  .addParam('name', 'cToken name')
  .addParam('symbol', 'cToken symbol')
  .addOptionalParam('decimals', 'cToken decimals', '8')
  .addParam('underlying', 'Underlying token address')
  .addParam('comptroller', 'Comptroller address')
  .addParam('interestratemodel', 'InterestRateModel address')
  .setAction(async (args, hre) => {
    throw 1;
  });
