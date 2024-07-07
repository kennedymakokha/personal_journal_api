import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import journalRoutes from './routes/journalRoutes'
import categoryRoutes from './routes/categoriesRoutes'
import userRoutes from './routes/usersRoutes'
import bodyParser from 'body-parser'
dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/api', journalRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});