import '@nomiclabs/hardhat-ethers/internal/type-extensions';
import { Erc20Token } from '@thenextblock/hardhat-erc20-plugin';
import hre from 'hardhat';

import {
  deployCEth,
  deployCompoundV2,
  deployCToken,
  deployWhitePaperInterestRateModel,
} from '../src';

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const { comptroller, priceOracle } = await deployCompoundV2(deployer);

  const aaa = await Erc20Token.deploy(new Erc20Token('A token', 'AAA', 8), deployer);
  const aaaIrm = await deployWhitePaperInterestRateModel(
    {
      baseRatePerYear: '20000000000000000',
      multiplierPerYear: '300000000000000000',
    },
    deployer
  );
  const cAAA = await deployCToken(
    {
      underlying: aaa.address,
      comptroller: comptroller.address,
      interestRateModel: aaaIrm.address,
      initialExchangeRateMantissa: '200000000000000000000000000',
      name: 'Compound A Token',
      symbol: 'cAAA',
      decimals: 8,
      admin: deployer.address,
    },
    deployer
  );
  console.log('cAAA', cAAA.address);

  await comptroller._supportMarket(cAAA.address);
  await priceOracle.setUnderlyingPrice(cAAA.address, '645000000000000000');

  const aaaPrice = hre.ethers.utils.formatEther(await priceOracle.getUnderlyingPrice(cAAA.address));
  console.log('cAAA price:', aaaPrice);

  const cEthIrm = await deployWhitePaperInterestRateModel(
    {
      baseRatePerYear: '20000000000000000',
      multiplierPerYear: '100000000000000000',
    },
    deployer
  );

  const cEth = await deployCEth(
    {
      name: 'Compound Ether',
      symbol: 'cEth',
      decimals: 8,
      comptroller: comptroller.address,
      interestRateModel: cEthIrm.address,
      initialExchangeRateMantissa: '200000000000000000000000000',
      admin: deployer.address,
    },
    deployer
  );
  console.log('cEth', cEth.address);

  await comptroller._supportMarket(cEth.address);
}

main().then();
