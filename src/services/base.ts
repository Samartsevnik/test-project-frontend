import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
      headers.set('x-changenow-api-key', apiKey);
    }
    return headers;
  },
});
