import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;
    jwt.verify(token, process.env.SECRET_CODE || '', (err, decoded) => {
        if (decoded) {
            req.body.user = (decoded as { id: string }).id;
            next();
        }
        else {
            res.send({ msg: "Something went wrong", error: err?.message });
        }
    });
}

export default authorization;
