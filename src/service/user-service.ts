import User from "../models/User";
import pool from "../server";
//let userCounter: number = 1;
//const userMap: Map<Number,User> = new Map();
export function createUser(user: User):Promise<User[]>{

    return pool.query(`INSERT INTO users (username,password,
        first_name,last_name,email,roleid)
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, 
        username`,[user.username,user.password,user.firstName,
        user.lastName,user.email,user.role])
        .then((data) =>{
            return data.rows;
        }).catch((err)=>{
            return [];
        });
    
    
}
export async function getUserById(id:number):Promise<User>{
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`,[id]);
    const user = new User(result.rows[0]);
    return user;
    
    //return userMap.get(id);
}
export async function getUsers():Promise<User[]>{
    const result = await pool.query(`SELECT * FROM users`);
    let users: User[] = [];
    for (let i of result.rows){
        users.push(i);
    }
    console.log(users);
    //const user = result.rows;
    return users;
}
/**
 * All fields of user will be passed in if not then error
 * If success then return the user, userId: number; username: string; 
 * password: string; firstName: string; lastName: string; 
 * email: string; role: Number; 
 * @param request 
 */
export async function patchUsers(request):Promise<User>{
    const result = await pool.query(`UPDATE users 
    SET username = $2, password = $3, first_name = $4, last_name = $5, email = $6, role = $7
    WHERE id = $1 `,[request.id,request.username,request.password,request.first_name,
    request.last_name,request.email,request.role]);
    const user = new User(result.rows[0]);
    return user;
}

//const con = client();
//con.connect();