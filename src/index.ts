import express from "express";
import type { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import loggerMiddleware from "./middleware/logger.js";
import oilDevelopmentRouter from "./routes/oilDevelopment.js";
import { init } from "./services/oilDevelopmentService.js";
import type { ErrorRespond } from "./common/response.js";
import errorMiddleware from "./middleware/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT: number = 3000;

// Init oilDevelopmentService
const DATA_FILE_PATH = path.join(__dirname, "data/oil_development.json");
init(DATA_FILE_PATH);

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use(express.static(path.join(import.meta.dirname, "../public")));
app.use("/oil_development", oilDevelopmentRouter);

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
