import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import get from 'lodash.get';
import socketIO from 'socket.io';
import cors from 'cors';

import locations from './app_modules/locations/router';
import auth from './app_modules/admin/router';
import { Users } from './models';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const tokenKey = process.env['TOKEN_KEY'];

const app = express();

app.use(cors());

const decimalBase = 10;
const DEFAULT_PORT = parseInt(process.env['DEFAULT_PORT'], decimalBase);
const server = app.listen(DEFAULT_PORT, ()=>
    console.log(`Server is listening on port ${DEFAULT_PORT}`));

const io = socketIO(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

// store the socket in app
app.set('socket', io);

app.use(bodyParser.json());
app.use(function(req, res, next) {
  try{
    const authorization = get(req, 'headers.authorization', '');
    const token = authorization.split(" ")[1];
    jwt.verify(token, tokenKey, function (err, payload) {
      if (payload) {
        Users.findByPk(payload.userId).then(
            (doc) => {
              req.user = doc;
              next();
            }
        );
      } else {
        req.user = undefined;
        next();
      }
    })
  }catch(e){
    next();
  }
});
app.use('/locations', locations);
app.use('/auth', auth);

export default app;