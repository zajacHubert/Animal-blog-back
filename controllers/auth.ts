import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { db } from "../config/db";


export const register = async (req: Request, res: Response) => {
    const q = 'SELECT * FROM `users` WHERE `email` = ? OR `username` = ?';
    db.query(q, [req.body.username, req.body.password], (err, data) => {
        if (err) {
            return res
                .status(500)
                .json(err)
        }
        if (data.length) {
            return res
                .status(409)
                .json('User already exists')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = 'INSERT INTO users(`username`,`email`,`password`) VALUES (?)'
        const values = [req.body.username, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res
                .status(201)
                .json('User has been created')
        });
    });
}

export const login = async (req: Request, res: Response) => {
    console.log('login');
}

export const logout = async (req: Request, res: Response) => {
    console.log('logout');
}