import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import status from "http-status";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

//parser
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("BD-DESTINATION server is running");
});

// Global error handler
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND...!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found",
    },
  });
});

export default app;
