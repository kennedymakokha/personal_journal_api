"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.authorized = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign, decode, verify } = jsonwebtoken_1.default;
const authorized = (req, res, next) => {
    const loginRequired = req.user;
    if (loginRequired === null) {
        return res.status(401).json({ message: 'Unauthorized user !' });
    }
    next();
};
exports.authorized = authorized;
const authMiddleware = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const token = authorization && authorization.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ success: false, message: 'Not Authorised !' });
    }
    verify(token, 'nebbukadinezza', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log("AUTHORIZATION ERROR:", err);
            return res.status(403).json({ success: false, message: 'Not Authorised !' });
        }
        req.user = data;
        next();
    }));
};
exports.authMiddleware = authMiddleware;
// export { authMiddleware, authorized };
