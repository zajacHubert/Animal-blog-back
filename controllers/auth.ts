import { Request, Response } from "express";
import { db } from "../config/db";


export const register = async (req: Request, res: Response) => {
    // const q='SELECT * FROM `users` WHERE `email` = ? OR `username` = ?';
    // db.query(q)
}

export const login = async (req: Request, res: Response) => {
    console.log('login');
}

export const logout = async (req: Request, res: Response) => {
    console.log('logout');
}