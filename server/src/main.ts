import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import connection from './database/connection';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routes);

connection(); // database

app.listen(port, () => console.log(`🍁 Server started at http://localhost:${port}`));
