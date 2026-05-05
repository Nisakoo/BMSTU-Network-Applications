import express from "express";
import type { Request, Response } from "express";
import path from "path";
import loggerMiddleware from "./middleware/logger.js";
import servicesRouter from "./routes/services.js";
import { init } from "./services/servicesService.js";
import type { ErrorRespond } from "./common/response.js";
import errorMiddleware from "./middleware/error.js";

const app = express();
const PORT: number = 3000;

// Init servicesService
const DATA_FILE_PATH = path.join(import.meta.dirname, "data/services.json");
init(DATA_FILE_PATH);

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/services", servicesRouter);

// 404 handler
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    error: "not found",
    code: 404,
  } satisfies ErrorRespond);
});

// error handler
app.use(errorMiddleware);

// Run
app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
