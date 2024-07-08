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
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// authMiddleware
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Fetch Categories
 *     tags: [Category]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *          type: string
 *          example: 'Bearer XXX'
 *         required: true

 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       404:
 *         description: category not found
 */
//Get Fetch Categories 
router.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jou = yield categories_1.default.findAll();
        res.status(200).json(jou);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
/**
 * @swagger
 * /journals:
 *   post:
 *     summary: Add Category
 *     tags: [Category]
 *      parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *          type: string
 *          example: 'Bearer XXX'
 *         required: true

 *     requestBody:
 *       description:  object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *
 *
 *             example:
 *                title: "Fun"
 *
 *
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       400:
 *         description: Invalid request
 */
//Add  Category 
router.post('/categories', [authMiddleware_1.authMiddleware, authMiddleware_1.authorized], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
/**
 * @swagger
 * /journals:
 *   put:
 *     summary: Add Category
 *     tags: [Category]
 *      parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *          type: string
 *          example: 'Bearer XXX'
 *         required: true

 *     requestBody:
 *       description:  object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *
 *
 *             example:
 *                title: "Fun"
 *
 *
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       400:
 *         description: Invalid request
 */
//Add  Category 
router.put('/categories/:id', [authMiddleware_1.authMiddleware, authMiddleware_1.authorized], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.delete('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
