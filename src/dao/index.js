// DAO - Data Access Object
// DAL - Data Access Layer

// export { default as userDAO } from './user';

import * as userDAO from './user';

import * as postDAO from './post';
import * as adminDAO from './admin';

export { userDAO, postDAO, adminDAO };
