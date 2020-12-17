import * as express from 'express';
const cors = require('cors');
import * as path from 'path';
import routes from './routes';
import * as dotenv from 'dotenv';
import './database';
import 'reflect-metadata';


const app = express();
dotenv.config()

app.use(cors());
app.use(express.json());

app.use(routes);


app.use('/uploads', express.static(path.join(__dirname, "..", 'uploads')));

const port = 3333;

app.listen(process.env.PORT || port, () => {
  console.log(`Project is running 😈😈!`);
});
