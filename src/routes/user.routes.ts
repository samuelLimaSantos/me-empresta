import { Router } from 'express';
import * as multer from 'multer';
import UserController from '../controllers/userController';
import multerConfig from '../config/multer';

const upload = multer(multerConfig);

const routes = Router();

const userController = new UserController();

routes.post('/', upload.single('photo'), userController.create);

export default routes;
