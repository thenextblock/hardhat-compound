export enum CTOKEN {
  cAAVE,
  cBAT,
  cCOMP,
  cDAI,
  cETH,
  cLINK,
  cMKR,
  cREP,
  cSAI,
  cSUSHI,
  cTUSD,
  cUNI,
  cUSDC,
  cUSDT,
  cWBTC,
  cWBTC2,
  cYFI,
  cZRX,
}

export enum IRM {
  WhitePaperInterestRateModel,
  JumpRateModelV2,
  LegacyJumpRateModelV2,
}

export enum CTOKEN_TYPE {
  CErc20Immutable,
  CErc20Delegator,
}

export enum CTOKEN_IRM {
  cAAVE = IRM.JumpRateModelV2,
  cBAT = IRM.WhitePaperInterestRateModel,
  cCOMP = IRM.JumpRateModelV2,
  cDAI = IRM.JumpRateModelV2,
  cETH = IRM.WhitePaperInterestRateModel,
  cLINK = IRM.JumpRateModelV2,
  cMKR = IRM.JumpRateModelV2,
  cREP = IRM.WhitePaperInterestRateModel,
  cSAI = IRM.WhitePaperInterestRateModel,
  cSUSHI = IRM.JumpRateModelV2,
  cTUSD = IRM.JumpRateModelV2,
  cUNI = IRM.JumpRateModelV2,
  cUSDC = IRM.LegacyJumpRateModelV2,
  cUSDT = IRM.JumpRateModelV2,
  cWBTC = IRM.JumpRateModelV2,
  cWBTC2 = IRM.WhitePaperInterestRateModel,
  cYFI = IRM.JumpRateModelV2,
  cZRX = IRM.WhitePaperInterestRateModel,
}
