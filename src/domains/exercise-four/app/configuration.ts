import * as dotenv from 'dotenv';

dotenv.config();

const database = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

export default {
  database,
};
