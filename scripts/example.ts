import '@nomiclabs/hardhat-ethers/internal/type-extensions';
import { Erc20Token } from '@thenextblock/hardhat-erc20-plugin';
import hre from 'hardhat';

import {
  deployCEth,
  deployComptroller,
  deployCToken,
  deployPriceOracle,
  deployWhitePaperInterestRateModel,
} from '../src';

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const comptroller = await deployComptroller(deployer);
  const priceOracle = await deployPriceOracle(deployer);
  await comptroller._setPriceOracle(priceOracle.address);

  const bat = await Erc20Token.deploy(new Erc20Token('Basic Attention Token', 'BAT', 8), deployer);
  const cBatIrm = await deployWhitePaperInterestRateModel(
    {
      baseRatePerYear: '20000000000000000',
      multiplierPerYear: '300000000000000000',
    },
    deployer
  );
  const cBat = await deployCToken(
    {
      underlying: bat.address,
      comptroller: comptroller.address,
      interestRateModel: cBatIrm.address,
      initialExchangeRateMantissa: '200000000000000000000000000',
      name: 'Compound Basic Attention Token',
      symbol: 'cBat',
      decimals: 8,
      admin: deployer.address,
    },
    deployer
  );
  console.log('cBat', cBat.address);

  await comptroller._supportMarket(cBat.address);
  await priceOracle.setUnderlyingPrice(cBat.address, '645000000000000000');

  const batPrice = hre.ethers.utils.formatEther(await priceOracle.getUnderlyingPrice(cBat.address));
  console.log('cBat price:', batPrice);

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
