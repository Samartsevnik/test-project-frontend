import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './base';
import {Currency, EstimatedExchangeResponse, MinAmountResponse} from './types/responsePayloadTypes.ts';
import {EstimatedExchangeParams, MinAmountParams} from './types/requestPayloadTypes.ts';
import {ExchangeFlowEnum} from '../constants.ts';

export const exchangeApi = createApi({
  reducerPath: 'exchangeApi',
  baseQuery,
  endpoints: (builder) => ({
    listCurrencies: builder.query<Currency[], void>({
      query: () => ({
        url: '/currencies',
        params: {
          flow: ExchangeFlowEnum.STANDARD
        }
      })
    }),
    getMinimalExchangeAmount: builder.query<MinAmountResponse, MinAmountParams>({
      query: ({fromCurrency, toCurrency, fromNetwork, toNetwork}) => ({
        url: '/min-amount',
        params: {
          fromCurrency,
          toCurrency,
          fromNetwork,
          toNetwork,
          flow: ExchangeFlowEnum.STANDARD
        }
      })
    }),
    getEstimatedExchangeAmount: builder.query<EstimatedExchangeResponse, EstimatedExchangeParams>({
      query: ({fromCurrency, toCurrency, fromAmount, type, toAmount, flow, fromNetwork, toNetwork}) => ({
        url: '/estimated-amount',
        params: {
          fromCurrency,
          toCurrency,
          fromAmount,
          toAmount,
          fromNetwork,
          toNetwork,
          type,
          flow,
        }
      })
    })
  })
});


export const {
  useListCurrenciesQuery,
  useLazyGetMinimalExchangeAmountQuery,
  useLazyGetEstimatedExchangeAmountQuery
} = exchangeApi;
