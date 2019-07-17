import User from "../models/User";
import pool from "../server";
//let userCounter: number = 1;
//const userMap: Map<Number,User> = new Map();
//this is not used for this assignment
/*
export function createUser(user: User):Promise<User[]>{

    return pool.query(`INSERT INTO users (username,password,
        first_name,last_name,email,role_id)
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, 
        username`,[user.username,user.password,user.firstName,
        user.lastName,user.email,user.role])
        .then((data) =>{
            return data.rows;
        }).catch((err)=>{
            return [];
        });
    
    
}*/
/**
 * returns the user information of the user being searched with 
 * the password redacted.
 * @param id the id of the user that is being searched
 */
export async function getUserById(id:number):Promise<User>{
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`,[id]);
    const user = new User(result.rows[0]);
    user.password = "***********";
    return user;
}
/**
 * Returns all user information of all users with their password
 * information redacted.
 */
export async function getUsers():Promise<User[]>{
    const result = await pool.query(`SELECT * FROM users`);
    let users: User[] = [];
    for (let i of result.rows){
        let temp:User = new User(i);
        temp.password = "***********";
        users.push(temp);
    }
    console.log(users);
    return users;
}
/**
 * The admin will send the id of the user they want to change and any 
 * information they want to change about the user.
 * @param request is the body of their request
 */
export async function patchUsers(request):Promise<User>{
    // only change what they submitted
    //1. check id make sure valid 
    //check which fields they did include to change
    try{
        const result = await pool.query(`SELECT * FROM users where id = $1`,[request.id]);
        const user:User = new User(result.rows[0]);
        //if they didnt give a column to change then it will "change" it to what it already is
        const result2 = await pool.query(`UPDATE users 
        SET username = $1, password = $2, first_name = $3, last_name = $4, email = $5, role_id = $6
        WHERE id = $7 `,
        [request.username || user.username,
        request.password || user.password,
        request.first_name || user.firstName,
        request.lastName || user.lastName,
        request.email || user.email,
        request.role_id || user.role, user.userId]);
        const res = await pool.query(`SELECT * FROM users WHERE id = $1`,[user.userId]);
        const retUser = new User(res.rows[0]);
        retUser.password = "***********";
        return retUser;
    }
    catch(err){
        return new User(0);
    }
        

}