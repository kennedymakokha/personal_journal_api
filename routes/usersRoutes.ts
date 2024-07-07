import { Router } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { authMiddleware, authorized } from '../middlewares/authMiddleware';
const router = Router();


const { sign, decode, verify } = jsonwebtoken;

router.post('/register', async (req: any, res: any) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
        const userExists = await User.findOne({
            where: { name }
        });
        if (userExists) {
            return res.status(400).send('Email is already associated with an account');
        }
        const users = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 15),
        });

        res.status(201).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
router.post('/login', async (req: any, res: any) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({
            where: { name }
        });
        if (!user) {
            return res.status(404).json('User not found');
        }

        const passwordValid = await bcrypt.compare(password, user.password);
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
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong', error });
    }
});

router.put('/user', [authMiddleware, authorized], async (req: any, res: any) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 15)
        }
        const users = await User.update(req.body, {
            where: { id: req.user.id },
        });

        return res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});

router.get('/user', [authMiddleware, authorized], async (req: any, res: any) => {
    try {
        const userObj = await User.findOne({
            where: { id: req.user.id },
        });
        res.status(200).json(userObj);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
router.get('/users', async (req: any, res: any) => {
    try {
        const users = await User.findAll({

        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});




export default router;