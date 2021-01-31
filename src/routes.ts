import { Router } from 'express';
import multer from 'multer';
import BoxController from './controllers/BoxController';
import FileController from './controllers/FileController';
import multerConfig from './config/multer';

const routes = Router();

routes.get('/boxes', BoxController.index);
routes.get('/boxes/:id', BoxController.show);
routes.post('/boxes', BoxController.store);
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);

export default routes;