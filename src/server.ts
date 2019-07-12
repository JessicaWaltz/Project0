import MYSECRET from './config/secret'
// const {Pool,Client} = require('pg');
// const connectionString = `postgressql://${MYSECRET.DB_USERNAME}:${MYSECRET.DB_PASSWORD}@localhost:5432`;
// const client = () => {
//   return new Client({
//   connectionString:connectionString
// });
// }


const Pool = require('pg').Pool;
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password: `${MYSECRET.DB_PASSWORD}`,
    port:5432,
});
//export default client;
export default pool;