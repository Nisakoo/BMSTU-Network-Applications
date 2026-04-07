import express from "express";
import {
  createStock,
  deleteStock,
  getAllStocks,
  getStockById,
  updateStock,
} from "../controllers/stocksController.js";

const stocksRouter = express.Router();

stocksRouter.get("/", getAllStocks);
stocksRouter.get("/:id", getStockById);
stocksRouter.post("/", createStock);
stocksRouter.patch("/:id", updateStock);
stocksRouter.delete("/:id", deleteStock);

export default stocksRouter;
