import express from 'express';

import { postController } from '../controllers';
import { authorize } from '../middlewares';

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(authorize, postController.createPost);

router
  .route('/:id')
  .get(postController.getOnePostById)
  .patch(authorize, postController.updatePost)
  .delete(authorize, postController.deletePost);

export default router;
