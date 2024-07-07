import { Router } from 'express';
import Categories from '../models/categories';
import { authMiddleware, authorized } from '../middlewares/authMiddleware';
const router = Router();
// authMiddleware
router.get('/categories', [authMiddleware, authorized], async (req:any, res:any) => {
    try {
        const jou = await Categories.findAll();
        res.status(200).json(jou);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/categories', [authMiddleware, authorized], async (req:any, res:any) => {
    try {
        console.log(req.body)
        const categories = await Categories.create(req.body);
        res.status(201).json(categories);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong', error });
    }
});

router.put('/categories/:id', [authMiddleware, authorized], async (req:any, res:any) => {
    try {
        const categories = await Categories.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.delete('/categories/:id', [authMiddleware, authorized], async (req:any, res:any) => {
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