import type { OilService, ServiceData } from "../types/service.js";
import { readData, writeData } from "./fileService.js";

let dataFilePath: string;

const init = (path: string) => {
  dataFilePath = path;
};

const findAll = (title?: string): OilService[] => {
  const services = readData(dataFilePath);
  if (title) {
    return services.filter((service: OilService) =>
      service.title.toLowerCase().includes(title.toLowerCase()),
    );
  }
  return services;
};

const findOne = (id: number): OilService | null => {
  const services = readData(dataFilePath);
  return services.find((service: OilService) => service.id === id) ?? null;
};

const create = (serviceData: ServiceData): OilService => {
  const services = readData(dataFilePath);

  const newId =
    services.length > 0 ? Math.max(...services.map((s: OilService) => s.id)) + 1 : 1;

  const newService: OilService = {
    id: newId,
    src: serviceData.src,
    big_src: serviceData.big_src,
    title: serviceData.title,
    text: serviceData.text,
  };
  services.push(newService);
  writeData(dataFilePath, services);

  return newService;
};

const update = (id: number, serviceData: Partial<ServiceData>): OilService | null => {
  const services = readData(dataFilePath);
  const index = services.findIndex((s: OilService) => s.id === id);

  if (index === -1) return null;

  services[index] = {
    ...services[index],
    ...serviceData,
    id: services[index]!.id,
  } as OilService;

  writeData(dataFilePath, services);

  return services[index];
};

const remove = (id: number): boolean => {
  const services = readData(dataFilePath);
  const filteredServices = services.filter((s: OilService) => s.id !== id);

  if (filteredServices.length === services.length) {
    return false;
  }

  writeData(dataFilePath, filteredServices);
  return true;
};

export { init, findAll, findOne, create, update, remove };
