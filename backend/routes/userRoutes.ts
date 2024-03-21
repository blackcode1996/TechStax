import express, { Request, Response } from 'express';
import userModel from '../model/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err: Error, hash: string) => {
            if (err) {
                res.status(500).json({ msg: "Internal Server Error", error: err.message }); // 500 for Internal Server Error
            } else {
                const user = new userModel({ name, email, pass: hash });
                await user.save();
                res.json({ msg: "New user has been registered" });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error: error.message }); // 500 for Internal Server Error
    }
});


userRouter.post("/login", async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user || !user.email || !user.pass) {
            return res.status(401).json({ msg: "Invalid User and Password" }); // 401 for Unauthorized
        }

        const valid = bcrypt.compareSync(req.body.pass, user.pass);
        if (valid) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_CODE || '');
            let userData = {
                "name": user.name,
                "email": user.email
            }
            res.json({ message: "Login Success", userData, token });
        } else {
            res.status(401).json({ message: "Invalid access" }); // 401 for Unauthorized
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error: error.message }); // 500 for Internal Server Error
    }
});

module.exports = userRouter;


export default userRouter;
