import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
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

        const q = 'INSERT INTO users(`id`,`username`,`email`,`password`) VALUES (?)'
        const values = [uuid(), req.body.username, req.body.email, hash];

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
    const q = 'SELECT * FROM users WHERE username = ?'
    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            return res
                .status(500)
                .json(err)
        }
        if (data.length === 0) {
            return res
                .status(404)
                .json('User not found')
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) {
            return res
                .status(400)
                .json('Wrong password')
        }

        const token = jwt.sign({ id: data[0].id }, 'jwtkey');
        const { password, ...other } = data[0];
        return res
            .cookie('access_token', token, {
                httpOnly: true,
            })
            .status(200)
            .json(other)
    });
}

export const logout = async (req: Request, res: Response) => {
    return res
        .clearCookie('access_token', {
            sameSite: 'none',
            secure: true,
        })
        .status(200)
        .json('User has been logged out')
}