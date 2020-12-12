import { Router } from 'express';
import UserRoutes from './user.routes';
import SessionRoutes from './session.routes';

const routes = Router();

routes.use('/user', UserRoutes);
routes.use('/session', SessionRoutes);


export default routes;
