import { Router } from 'express';
import Journal from '../models/journal';
import { authMiddleware, authorized } from '../middlewares/authMiddleware';
import { Op } from 'sequelize';

const router = Router();



router.get('/journals', [authMiddleware, authorized], async (req: any, res: any) => {
    try {
        // const startedDate = new Date("2024-07-02T21:00:00.000Z");;
        // const endDate = new Date("2024-06-29T21:00:00.000Z");
console.log("first")
        const { startedDate, endDate, period } = req.query
        console.log(startedDate, endDate)
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