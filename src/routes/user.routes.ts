import { Router } from 'express';
import * as multer from 'multer';
import checkJwt from '../middlewares/checkJwt';
import UserController from '../controllers/userController';
import multerConfig from '../config/multer';

const upload = multer(multerConfig);

const routes = Router();

const userController = new UserController();

routes.post('/', upload.single('photo'), userController.create);
routes.get('/:userId', checkJwt.execute, userController.index);
routes.get('/', checkJwt.execute, userController.store);

export default routes;
