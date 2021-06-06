export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;

export const DB_CONNECTION = {
  host: process.env.DB_HOST || 'mysql', // IP Address
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'test_db',
};
