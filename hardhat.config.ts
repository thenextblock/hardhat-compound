import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';

module.exports = {
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
  solidity: {
    compilers: [
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};
