import express from "express";
import {
  createOilDevelopment,
  deleteOilDevelopment,
  getOilDevelopments,
  getOilDevelopmentById,
  updateOilDevelopment,
} from "../controllers/oilDevelopmentController.js";

const oilDevelopmentRouter = express.Router();

oilDevelopmentRouter.get("/", getOilDevelopments);
oilDevelopmentRouter.get("/:id", getOilDevelopmentById);
oilDevelopmentRouter.post("/", createOilDevelopment);
oilDevelopmentRouter.patch("/:id", updateOilDevelopment);
oilDevelopmentRouter.delete("/:id", deleteOilDevelopment);

export default oilDevelopmentRouter;
