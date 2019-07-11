import MYSECRET from './config/secret'
const {Pool,Client} = require('pg');
const connectionString = `postgressql://${MYSECRET.DB_USERNAME}:${MYSECRET.DB_PASSWORD}@localhost:5432`;
const client = () => {
  return new Client({
  connectionString:connectionString
});
}
export default client;