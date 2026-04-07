interface Stock {
  id: number;
  src: string;
  title: string;
  text: string;
}

interface StockData {
  src: string;
  title: string;
  text: string;
}

export type { Stock, StockData };
