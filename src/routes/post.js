import express from 'express';

import { postController } from '../controllers';

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route('/:id')
  .get(postController.getOnePostById)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

export default router;
