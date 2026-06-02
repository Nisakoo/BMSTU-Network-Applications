import type { OilDevelopment, OilDevelopmentData } from "../types/oilDevelopment.js";
import { readData, writeData } from "./fileService.js";

let dataFilePath: string;

const init = (path: string) => {
  dataFilePath = path;
};

const findAll = (title?: string): OilDevelopment[] => {
  const oilDevelopments = readData(dataFilePath);
  if (title) {
    return oilDevelopments.filter((item: OilDevelopment) =>
      item.title.toLowerCase().includes(title.toLowerCase()),
    );
  }
  return oilDevelopments;
};

const findOne = (id: number): OilDevelopment | null => {
  const oilDevelopments = readData(dataFilePath);
  return oilDevelopments.find((item: OilDevelopment) => item.id === id) ?? null;
};

const create = (data: OilDevelopmentData): OilDevelopment => {
  const oilDevelopments = readData(dataFilePath);

  const newId =
    oilDevelopments.length > 0 ? Math.max(...oilDevelopments.map((s: OilDevelopment) => s.id)) + 1 : 1;

  const newItem: OilDevelopment = {
    id: newId,
    src: data.src,
    big_src: data.big_src,
    title: data.title,
    text: data.text,
  };
  oilDevelopments.push(newItem);
  writeData(dataFilePath, oilDevelopments);

  return newItem;
};

const update = (id: number, data: Partial<OilDevelopmentData>): OilDevelopment | null => {
  const oilDevelopments = readData(dataFilePath);
  const index = oilDevelopments.findIndex((s: OilDevelopment) => s.id === id);

  if (index === -1) return null;

  oilDevelopments[index] = {
    ...oilDevelopments[index],
    ...data,
    id: oilDevelopments[index]!.id,
  } as OilDevelopment;

  writeData(dataFilePath, oilDevelopments);

  return oilDevelopments[index];
};

const remove = (id: number): boolean => {
  const oilDevelopments = readData(dataFilePath);
  const filtered = oilDevelopments.filter((s: OilDevelopment) => s.id !== id);

  if (filtered.length === oilDevelopments.length) {
    return false;
  }

  writeData(dataFilePath, filtered);
  return true;
};

export { init, findAll, findOne, create, update, remove };
