import { postService } from '../services';
import { logger } from '../utils';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAll();

    logger.debug({ results: posts.length, data: { posts } });

    res
      .status(200)
      .json({ status: 'success', results: posts.length, data: { posts } });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

export const getOnePostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await postService.getOneById(id);

    logger.debug({ data: { post } });

    res.status(200).json({ status: 'success', data: { post } });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

export const createPost = async (req, res, next) => {
  const { title, body } = req.body;
  try {
    const post = await postService.createPost(title, body);

    logger.debug({ data: { post } });

    res.status(200).json({ status: 'success', data: { post } });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const post = await postService.updatePostById(id, title, body);

    logger.debug({ data: { post } });

    res.status(200).json({ status: 'success', data: { post } });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await postService.deletePostById(id);

    logger.debug({ data: { post } });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(400).json({ status: 'fail' });
  }
};
