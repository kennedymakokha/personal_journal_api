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
const journal_1 = __importDefault(require("../models/journal"));
const router = (0, express_1.Router)();
router.get('/journals', (req:any, res:any) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startedDate = new Date("2020-12-12 00:00:00");
        const endDate = new Date("2020-12-26 00:00:00");
        const { cate, date, period } = req.query;
        let journal = [];
        // if (cate && cate !== undefined) {
        if (period && period !== undefined) {
            const where = {
                from: {
                    $between: [startedDate, endDate]
                }
            };
        }
        let journals = yield journal_1.default.findAll();
        // res.status(200).json();
        // const journals = await Journal.findAll({
        //     where: where
        //     // where: {
        //     //     category: {cate},
        //     // },
        // });
        return res.status(200).json(journals);
        // }
        const jou = yield journal_1.default.findAll({});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
router.post('/journals', (req:any, res:any) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const journal = yield journal_1.default.create(req.body);
        res.status(201).json(journal);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}));
router.put('/journals/:id', (req:any, res:any) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const journal = yield journal_1.default.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json(journal);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
router.get('/journals/:id', (req:any, res:any) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const journal = yield journal_1.default.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json(journal);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
router.delete('/journals/:id', (req:any, res:any) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield journal_1.default.destroy({
            where: { id: req.params.id },
        });
        res.status(204).json({ message: 'journal deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
exports.default = router;
