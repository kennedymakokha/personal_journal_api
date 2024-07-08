import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import journalRoutes from './routes/journalRoutes'
import categoryRoutes from './routes/categoriesRoutes'
import userRoutes from './routes/usersRoutes'
import bodyParser from 'body-parser'

import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
// import {options} from './index.js'
dotenv.config();
const app: Express = express();
const port = process.env.PORT;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Journal',
      version: '1.0.0',
      description: 'Personal Journal covered Create, Read, Update, and Delete operations using a Node.js API',
    },
    servers: [
      { url: 'http://localhost:5000/api' }, //you can change you server url
    ],
    
  },

  apis: ['./routes/*.ts'], //you can change you swagger path
};
const specs = swaggerJsdoc(options);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', journalRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});