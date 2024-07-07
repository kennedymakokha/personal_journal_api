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
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const { sign, decode, verify } = jsonwebtoken_1.default;
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const userExists = yield user_1.default.findOne({
            where: { name }
        });
        if (userExists) {
            return res.status(400).send('Email is already associated with an account');
        }
        const users = yield user_1.default.create({
            name,
            email,
            password: yield bcryptjs_1.default.hash(password, 15),
        });
        res.status(201).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        const user = yield user_1.default.findOne({
            where: { name }
        });
        if (!user) {
            return res.status(404).json('User not found');
        }
        const passwordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordValid) {
            return res.status(404).json('Incorrect username and password combination');
        }
        const token = sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        });
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}));
router.put('/user', [authMiddleware_1.authMiddleware, authMiddleware_1.authorized], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.password) {
            req.body.password = yield bcryptjs_1.default.hash(req.body.password, 15);
        }
        const users = yield user_1.default.update(req.body, {
            where: { id: req.user.id },
        });
        return res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}));
router.get('/user', [authMiddleware_1.authMiddleware, authMiddleware_1.authorized], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userObj = yield user_1.default.findOne({
            where: { id: req.user.id },
        });
        res.status(200).json(userObj);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}));
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}));
exports.default = router;
