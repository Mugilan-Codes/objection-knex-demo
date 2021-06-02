import BaseModel from './BaseModel';

class Channel extends BaseModel {
  static get tableName() {
    return 'channel';
  }
}

export default Channel;
