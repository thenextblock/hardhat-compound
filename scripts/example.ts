import '@nomiclabs/hardhat-ethers/internal/type-extensions';
import { Erc20Token } from '@thenextblock/hardhat-erc20-plugin';
import hre from 'hardhat';

import {
  CTOKEN_TYPE,
  deployCEth,
  deployComptroller,
  deployCToken,
  deployInterestRateModel,
  deployUnitroller,
  IRM,
} from '../src';

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const unitroller = await deployUnitroller(deployer);
  const comptroller = await deployComptroller(deployer);
  await unitroller._setPendingImplementation(comptroller.address);
  await comptroller._become(unitroller.address);

  const bat = await Erc20Token.deploy(new Erc20Token('Basic Attention Token', 'BAT', 8), deployer);
  const cBatIrm = await deployInterestRateModel(
    IRM.WhitePaperInterestRateModel,
    {
      baseRatePerYear: '20000000000000000',
      multiplierPerYear: '300000000000000000',
    },
    deployer
  );
  const cBat = await deployCToken(
    CTOKEN_TYPE.CErc20Immutable,
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

  const cEthIrm = await deployInterestRateModel(
    IRM.WhitePaperInterestRateModel,
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
}

main().then();
