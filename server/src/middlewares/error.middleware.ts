import { NextFunction, Request, Response } from "express"
import ApiError from "../error/error.js"


export default function (err: any, req: Request, res: Response, next: NextFunction) {
    if (err.status) {
        return res.status(err.status).json({ message: err.message })
    } else {
        return res.status(500).json({ message: 'Непредвиденная ошибка' })
    }

}