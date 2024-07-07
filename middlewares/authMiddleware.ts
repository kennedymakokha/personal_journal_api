

import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;
export const authorized = (req: any, res: any, next: () => void) => {

    const loginRequired = req.user;
    if (loginRequired === null) {
        return res.status(401).json({ message: 'Unauthorized user !' });
    }
    next();

}

export const authMiddleware = (req: any, res: any, next: () => void) => {
    const authorization = req.headers['authorization'];
    const token = authorization && authorization.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ success: false, message: 'Not Authorised !' });
    }
    verify(token, 'nebbukadinezza', async (err: any, data: any) => {
        if (err) {
            console.log("AUTHORIZATION ERROR:", err)
            return res.status(403).json({ success: false, message: 'Not Authorised !' });
        }
        req.user = data;

        next();

    });

}

// export { authMiddleware, authorized };