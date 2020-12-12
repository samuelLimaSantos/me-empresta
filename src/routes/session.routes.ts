import { Router } from 'express';
import SessionController from '../controllers/sessionController';

const routes = Router();
const sessionController = new SessionController();

routes.post('/', sessionController.createSession);

export default routes;
