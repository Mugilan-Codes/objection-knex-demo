import { BaseModel } from '../../models';

class Video extends BaseModel {
  static get tableName() {
    return 'video';
  }
}

export default Video;
