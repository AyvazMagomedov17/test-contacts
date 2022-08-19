import { IContacts } from './../interfaces/IContacts.js';
import { Request, Response, NextFunction } from "express"
import ApiError from '../error/error.js';
import models from '../models/models.js';
import { Sequelize } from "sequelize";


class ContactsController {
    async addContact(req: Request, res: Response, next: NextFunction) {
        try {
            const { description, name, phoneNumber }: IContacts = req.body
            //@ts-ignore
            const userId = req.user.id

            if (!name) {
                return next(ApiError.badRequest('Не указано имя'))
            }
            if (!phoneNumber) {
                return next(ApiError.badRequest('Не указан номер'))
            }
            if (!description) {
                return next(ApiError.badRequest('Не указано описание'))
            }

            const contact = await models.Contacts.create({ description, name, phoneNumber, userId: userId })
            return res.json({
                item: contact
            })

        } catch (error: any) {
            return next(ApiError.forbidden(error.message))
        }
    }
    async getContacts(req: Request, res: Response, next: NextFunction) {

        try {
            //@ts-ignore
            const userId = req.user.id
            const page = Number(req.query.page) || 1
            //@ts-ignore
            const name: string = req.query.name
            const limit = 20
            const offset = page * limit - limit
            if (!name) {
                const { count, rows } = await models.Contacts.findAndCountAll({ where: { userId }, limit, offset })
                const totalPages = Math.ceil(count / limit)
                return res.json({
                    totalPages,
                    items: rows
                })
            } else {
                const { count, rows } = await models.Contacts.findAndCountAll({
                    // @ts-ignore
                    where: {
                        userId,
                        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${name.toLowerCase()}%`)
                    }, limit, offset

                })
                const totalPages = Math.ceil(count / limit)
                return res.json({
                    totalPages,
                    items: rows.reverse()
                })
            }

        } catch (error: any) {
            return next(ApiError.forbidden(error.message))
        }
    }
    async deleteContact(req: Request, res: Response, next: NextFunction) {
        try {
            //@ts-ignore
            const userId = req.user.id
            const id = Number(req.params.id)
            if (!id) {
                return next(ApiError.badRequest('Не указан id'))
            }
            const candidate = await models.Contacts.findOne({ where: { userId, id } })
            if (!candidate) {
                return next(ApiError.badRequest('Контакт не найден'))
            }
            await models.Contacts.destroy({ where: { userId, id } })
            return res.json({
                item: candidate
            })
        } catch (error: any) {
            next(ApiError.forbidden(error.message))
        }
    }
    async changeContact(req: Request, res: Response, next: NextFunction) {
        try {
            //@ts-ignore
            const userId = req.user.id
            const { id, description, name, phoneNumber }: IContacts = req.body
            if (!id) {
                return next(ApiError.badRequest('Не указан id'))
            }
            if (!name) {
                return next(ApiError.badRequest('Не указано имя'))
            }
            if (!phoneNumber) {
                return next(ApiError.badRequest('Не указан номер'))
            }
            if (!description) {
                return next(ApiError.badRequest('Не указано описание'))
            }
            await models.Contacts.update({ description, name, phoneNumber }, { where: { id, userId } })
            const contact = await models.Contacts.findOne({ where: { userId, id } })
            return res.json({
                item: contact
            })
        } catch (error: any) {
            return next(ApiError.forbidden(error.message))
        }
    }
    async getContact(req: Request, res: Response, next: NextFunction) {
        try {
            //@ts-ignore
            const userId = req.user.id

            const id = Number(req.params.id)
            if (!id) {
                return next(ApiError.badRequest('Не указан id'))
            }
            const candidate = await models.Contacts.findOne({ where: { id, userId } })
            return res.json({
                item: {
                    id: candidate?.get().id,
                    phoneNumber: candidate?.get().phoneNumber,
                    description: candidate?.get().description,
                    name: candidate?.get().name,
                    userId: candidate?.get().userId
                }
            })
        } catch (error: any) {
            return next(error.message)
        }

    }
}


export default new ContactsController()