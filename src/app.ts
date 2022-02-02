import express, { Application } from "express";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import swaggerUi from "swagger-ui-express";

import { errorHandler } from "./error-handler/error-handler";
import { RegisterRoutes } from "./routes/routes";

const app: Application = express();

app.use(express.json());

app.use(express.static("public"));
RegisterRoutes(app);

//configure winston
//TODO: move to separate file
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};
if (process.env.ENVIROMENT !== "dev") {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// setup swagger page
app.use(
  "/sales-management/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(errorHandler);

export default app;
