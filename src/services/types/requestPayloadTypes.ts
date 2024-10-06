import {ExchangeFlowEnum, ExchangeTypeEnum} from '../../constants.ts';

export interface MinAmountParams {
  fromCurrency: string;
  toCurrency: string;
  fromNetwork: string;
  toNetwork: string;
}

export interface EstimatedExchangeParams {
  fromCurrency: string;
  toCurrency: string;
  fromNetwork: string;
  toNetwork: string;
  fromAmount?: number;
  toAmount?: number;
  type: ExchangeTypeEnum;
  flow: ExchangeFlowEnum

}
