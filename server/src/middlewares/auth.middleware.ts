import { SECRET_KEY } from './../common/consts.js';

import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {

    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]

            if (!token) {
                return res.status(401).json({ message: 'Пользователь не авторизован' })
            }
            const decoded = jwt.verify(token, SECRET_KEY)
            // @ts-ignore
            req.user = decoded
            next()
        }


    } catch (error) {
        res.status(401).json({ message: 'Пользователь не авторизован' })
    }
}