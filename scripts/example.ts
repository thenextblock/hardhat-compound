import '@nomiclabs/hardhat-ethers/internal/type-extensions';
import { deployErc20Token } from '@thenextblock/hardhat-erc20';
import hre from 'hardhat';

import { CTokenDeployArg, deployCompoundV2 } from '../src';

async function main() {
  const [deployer, userA] = await hre.ethers.getSigners();

  const uni = await deployErc20Token({ name: 'Uniswap', symbol: 'UNI', decimals: 8 }, deployer);
  const aave = await deployErc20Token({ name: 'Aave', symbol: 'AAVE', decimals: 8 }, deployer);

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
      underlyingPrice: 24,
      collateralFactor: '600000000000000000',
    },
  ];
  const { comptroller, priceOracle, interestRateModels, cTokens } = await deployCompoundV2(
    cTokenDeployArgs,
    deployer
  );
  const { cUni, cAave } = cTokens;

  console.log('Comptroller');
  console.log(comptroller.address);

  console.log('PriceOracle');
  console.log(priceOracle.address);

  console.log('Markets');
  for (const c of Object.keys(cTokens)) {
    console.log(c, await comptroller.markets(cTokens[c].address));
  }
  
  await uni.mint(deployer.address, '50000000000');
  await uni.approve(cUni.address, '1000000000000000000');
  await cUni.mint('3000000000');
}

main().then();
