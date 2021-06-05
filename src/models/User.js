import BaseModel from './BaseModel';

class User extends BaseModel {
  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
      channel: {
        relation: BaseModel.HasOneRelation,
        modelClass: 'Channel',
        join: {
          from: 'user.channelId',
          to: 'channel.id',
        },
      },
    };
  }
}

export default User;
