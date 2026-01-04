import { ExchangeRates } from '@/types/currency';
import axios from 'axios';

const BASE_URL = 'https://api.frankfurter.app';

export const fetchExchangeRates = async (baseCurrency: string = 'TRY'): Promise<ExchangeRates> => {
  try {
    const response = await axios.get<ExchangeRates>(`${BASE_URL}/latest?from=${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const fetchHistoricalRates = async (
  baseCurrency: string,
  targetCurrency: string,
  startDate: string,
  endDate: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${startDate}..${endDate}?from=${baseCurrency}&to=${targetCurrency}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching historical rates:', error);
    throw error;
  }
};
