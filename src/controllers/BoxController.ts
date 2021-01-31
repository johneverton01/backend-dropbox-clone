import { Request, Response } from 'express';
import Box from '../models/Box';

export default {

  async index(req:Request, res:Response) {
    const boxes = await Box.find()
    return res.status(200).json(boxes);
  },

  async store(req: Request, res: Response) {

    const { title } = req.body
    const box = await Box.create({ title: title });
    return res.status(201).json(box);
  },

  async show(req: Request, res: Response) {
    const box = await Box
    .findById(req.params.id)
    .populate({
      path: 'files',
      options: {sort: { createdAt: -1 }}});
    return res.status(200).json(box);
  }
}