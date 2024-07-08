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
const authMiddleware_1 = require("../middlewares/authMiddleware");
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /journals:
 *   get:
 *     summary: Fetch journals
 *     tags: [Journal]
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
 *         description:   Error
 */
//Fetch journals 
router.get('/journals', [authMiddleware_1.authMiddleware, authMiddleware_1.authorized], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startedDate, endDate, period } = req.query;
        let whereClause = {
            deletedAt: null,
            createdBy: req.user.id,
        };
        if (startedDate && endDate) {
            whereClause = {
                date: {
                    [sequelize_1.Op.gte]: endDate,
                    [sequelize_1.Op.lt]: startedDate
                },
                deletedAt: null,
                createdBy: req.user.id,
            };
        }
        let journals = yield journal_1.default.findAll({
            where: whereClause
        });
        return res.status(200).json(journals);
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
 *     summary: Add Journal
 *     tags: [Journal]
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: number
 *               date:
 *                 type: date
 *
 *             example:
 *                title: "My first Journal"
 *                content: "Additionaly It's not hard to see why. \nThe app offers a wide array of features—just about everything you might want or need in a digital journal.\nYou can create journal entries in one click on the Mac from the menu bar, use templates to ..."
 *                category: 3
 *                date: "07.04.2024"
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
//Add  Journal 
router.post('/journals', [authMiddleware_1.authMiddleware, authMiddleware_1.authorized], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.createdBy = req.user.id;
        let additionalText = `. \nAdditionaly It's not hard to see why. \nThe app offers a wide array of features—just about everything you might want or need in a digital journal.\nYou can create journal entries in one click on the Mac from the menu bar, use templates to ... `;
        req.body.content = req.body.content + additionalText;
        const journal = yield journal_1.default.create(req.body);
        res.status(201).json(journal);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}));
/**
 * @swagger
 * /journals/id:
 *   put:
 *     summary: Edit Journal
 *     tags: [Journal]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *          type: string
 *          example: 'Bearer XXX'
 *         required: true

 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the journal
 *         schema:
 *           type: string
 *         example:
 *             1
 *
 *     requestBody:
 *       description:  object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: number
 *               date:
 *                 type: date
 *
 *             example:
 *                title: "My first Journal"
 *                content: "Additionaly It's not hard to see why. \nThe app offers a wide array of features—just about everything you might want or need in a digital journal.\nYou can create journal entries in one click on the Mac from the menu bar, use templates to ..."
 *                category: 3
 *                date: "07.04.2024"
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
//Edit  Journal 
router.put('/journals/:id', [authMiddleware_1.authMiddleware, authMiddleware_1.authorized], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const journal = yield journal_1.default.update(req.body, {
            where: { id: req.params.id },
        });
        console.log("Finished");
        return res.status(200).json(journal);
    }
    catch (error) {
        // res.status(500).json({ message: 'Something went wrong' });
    }
}));
/**
 * @swagger
 * /journals/{id}:
 *   get:
 *     summary: Get a journal by ID
 *     tags: [Journal]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *          type: string
 *          example: 'Bearer XXX'
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the journal
 *         schema:
 *           type: string
 *         example:
 *             1
 

 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       404:
 *         description: journal not found
 */
//Get the journal
router.get('/journals/:id', [authMiddleware_1.authMiddleware, authMiddleware_1.authorized], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const journal = yield journal_1.default.findOne({
            where: { id: req.params.id },
        });
        return res.status(200).json(journal);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
/**
 * @swagger
 * /journals/delete/id:
 *   put:
 *     summary: Soft delete Journal
 *     tags: [Journal]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *          type: string
 *          example: 'Bearer XXX'
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the journal
 *         schema:
 *           type: string
 *         example:
 *             1
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
//Soft Delete  Journal 
router.put('/journals/delete/:id', [authMiddleware_1.authMiddleware, authMiddleware_1.authorized], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const journal = yield journal_1.default.update({ deletedAt: new Date() }, {
            where: { id: req.params.id },
        });
        console.log("Finished");
        return res.status(200).json(journal);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}));
/**
 * @swagger
 * /journals/id:
 *   delete:
 *     summary:  Delete Journal
 *     tags: [Journal]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *          type: string
 *          example: 'Bearer XXX'
 *         required: true

 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the journal
 *         schema:
 *           type: string
 *         example:
 *             1

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
//Delete  Journal 
router.delete('/journals/:id', [authMiddleware_1.authMiddleware, authMiddleware_1.authorized], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
