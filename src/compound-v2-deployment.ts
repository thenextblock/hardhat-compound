import { Signer } from 'ethers';

import {
  ComptrollerG6,
  SimplePriceOracle,
  Unitroller,
  WhitePaperInterestRateModel,
} from '../types';

export class CompoundV2Deplotyment {
  public readonly deployer: Signer;

  public declare simpleOracle: SimplePriceOracle;
  public declare comptroller: ComptrollerG6;
  public declare unitroller: Unitroller;
  public declare whitePaperInterestRateModel: WhitePaperInterestRateModel;

  constructor(deployer: Signer) {
    this.deployer = deployer;
  }
}
