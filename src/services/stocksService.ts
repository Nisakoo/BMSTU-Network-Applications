import type { Stock, StockData } from "../types/stock.js";
import { readData, writeData } from "./fileService.js";

let dataFilePath: string;

const init = (path: string) => {
  dataFilePath = path;
};

const findAll = (title?: string): Stock[] => {
  const stocks = readData(dataFilePath);
  if (title) {
    return stocks.filter((stock) =>
      stock.title.toLowerCase().includes(title.toLowerCase()),
    );
  }
  return stocks;
};

const findOne = (id: number): Stock | null => {
  const stocks = readData(dataFilePath);
  return stocks.find((stock) => stock.id === id) ?? null;
};

const create = (stockData: StockData): Stock => {
  const stocks = readData(dataFilePath);

  const newId =
    stocks.length > 0 ? Math.max(...stocks.map((s) => s.id)) + 1 : 1;

  const newStock: Stock = {
    id: newId,
    src: stockData.src,
    title: stockData.title,
    text: stockData.text,
  };
  stocks.push(newStock);
  writeData(dataFilePath, stocks);

  return newStock;
};

const update = (id: number, stockData: Partial<StockData>): Stock | null => {
  const stocks = readData(dataFilePath);
  const index = stocks.findIndex((s) => s.id === id);

  if (index === -1) return null;

  stocks[index] = {
    ...stocks[index],
    ...stockData,
    id: stocks[index]!.id,
  } as Stock;

  writeData(dataFilePath, stocks);

  return stocks[index];
};

const remove = (id: number): boolean => {
  const stocks = readData(dataFilePath);
  const filteredStocks = stocks.filter((s) => s.id !== id);

  if (filteredStocks.length === stocks.length) {
    return false;
  }

  writeData(dataFilePath, filteredStocks);
  return true;
};

export { init, findAll, findOne, create, update, remove };
