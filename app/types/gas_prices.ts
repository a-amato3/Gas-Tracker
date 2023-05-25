export interface GasPricesResponse {
  baseFee: number;
  blockNumber: number;
  blockTime: number;
  gasPrice: {
    fast: number;
    instant: number;
    standard: number;
  };
  nextBaseFee: number;
  fast: number;
  instant: number;
  standard: number;
}
