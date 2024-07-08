import { Router } from 'express';
import Categories from '../models/categories';
import { authMiddleware, authorized } from '../middlewares/authMiddleware';
const router = Router();
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
router.get('/categories', async (req: any, res: any) => {
    try {
        const jou = await Categories.findAll();
        res.status(200).json(jou);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
});
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
router.post('/categories', [authMiddleware, authorized], async (req: any, res: any) => {
    try {
        console.log(req.body)
        const categories = await Categories.create(req.body);
        res.status(201).json(categories);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
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
router.put('/categories/:id', [authMiddleware, authorized], async (req: any, res: any) => {
    try {
        const categories = await Categories.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.delete('/categories/:id', async (req: any, res: any) => {
    try {
        await Categories.destroy({
            where: { id: req.params.id },
        });
        res.status(204).json({ message: 'categories deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

export default router;