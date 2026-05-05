import express from "express";
import {
  createService,
  deleteService,
  getServices,
  getServiceById,
  updateService,
} from "../controllers/servicesController.js";

const servicesRouter = express.Router();

servicesRouter.get("/", getServices);
servicesRouter.get("/:id", getServiceById);
servicesRouter.post("/", createService);
servicesRouter.patch("/:id", updateService);
servicesRouter.delete("/:id", deleteService);

export default servicesRouter;
