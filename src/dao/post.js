import { Post } from '../models';

export const findAll = () => {
  return Post.query();
};

export const findById = (id) => {
  return Post.query().findById(id);
};

export const create = (title, body) => {
  return Post.query().insert({ title, body });
};

export const updateById = (id, title, body) => {
  return Post.query().update({ title, body }).findById(id);
};

export const deleteById = (id) => {
  return Post.query().deleteById(id);
};
