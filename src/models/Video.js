import BaseModel from './BaseModel';

class Video extends BaseModel {
  static get tableName() {
    return 'video';
  }
}

export default Video;
