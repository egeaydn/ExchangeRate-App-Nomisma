export interface ExchangeRates {
  amount: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export interface Currency {
  code: string;
  name: string;
  flag: string;
  rate?: number;
  change?: number;
}

export interface HistoricalRate {
  date: string;
  rate: number;
}
