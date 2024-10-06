import {ExchangeFlowEnum, ExchangeTypeEnum} from '../../constants.ts';

export interface Currency {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
  network: string;
  tokenContract: string | null;
  buy: boolean;
  sell: boolean;
  legacyTicker: string;
}

export interface MinAmountResponse {
  fromCurrency: string;
  fromNetwork: string;
  minAmount: number;
  toCurrency: string;
  toNetwork: string;
}

export interface EstimatedExchangeResponse {
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  flow: ExchangeFlowEnum;
  type: ExchangeTypeEnum;
  rateId: string | null;
  validUntil: string | null;
  transactionSpeedForecast: string | null;
  warningMessage: string | null;
  fromAmount: number;
  toAmount: number;
  depositFee: number;
  withdrawalFee: number;
}