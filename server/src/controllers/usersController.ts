import { SECRET_KEY } from './../common/consts.js';
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import ApiError from "../error/error.js";
import Models from '../models/models.js'
import bcrypt from 'bcrypt'

const generateJwt = (id: number, email: string) => {
    return jwt.sign(
        { id, email },
        SECRET_KEY,
        { expiresIn: '24h' })

}
class UserController {
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body


            if (!email || !password) {
                return next(ApiError.badRequest('Не указан email или password'))
            }

            const candidate = await Models.Users.findOne({ where: { email } })

            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже зарегистрирован'))
            }
            const hashPassword = await bcrypt.hash(String(password), 5)
            //@ts-ignore
            const user = await Models.Users.create({ email, password: hashPassword })
            const token = generateJwt(user.get().id, user.get().email)

            return res.json({
                token,
                user: {
                    id: user.get().id,
                    email: user.get().email,

                }
            })

        } catch (error: any) {
            next(ApiError.forbidden(error.message))
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const user = await Models.Users.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не найден'))
            }
            const isPassValid = bcrypt.compareSync(password, user.get().password)
            if (!isPassValid) {
                return next(ApiError.badRequest('Неправильный пароль'))
            }
            const token = generateJwt(user.get().id, user.get().email)
            return res.json({
                token,
                user: {
                    id: user.get().id,
                    email: user.get().email,
                }
            })
        } catch (error: any) {
            return next(ApiError.internal(error.message))
        }
    }
    async auth(req: any, res: Response, next: NextFunction) {
        try {
            const user = await Models.Users.findOne({ where: { id: req.user.id } })
            if (user) {
                const token = generateJwt(user.get().id, user.get().email)
                return res.json({
                    token,
                    user: {
                        id: user.get().id,
                        email: user.get().email,
                    }
                })
            }
            return next(ApiError.badRequest('Вы не авторизованы'))

        } catch (error: any) {
            next(ApiError.badRequest(error.message))
        }
    }
}

export default new UserController()