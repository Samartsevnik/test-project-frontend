import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { exchangeApi } from '../services/exchange.ts';

export const store = configureStore({
  reducer: combineReducers({
    [exchangeApi.reducerPath]: exchangeApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exchangeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
