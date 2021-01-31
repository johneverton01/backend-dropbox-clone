import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';
import path from 'path';

import http from 'http';

const app = express();
app.use(cors());
const server = new http.Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket:any) => {
  socket.on('connectRoom', (box: any) => {
    socket.join(box);
  })
});

mongoose.connect('mongodb+srv://dropbox_vlone:BqtyQTZFYTvdNztq@cluster0.ffmmv.mongodb.net/dropbox_clone?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((req: Request, res: Response, next: any) => {
  req.io = io;
  return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(routes);

server.listen(3333);