// tslint:disable-next-line no-implicit-dependencies

import { useEnvironment } from './helpers';

describe('Integration tests examples', function () {
  describe('Deploy cEth', function () {
    useEnvironment('hardhat-project');
  });

  describe('HardhatConfig extension', function () {
    useEnvironment('hardhat-project');
  });
});

describe('Unit tests examples', function () {
  describe('ExampleHardhatRuntimeEnvironmentField', function () {
    describe('sayHello', function () {});
  });
});
