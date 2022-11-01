import { Request, Response } from "express";

export const getPosts = (req: Request, res: Response) => {
    console.log('getPosts');
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
