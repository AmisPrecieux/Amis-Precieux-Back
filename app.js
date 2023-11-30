import gameRouter from "./router/game.js";
import partRouter from "./router/part.js";
import authRouter from "./router/auth.js";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Amis Precieux API',
      description: 'API documentation for Amis Precieux',
      servers: ['http://localhost:3000'],
    },
  },
  apis: ['./router/*.js'], // Path to the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
const port = 3000;
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/game/", gameRouter);
app.use("/api/part/", partRouter);
app.use("/api/auth/", authRouter);

const uri = "mongodb+srv://AdminPrecieux:"+ process.env.MONGO_PASSWORD +"@amisprecieux.aik1jxt.mongodb.net/?retryWrites=true&w=majority";
// const connection = mongoose.connect(uri, connectionParams).then(() => console.log('connected')).catch((err) => console.log(err));
mongoose.connect(uri)
  .then(() => {
  console.log('Connecté à MongoDB');
  })
  .catch((error) => {
  console.error(error);
  }) 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`App in port: ${port}`)
});


