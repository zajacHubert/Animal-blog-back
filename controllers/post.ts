import { Request, Response } from "express";
import { db } from "../config/db";

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
    })
}

export const getPost = (req: Request, res: Response) => {
    console.log('getPost');
}

export const addPost = (req: Request, res: Response) => {
    console.log('addPost');
}

export const deletePost = (req: Request, res: Response) => {
    console.log('deletePost');
}

export const updatePost = (req: Request, res: Response) => {
    console.log('updatePost');
}
