import { Router } from 'express';
import { addPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post';

const router = Router();

router
    .get('/', getPosts)
    .get('/:id', getPost)
    .post('/', addPost)
    .delete('/:id', deletePost)
    .patch('/:id', updatePost)

export default router;