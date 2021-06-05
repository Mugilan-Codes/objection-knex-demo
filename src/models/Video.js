import BaseModel from './BaseModel';

class Video extends BaseModel {
  static get tableName() {
    return 'video';
  }

  static get relationMappings() {
    return {
      channel: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Channel',
        join: {
          from: 'video.channel',
          to: 'channel.id',
        },
      },
    };
  }
}

export default Video;
