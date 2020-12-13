import express from 'express';
const cors = require('cors');
import routes from './routes';
import dotenv from 'dotenv';
import './database';
import 'reflect-metadata';


const app = express();
dotenv.config()

app.use(cors());
app.use(express.json());

app.use(routes);

const port = 3333;

app.listen(process.env.PORT || port, () => {
  console.log(`Project is running at port ${port}😈😈!`);
});
