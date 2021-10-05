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
      underlyingPrice: 24,
      collateralFactor: '600000000000000000',
    },
  ];

  const { comptroller, priceOracle, interestRateModels, cTokens } = await deployCompoundV2(
    cTokenDeployArgs,
    deployer
  );

  console.log('\nComptroller');
  console.log(comptroller.address);
  console.log('\nPriceOracle');
  console.log(priceOracle.address);

  console.log('Markets (cTokens)');
  for (const c of Object.keys(cTokens)) {
    console.log(c, await comptroller.markets(cTokens[c].address));
  }

  console.log('mint 500 UNI');
  await uni.mint(deployer.address, '50000000000');
  console.log(
    'balance od UNI',
    (await uni.contract.functions.balanceOf(deployer.address)).toString()
  );
  const cUni = cTokens.cUNI;
  console.log('cUNI exchangeRate', (await cUni.exchangeRateStored()).toString());
  await uni.approve(cUni.address, '1000000000000000000');
  console.log(`supply 30 UNI`);
  await cUni.mint('3000000000');
  console.log('cUNI exchangeRate', (await cUni.exchangeRateStored()).toString());
  console.log('balance of cUNI', (await cUni.balanceOf(deployer.address)).toString());
}

main().then();
