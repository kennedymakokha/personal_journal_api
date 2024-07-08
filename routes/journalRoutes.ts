import { Router } from 'express';
import Journal from '../models/journal';
import { authMiddleware, authorized } from '../middlewares/authMiddleware';
import { Op } from 'sequelize';

const router = Router();

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
router.get('/journals', [authMiddleware, authorized], async (req: any, res: any) => {
    try {

        const { startedDate, endDate, period } = req.query

        let whereClause: any = {
            deletedAt: null,
            createdBy: req.user.id,
        };

        if (startedDate && endDate) {
            whereClause = {
                date: {
                    [Op.gte]: endDate,
                    [Op.lt]: startedDate
                },
                deletedAt: null,
                createdBy: req.user.id,
            };

        }
        let journals = await Journal.findAll({
            where: whereClause
        })
        return res.status(200).json(journals);



    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
});
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
router.post('/journals', [authMiddleware, authorized], async (req: any, res: any) => {
    try {
        req.body.createdBy = req.user.id
        let additionalText = `. \nAdditionaly It's not hard to see why. \nThe app offers a wide array of features—just about everything you might want or need in a digital journal.\nYou can create journal entries in one click on the Mac from the menu bar, use templates to ... `
        req.body.content = req.body.content + additionalText
        const journal = await Journal.create(req.body);
        res.status(201).json(journal);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
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
router.put('/journals/:id', [authMiddleware, authorized], async (req: any, res: any) => {
    try {

        const journal = await Journal.update(req.body, {
            where: { id: req.params.id },
        });
        console.log("Finished")
        return res.status(200).json(journal);
    } catch (error) {
        // res.status(500).json({ message: 'Something went wrong' });
    }
});
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

router.get('/journals/:id', [authMiddleware, authorized], async (req: any, res: any) => {
    try {
        const journal = await Journal.findOne({
            where: { id: req.params.id },
        });
        return res.status(200).json(journal);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
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
router.put('/journals/delete/:id', [authMiddleware, authorized], async (req: any, res: any) => {
    try {
        const journal = await Journal.update({ deletedAt: new Date() }, {
            where: { id: req.params.id },
        });
        console.log("Finished")
        return res.status(200).json(journal)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

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
router.delete('/journals/:id', [authMiddleware, authorized], async (req: any, res: any) => {
    try {
        await Journal.destroy({
            where: { id: req.params.id },
        });
        res.status(204).json({ message: 'journal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

export default router;