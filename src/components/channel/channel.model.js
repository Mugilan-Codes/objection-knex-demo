import { BaseModel } from '../../models';

class Channel extends BaseModel {
  static get tableName() {
    return 'channel';
  }
}

export default Channel;
