import User from "../models/User";
import pool from "../server";
import { exists } from "fs";

export async function login(loginfo):Promise<Boolean>{
    const result = await pool.query(
    `SELECT EXISTS (SELECT * FROM users WHERE
    (username,password) = ($1,$2) )`,
    [loginfo.username,loginfo.password]);
    console.log(result.rows);
    console.log(result.rows.exists);
    //const user = new User(result.rows[0]);
    if(result.rows[0] == undefined){
        return false;
    }
    return true;
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
 * 
 */