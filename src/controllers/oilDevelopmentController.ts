import { type Request, type Response } from "express";
import {
  findAll,
  findOne,
  create,
  update,
  remove,
} from "../services/oilDevelopmentService.js";
import type { OilDevelopmentData } from "../types/oilDevelopment.js";
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

const getOilDevelopments = (req: Request, res: Response): void => {
  const title = req.query.title as string | undefined;

  const oilDevelopments = findAll(title!);
  res.json(oilDevelopments);
};

const getOilDevelopmentById = (req: Request, res: Response): void => {
  const id = parseIdOrRespondError(req, res);
  if (id === null) {
    return;
  }

  const item = findOne(id);

  if (!item) {
    res.status(404).json({
      error: "oil_development not found",
      code: 404,
    } satisfies ErrorRespond);
    return;
  }

  res.json(item);
};

const createOilDevelopment = (req: Request, res: Response) => {
  const { src, big_src, title, text } = req.body;

  if (!src || !big_src || !title || !text) {
    res.status(400).json({
      error: "provide all fields (src, big_src, title, text)",
      code: 400,
    } satisfies ErrorRespond);
    return;
  }

  const newItem = create({ src, big_src, title, text } as OilDevelopmentData);
  res.status(201).json(newItem);
};

const updateOilDevelopment = (req: Request, res: Response) => {
  const id = parseIdOrRespondError(req, res);
  if (id === null) {
    return;
  }

  const values = req.body as Partial<OilDevelopmentData>;
  const updatedItem = update(id, values);

  if (!updatedItem) {
    res.status(404).json({
      error: "oil_development not found",
      code: 404,
    } satisfies ErrorRespond);
    return;
  }

  res.json(updatedItem);
};

const deleteOilDevelopment = (req: Request, res: Response) => {
  const id = parseIdOrRespondError(req, res);
  if (id === null) {
    return;
  }

  const success = remove(id);

  if (!success) {
    res.status(404).json({
      error: "oil_development not found",
      code: 404,
    } satisfies ErrorRespond);
    return;
  }

  res.status(204).send();
};

export { getOilDevelopments, getOilDevelopmentById, createOilDevelopment, updateOilDevelopment, deleteOilDevelopment };
