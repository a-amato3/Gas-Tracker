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
  priorityFee: {
    fast: number;
    instant: number;
    standard: number;
  };
}
