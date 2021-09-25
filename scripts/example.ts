import '@nomiclabs/hardhat-ethers/internal/type-extensions';
import { Erc20Token } from '@thenextblock/hardhat-erc20-plugin';
import hre from 'hardhat';

import {
  deployCErc20Delegate,
  deployCompoundV2,
  deployCToken,
  deployWhitePaperInterestRateModel,
} from '../src';

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const { comptroller, priceOracle } = await deployCompoundV2(deployer);

  // 1. deploy ERC-20 token (underlying)
  const aaa = await Erc20Token.deploy(new Erc20Token('A token', 'AAA', 8), deployer);

  // 2. deploy interest rate model
  const aaaIrm = await deployWhitePaperInterestRateModel(
    { baseRatePerYear: '20000000000000000', multiplierPerYear: '300000000000000000' },
    deployer
  );

  // 3. deploy delegated cToken
  const cAAADelegate = await deployCErc20Delegate(deployer);
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
      implementation: cAAADelegate.address,
    },
    deployer
  );
  console.log('cAAADelegate', cAAADelegate.address);
  console.log('cAAA', cAAA.address);

  // 4. add to the market and mark as listed
  await comptroller._supportMarket(cAAA.address);

  // 5. provide a price
  await priceOracle.setUnderlyingPrice(cAAA.address, '645000000000000000');
}

main().then();
