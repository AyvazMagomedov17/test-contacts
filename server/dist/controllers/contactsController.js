var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import ApiError from '../error/error.js';
import models from '../models/models.js';
import { Sequelize } from "sequelize";
var ContactsController = (function () {
    function ContactsController() {
    }
    ContactsController.prototype.addContact = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, description, name_1, phoneNumber, userId, contact, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, description = _a.description, name_1 = _a.name, phoneNumber = _a.phoneNumber;
                        userId = req.user.id;
                        if (!name_1) {
                            return [2, next(ApiError.badRequest('Не указано имя'))];
                        }
                        if (!phoneNumber) {
                            return [2, next(ApiError.badRequest('Не указан номер'))];
                        }
                        if (!description) {
                            return [2, next(ApiError.badRequest('Не указано описание'))];
                        }
                        return [4, models.Contacts.create({ description: description, name: name_1, phoneNumber: phoneNumber, userId: userId })];
                    case 1:
                        contact = _b.sent();
                        return [2, res.json({
                                item: contact
                            })];
                    case 2:
                        error_1 = _b.sent();
                        return [2, next(ApiError.forbidden(error_1.message))];
                    case 3: return [2];
                }
            });
        });
    };
    ContactsController.prototype.getContacts = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, page, name_2, limit, offset, _a, count, rows, totalPages, _b, count, rows, totalPages, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        userId = req.user.id;
                        page = Number(req.query.page) || 1;
                        name_2 = req.query.name;
                        limit = 20;
                        offset = page * limit - limit;
                        if (!!name_2) return [3, 2];
                        return [4, models.Contacts.findAndCountAll({ where: { userId: userId }, limit: limit, offset: offset })];
                    case 1:
                        _a = _c.sent(), count = _a.count, rows = _a.rows;
                        totalPages = Math.ceil(count / limit);
                        return [2, res.json({
                                totalPages: totalPages,
                                items: rows
                            })];
                    case 2: return [4, models.Contacts.findAndCountAll({
                            where: {
                                userId: userId,
                                name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', "%".concat(name_2.toLowerCase(), "%"))
                            },
                            limit: limit,
                            offset: offset
                        })];
                    case 3:
                        _b = _c.sent(), count = _b.count, rows = _b.rows;
                        totalPages = Math.ceil(count / limit);
                        return [2, res.json({
                                totalPages: totalPages,
                                items: rows.reverse()
                            })];
                    case 4: return [3, 6];
                    case 5:
                        error_2 = _c.sent();
                        return [2, next(ApiError.forbidden(error_2.message))];
                    case 6: return [2];
                }
            });
        });
    };
    ContactsController.prototype.deleteContact = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, id, candidate, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        id = Number(req.params.id);
                        if (!id) {
                            return [2, next(ApiError.badRequest('Не указан id'))];
                        }
                        return [4, models.Contacts.findOne({ where: { userId: userId, id: id } })];
                    case 1:
                        candidate = _a.sent();
                        if (!candidate) {
                            return [2, next(ApiError.badRequest('Контакт не найден'))];
                        }
                        return [4, models.Contacts.destroy({ where: { userId: userId, id: id } })];
                    case 2:
                        _a.sent();
                        return [2, res.json({
                                item: candidate
                            })];
                    case 3:
                        error_3 = _a.sent();
                        next(ApiError.forbidden(error_3.message));
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    ContactsController.prototype.changeContact = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, id, description, name_3, phoneNumber, contact, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        _a = req.body, id = _a.id, description = _a.description, name_3 = _a.name, phoneNumber = _a.phoneNumber;
                        if (!id) {
                            return [2, next(ApiError.badRequest('Не указан id'))];
                        }
                        if (!name_3) {
                            return [2, next(ApiError.badRequest('Не указано имя'))];
                        }
                        if (!phoneNumber) {
                            return [2, next(ApiError.badRequest('Не указан номер'))];
                        }
                        if (!description) {
                            return [2, next(ApiError.badRequest('Не указано описание'))];
                        }
                        return [4, models.Contacts.update({ description: description, name: name_3, phoneNumber: phoneNumber }, { where: { id: id, userId: userId } })];
                    case 1:
                        _b.sent();
                        return [4, models.Contacts.findOne({ where: { userId: userId, id: id } })];
                    case 2:
                        contact = _b.sent();
                        return [2, res.json({
                                item: contact
                            })];
                    case 3:
                        error_4 = _b.sent();
                        return [2, next(ApiError.forbidden(error_4.message))];
                    case 4: return [2];
                }
            });
        });
    };
    ContactsController.prototype.getContact = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, id, candidate, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        id = Number(req.params.id);
                        if (!id) {
                            return [2, next(ApiError.badRequest('Не указан id'))];
                        }
                        return [4, models.Contacts.findOne({ where: { id: id, userId: userId } })];
                    case 1:
                        candidate = _a.sent();
                        return [2, res.json({
                                item: {
                                    id: candidate === null || candidate === void 0 ? void 0 : candidate.get().id,
                                    phoneNumber: candidate === null || candidate === void 0 ? void 0 : candidate.get().phoneNumber,
                                    description: candidate === null || candidate === void 0 ? void 0 : candidate.get().description,
                                    name: candidate === null || candidate === void 0 ? void 0 : candidate.get().name,
                                    userId: candidate === null || candidate === void 0 ? void 0 : candidate.get().userId
                                }
                            })];
                    case 2:
                        error_5 = _a.sent();
                        return [2, next(error_5.message)];
                    case 3: return [2];
                }
            });
        });
    };
    return ContactsController;
}());
export default new ContactsController();
