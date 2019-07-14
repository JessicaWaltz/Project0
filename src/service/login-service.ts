import User from "../models/User";
import pool from "../server";
import { exists } from "fs";
import {setUID} from "../login";
 

export async function login(loginfo):Promise<User>{
    const result = await pool.query(
    `SELECT * FROM users WHERE
    (username,password) = ($1,$2);`,
    [loginfo.username,loginfo.password]);
    const user:User = new User(result.rows[0]);
    setUID(user.userId);
    return user;
}
/*select exists (`SELECT * FROM users WHERE
    (username,password) = ($1,$2) `,
    [loginfo.username,loginfo.password]))
    */

/**
 * Types of joins
 * left outer join 
 * right outer join
 * full outer join
 * inner join
 * natural join
 * cross join
 * unequal join
 * 
 * TCL
 * Transaction controll language
 * 
 * function for conducting a transfer from one account to another
 * how do you implement such a function?
 * 
 * Subtract funds from account a
 * add funds from account b
 * 
 * 1. BEGIN -
 * 2. COMMIT -
 * 3. ROLLBACK -
 * 4. SAVEPOINT
 * 5. ROLLBACK TO 
 * 6. RELEASE
 * 
 * BEGIN
 * UPDATE Bank_account set balance = balance -10 where id = 1;
 * 
 * 
 * 
 * 
 * ACID -Properties of a transactions
 * -Atomic - not possible for partial transaction
 * -Consistency - a transactoion must move the database from 
 *      one consistent sate to another consistent state
 *      This means that all rules that govern the data
 *      must be in compliance both before and after the
 *      transaction.
 * -Isolated - Transactions should occur as if they are
 *      happening sequentually. This means, despite 
 *      transactions being processed in parallel they 
 *      should not interact with one another. Related to
 *      transaction isolation levels.
 * -Durable - A committed transaction is final. There is
 *      no going back. You should not attempt to go back.
 */

 /**
  * Cookies
  * 
  * 
  * APP.ts
  * app.use(session({
  *     resave: false,
  *     save
  *     
  * }))
  * 
  * 
  * npm install express-session
  * 
  * User-router
  * userRouter.get()
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * Procedural language in postgresql can be written in a large number
  * of different languages including java , javascript but we will be 
  * working with procedural language postgresql: PLpgSQL 
  * 
  * create or replace function my_sum(a INTEGER, b INTEGER)
  *     returns INTEGER as $$
  *         begin
  *             return a + b;
  *         end;
  *         -- body of the function itself
  *     $$ language plpgsql;
  * 
  * select my_sum(2,5);
  * 
  * Definer and invoker
  * Invoker - functions with permissions of caller of function
  * 
  * 
  * Trigger
  */