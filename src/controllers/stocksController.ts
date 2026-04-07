import { type Request, type Response } from "express";
import {
  findAll,
  findOne,
  create,
  update,
  remove,
} from "../services/stocksService.js";
import type { StockData } from "../types/stock.js";
import type { ErrorRespond } from "../common/response.js";

const parseIdOrRespondError = (req: Request, res: Response): number | null => {
  const rawId = req.params.id as string | undefined;
  if (rawId === undefined) {
    res.status(400).json({
      error: "id not provided",
      code: 400,
    } satisfies ErrorRespond);
    return null;
  }

  const id = parseInt(rawId);
  if (isNaN(id)) {
    res.status(400).json({
      error: "invalid id",
      code: 400,
    } satisfies ErrorRespond);
    return null;
  }

  return id;
};

const getAllStocks = (req: Request, res: Response): void => {
  const title = req.query.title as string | undefined;

  const stocks = findAll(title!);
  res.json(stocks);
};

const getStockById = (req: Request, res: Response): void => {
  const id = parseIdOrRespondError(req, res);
  if (id === null) {
    return;
  }

  const stock = findOne(id);

  if (!stock) {
    res.status(404).json({
      error: "stock not found",
      code: 404,
    } satisfies ErrorRespond);
    return;
  }

  res.json(stock);
};

const createStock = (req: Request, res: Response) => {
  const src = req.body.src as string | undefined;
  const title = req.body.title as string | undefined;
  const text = req.body.text as string | undefined;

  if (!src || !title || !text) {
    res.status(400).json({
      error: "provide all fields",
      code: 400,
    } satisfies ErrorRespond);
    return;
  }

  const newStock = create({ src, title, text } as StockData);
  res.status(201).json(newStock);
};

const updateStock = (req: Request, res: Response) => {
  const id = parseIdOrRespondError(req, res);
  if (id === null) {
    return;
  }

  const values = req.body as Partial<StockData>;
  const updatedStock = update(id, values);

  if (!updatedStock) {
    res.status(404).json({
      error: "stock not found",
      code: 404,
    } satisfies ErrorRespond);
    return;
  }

  res.json(updatedStock);
};

const deleteStock = (req: Request, res: Response) => {
  const id = parseIdOrRespondError(req, res);
  if (id === null) {
    return;
  }

  const success = remove(id);

  if (!success) {
    res.status(404).json({
      error: "stock not found",
      code: 404,
    } satisfies ErrorRespond);
    return;
  }

  res.status(204).send();
};

export { getAllStocks, getStockById, createStock, updateStock, deleteStock };
