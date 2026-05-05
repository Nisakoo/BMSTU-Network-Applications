import { type Request, type Response } from "express";
import {
  findAll,
  findOne,
  create,
  update,
  remove,
} from "../services/servicesService.js";
import type { ServiceData } from "../types/service.js";
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

const getServices = (req: Request, res: Response): void => {
  const title = req.query.title as string | undefined;

  const services = findAll(title!);
  res.json(services);
};

const getServiceById = (req: Request, res: Response): void => {
  const id = parseIdOrRespondError(req, res);
  if (id === null) {
    return;
  }

  const service = findOne(id);

  if (!service) {
    res.status(404).json({
      error: "service not found",
      code: 404,
    } satisfies ErrorRespond);
    return;
  }

  res.json(service);
};

const createService = (req: Request, res: Response) => {
  const { src, big_src, title, text } = req.body;

  if (!src || !big_src || !title || !text) {
    res.status(400).json({
      error: "provide all fields (src, big_src, title, text)",
      code: 400,
    } satisfies ErrorRespond);
    return;
  }

  const newService = create({ src, big_src, title, text } as ServiceData);
  res.status(201).json(newService);
};

const updateService = (req: Request, res: Response) => {
  const id = parseIdOrRespondError(req, res);
  if (id === null) {
    return;
  }

  const values = req.body as Partial<ServiceData>;
  const updatedService = update(id, values);

  if (!updatedService) {
    res.status(404).json({
      error: "service not found",
      code: 404,
    } satisfies ErrorRespond);
    return;
  }

  res.json(updatedService);
};

const deleteService = (req: Request, res: Response) => {
  const id = parseIdOrRespondError(req, res);
  if (id === null) {
    return;
  }

  const success = remove(id);

  if (!success) {
    res.status(404).json({
      error: "service not found",
      code: 404,
    } satisfies ErrorRespond);
    return;
  }

  res.status(204).send();
};

export { getServices, getServiceById, createService, updateService, deleteService };
