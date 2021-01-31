import { request } from 'express';
import multer from 'multer';
import path from 'path';

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
    },
    filename: (request, file, cb) => {

        const fileName = `${Date.now()}-${file.originalname}`;

        cb(null, fileName);
    }
  })
}