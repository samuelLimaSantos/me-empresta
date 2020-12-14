import { Router } from 'express';
import ProductController from '../controllers/productController';
import * as multer from 'multer';
import checkJwt from '../middlewares/checkJwt';
import multerConfig from '../config/multer';

const upload = multer(multerConfig);

const routes = Router();
const productController = new ProductController();

routes.post('/',checkJwt.execute, upload.single('photo'), productController.create);
routes.get('/', productController.store);
routes.get('/:id', productController.index);

export default routes;
