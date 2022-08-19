import { SECRET_KEY } from './../common/consts.js';
import jwt from 'jsonwebtoken';
export default function (req, res, next) {
    try {
        if (req.headers.authorization) {
            var token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Пользователь не авторизован' });
            }
            var decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
            next();
        }
    }
    catch (error) {
        res.status(401).json({ message: 'Пользователь не авторизован' });
    }
}
