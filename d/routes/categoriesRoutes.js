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
const categories_1 = __importDefault(require("../models/categories"));
const router = (0, express_1.Router)();
router.get('/categories', (req:any, res:any) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jou = yield categories_1.default.findAll();
        res.status(200).json(jou);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
router.post('/categories', (req:any, res:any) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const categories = yield categories_1.default.create(req.body);
        res.status(201).json(categories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}));
router.put('/categories/:id', (req:any, res:any) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_1.default.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
router.delete('/categories/:id', (req:any, res:any) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_1.default.destroy({
            where: { id: req.params.id },
        });
        res.status(204).json({ message: 'categories deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
exports.default = router;
