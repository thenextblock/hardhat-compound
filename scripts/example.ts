import '@nomiclabs/hardhat-ethers/internal/type-extensions';
import { Erc20Token } from '@thenextblock/hardhat-erc20-plugin';
import hre from 'hardhat';

import { CTokenDeployArg, deployCompoundV2 } from '../src';

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const uni = await Erc20Token.deploy(new Erc20Token('Uniswap', 'UNI', 8), deployer);
  const aave = await Erc20Token.deploy(new Erc20Token('Aave', 'AAVE', 8), deployer);

  const cTokenDeployArgs: CTokenDeployArg[] = [
    {
      cToken: 'cAAVE',
      underlying: aave.address,
      underlyingPrice: 500,
      collateralFactor: '800000000000000000',
    },
    {
      cToken: 'cUNI',
      underlying: uni.address,
    },
  ];

  const { comptroller, priceOracle, interestRateModels, cTokens } = await deployCompoundV2(
    cTokenDeployArgs,
    deployer
  );

  console.log('CTokens');
  console.log(cTokens.map((ct) => ct.address));
  console.log('\nComptroller');
  console.log(comptroller.address);
  console.log('\nPriceOracle');
  console.log(priceOracle.address);
  console.log('\nInterestRateModels');
  console.log(interestRateModels);

  for (const cToken of cTokens) {
    console.log('cAAVE market', await comptroller.markets(cToken.address));
  }
}

main().then();
