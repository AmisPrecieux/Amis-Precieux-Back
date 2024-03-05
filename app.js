import gameRouter from "./router/game.js";
import partRouter from "./router/part.js";
import authRouter from "./router/auth.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Amis Precieux API",
      description: "API documentation for Amis Precieux",
      servers: ["http://localhost:3000"],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // or your token format
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./router/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
const port = 3000;
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/game/", gameRouter);
app.use("/api/part/", partRouter);
app.use("/api/auth/", authRouter);

mongoose
  .connect(process.env.URI)
  .then(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Connecté à MongoDB");
    }
  })
  .catch((error) => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  });

if (process.env.NODE_ENV === "development") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

// Middleware to include Authorization header with bearer token
app.use((req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken) {
    req.headers.authorization = bearerToken;
  }
  next();
});

app.listen(port, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`App in port: ${port}`);
  }
});