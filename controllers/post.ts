import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuid } from 'uuid';
import { db } from "../config/db";
import { UserInfo } from "../types/user";

export const getPosts = (req: Request, res: Response) => {
    const cat = req.query.cat;
    const q = cat
        ? 'SELECT *FROM `posts` WHERE `cat` = ?'
        : 'SELECT * FROM `posts`';

    db.query(q, [cat], (err, data) => {
        if (err) {
            return res
                .status(500)
                .json(err)
        }
        return res
            .status(200)
            .json(data)
    });
}

export const getPost = (req: Request, res: Response) => {
    const q =
        'SELECT p.id, `username`, `title`, `desc`, `img`, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?';

    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res
                .status(500)
                .json(err)
        }
        if (!data.length) {
            return res
                .status(404)
                .json('Post not found')
        }
        return res
            .status(200)
            .json(data[0])
    });
}

export const addPost = (req: Request, res: Response) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err: any, userInfo: UserInfo) => {
        if (err) {
            return res
                .status(403)
                .json("Token is not valid!")
        }

        const q = 'INSERT INTO posts(`id`,`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)';
        const values = [
            uuid(),
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id,
        ];
        db.query(q, [values], (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .json(err)
            }
            return res
                .status(200)
                .json("Post has been created.")
        });
    });
}

export const deletePost = (req: Request, res: Response) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res
            .status(401)
            .json('Not authenticated!')
    }

    jwt.verify(token, "jwtkey", (err: any, userInfo: UserInfo) => {
        if (err) {
            return res
                .status(403)
                .json('Token is not valid!')
        }

        const postId = req.params.id;
        const q = 'DELETE FROM posts WHERE `id` = ? AND `uid` = ?';

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) {
                return res
                    .status(403)
                    .json("You can delete only your post!")
            }
            return res
                .status(200)
                .json("Post has been deleted!")
        });
    });
}

export const updatePost = (req: Request, res: Response) => {
    console.log('updatePost');
}
