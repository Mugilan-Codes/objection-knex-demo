import { postDAO } from '../dao';

export const getAll = () => {
  return postDAO.findAll();
};

export const getOneById = (id) => {
  return postDAO.findById(id);
};

export const createPost = (title, body) => {
  return postDAO.create(title, body);
};

export const updatePostById = (id, title, body) => {
  return postDAO.updateById(id, title, body);
};

export const deletePostById = (id) => {
  return postDAO.deleteById(id);
};
