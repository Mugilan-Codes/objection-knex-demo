import { User } from '../models';

// class UserDAO {
//   findById(id) {
//     return User.query().findById(id).withGraphFetched('channel');
//   }
// }

// export default UserDAO;

export const findAll = () => {
  // return User.query().withGraphFetched('channel');
  return User.query();
};

export const findById = (id) => {
  return User.query().findById(id).withGraphFetched('channel');
};
