import BaseModel from './BaseModel';

class Post extends BaseModel {
  static get tableName() {
    return 'post';
  }
}

export default Post;
