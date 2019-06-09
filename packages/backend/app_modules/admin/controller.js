import get from 'lodash.get';
import jwt from 'jsonwebtoken';

import { Users } from "../../models";
import { handledError, responseJSON } from '../common';
import { HTTP_CODES } from '../../constants';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const tokenKey = process.env['TOKEN_KEY'];

export default {
  /**
   * Authenticate a user and returns a token
   *
   * @function
   * @param {Object} req - The request object from express, the body must
   * include username and password
   * @param {Object} res - The response object from express
   * @return {undefined}
   */
  async authenticate(req, res) {
    const username = get(req, 'body.username', '');
    const password = get(req, 'body.password', '');
    try {
      const user = await Users.findOne({ where: { username } });
      if(user === null){
        return responseJSON('Incorrect username or password',
            HTTP_CODES.NOT_FOUND,
            res,
        );
      }
      if (user.validPassword(password)) {
        const token= jwt.sign({ userId: user.id }, tokenKey);
        return responseJSON({token}, HTTP_CODES.OK, res);
      } else {
        return responseJSON('Incorrect username or password',
            HTTP_CODES.NOT_FOUND,
            res,
        );
      }
    } catch (e) {
      return handledError(res, e);
    }
  },
};
