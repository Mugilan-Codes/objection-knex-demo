import BaseModel from './BaseModel';

class Channel extends BaseModel {
  static get tableName() {
    return 'channel';
  }

  static get relationMappings() {
    return {
      videos: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'Video',
        join: {
          from: 'channel.id',
          to: 'video.channel',
        },
      },
    };
  }
}

export default Channel;
