import { Request, Response } from 'express';
import File from '../models/File';
import Box from '../models/Box';

export default {

  async index(req:Request, res:Response) {
    return res.status(200).json('Teste');
  },

  async store(req: Request, res: Response) {
    const box = await Box.findById(req.params.id);

    const file = await File.create({
      title: req.file.originalname,
      path: req.file.filename
    });

    box?.files.push(file);

    await box?.save();

    req.io.sockets.in(box?._id).emit('file', file);

    return res.status(201).json(file);
  }
}