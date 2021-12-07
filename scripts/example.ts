import { deployErc20Token } from '@thenextblock/hardhat-erc20';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { ethers } from 'hardhat';

import { CTokenDeployArg, deployCompoundV2 } from '../src';

async function main() {
  const [deployer, userA] = await ethers.getSigners();

  const uni = await deployErc20Token(
    {
      name: 'Uniswap',
      symbol: 'UNI',
      decimals: 18,
    },
    deployer
  );

  const cTokenDeployArgs: CTokenDeployArg[] = [
    {
      cToken: 'cUNI',
      underlying: uni.address,
      underlyingPrice: '25022748000000000000',
      collateralFactor: '800000000000000000',
    },
    {
      cToken: 'cETH',
      underlyingPrice: '35721743800000000000000',
      collateralFactor: '600000000000000000',
    },
  ];
  const { cTokens } = await deployCompoundV2(cTokenDeployArgs, deployer, { gasLimit: 8_000_000 });
  const { cETH: cEth, cUNI: cUni } = cTokens;

  // const uniAmount = parseUnits('100', 18).toString();
  // await uni.mint(userA.address, uniAmount);
  // await uni.connect(userA).approve(cUni.address, uniAmount);
  // await cUni.connect(userA).mint(parseUnits('25', 18).toString());
  // await cEth.connect(userA).mint({
  //   value: parseUnits('2', 18).toString(),
  // });
}

main().catch(console.error);
