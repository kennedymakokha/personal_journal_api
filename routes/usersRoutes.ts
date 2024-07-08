import { Router } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { authMiddleware, authorized } from '../middlewares/authMiddleware';
const router = Router();


const { sign, decode, verify } = jsonwebtoken;
/**
 * @swagger
 * /register:
 *   post:
 *     summary: sign Up User
 *     tags: [User]
 *     requestBody:
 *       description: User object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: password
 *               confirm_password:
 *                 type: password
 *              
 *             example:
 *                name: "nebukadinezza"
 *                email: "nebukadinezza@example.com"
 *                password: "nebukadinezza"
 *                confirm_password: "nebukadinezza"
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
//Register User 

router.post('/register', async (req: any, res: any) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
        const userExists = await User.findOne({
            where: { name }
        });
        if (userExists) {
            return res.status(400).send('Username is already associated with an account');
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
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login User
 *     tags: [User]
 *     requestBody:
 *       description: User object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: password
 *            
 *              
 *             example:
 *                name: "nebukadinezza"
 *                password: "nebukadinezza"
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
//Login User 

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
/**
 * @swagger
 * /user:
 *   put:
 *     summary: Edit  User
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *          type: string
 *          example: 'Bearer XXX'
 *         required: true

 *     requestBody:
 *       description: User object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: password
 *               confirm_password:
 *                 type: password
 *              
 *             example:
 *                name: "nebukadinezza"
 *                email: "nebukadinezza@example.com"
 *                password: "nebukadinezza"
 *                confirm_password: "nebukadinezza"
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
//Edit User 

router.put('/user', [authMiddleware, authorized], async (req: any, res: any) => {
    try {
        const userObj = await User.findOne({
            where: { id: req.user.id },
        });
        res.st
        if (req.body.password !== "") {
            req.body.password = await bcrypt.hash(req.body.password, 15)
        } else {
            req.body.password = userObj?.password
        }
        const users = await User.update(req.body, {
            where: { id: req.user.id },
        });

        return res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get Authenticated User
 *     tags: [User]
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
 *               data: {}
 *       404:
 *         description: User not found
 */


//Get Authenticated User

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
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Fetch Users
 *     tags: [User]
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
 *         description: User not found
 */
//Get Fetch Users 
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