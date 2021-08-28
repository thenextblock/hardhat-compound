import { Erc20Token, ERC20_DEPLOY } from '@thenextblock/hardhat-erc20-plugin';
import hre from 'hardhat';

async function main() {
  console.log('START SCRIPT');
  const args = { name: 'USDC', symbol: 'USDC', decimals: '6' };
  const usdc: Erc20Token = await hre.run(ERC20_DEPLOY, args);
  console.log(usdc.address);
}

main().then();
