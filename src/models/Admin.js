import BaseModel from './BaseModel';

class Admin extends BaseModel {
  static get tableName() {
    return 'admin';
  }
}

export default Admin;
