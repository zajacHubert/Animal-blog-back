import { Request, Response } from "express";


export const register = async (req: Request, res: Response) => {
    console.log('register');
}

export const login = async (req: Request, res: Response) => {
    console.log('login');
}

export const logout = async (req: Request, res: Response) => {
    console.log('logout');
}