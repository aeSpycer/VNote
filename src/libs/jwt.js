import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const createAccessToken = payload => {

    return new Promise((resolve, reject) => {

        jwt.sign(payload, TOKEN_SECRET, { expiresIn:  "1d"}, (err, token) => (err) ? reject(err) : resolve(token));

    });
}