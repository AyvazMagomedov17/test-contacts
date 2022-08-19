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
import { SECRET_KEY } from './../common/consts.js';
import jwt from 'jsonwebtoken';
import ApiError from "../error/error.js";
import Models from '../models/models.js';
import bcrypt from 'bcrypt';
var generateJwt = function (id, email) {
    return jwt.sign({ id: id, email: email }, SECRET_KEY, { expiresIn: '24h' });
};
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.createUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, candidate, hashPassword, user, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!email || !password) {
                            return [2, next(ApiError.badRequest('Не указан email или password'))];
                        }
                        return [4, Models.Users.findOne({ where: { email: email } })];
                    case 1:
                        candidate = _b.sent();
                        if (candidate) {
                            return [2, next(ApiError.badRequest('Пользователь с таким email уже зарегистрирован'))];
                        }
                        return [4, bcrypt.hash(String(password), 5)];
                    case 2:
                        hashPassword = _b.sent();
                        return [4, Models.Users.create({ email: email, password: hashPassword })];
                    case 3:
                        user = _b.sent();
                        token = generateJwt(user.get().id, user.get().email);
                        return [2, res.json({
                                token: token,
                                user: {
                                    id: user.get().id,
                                    email: user.get().email,
                                }
                            })];
                    case 4:
                        error_1 = _b.sent();
                        next(ApiError.forbidden(error_1.message));
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, isPassValid, token, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4, Models.Users.findOne({ where: { email: email } })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2, next(ApiError.badRequest('Пользователь с таким email не найден'))];
                        }
                        isPassValid = bcrypt.compareSync(password, user.get().password);
                        if (!isPassValid) {
                            return [2, next(ApiError.badRequest('Неправильный пароль'))];
                        }
                        token = generateJwt(user.get().id, user.get().email);
                        return [2, res.json({
                                token: token,
                                user: {
                                    id: user.get().id,
                                    email: user.get().email,
                                }
                            })];
                    case 2:
                        error_2 = _b.sent();
                        return [2, next(ApiError.internal(error_2.message))];
                    case 3: return [2];
                }
            });
        });
    };
    UserController.prototype.auth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, Models.Users.findOne({ where: { id: req.user.id } })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            token = generateJwt(user.get().id, user.get().email);
                            return [2, res.json({
                                    token: token,
                                    user: {
                                        id: user.get().id,
                                        email: user.get().email,
                                    }
                                })];
                        }
                        return [2, next(ApiError.badRequest('Вы не авторизованы'))];
                    case 2:
                        error_3 = _a.sent();
                        next(ApiError.badRequest(error_3.message));
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return UserController;
}());
export default new UserController();
