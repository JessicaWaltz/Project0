import User from "../models/User";
//import client from "../queries";
let userCounter: number = 1;
const userMap: Map<Number,User> = new Map();
export function createUser(user): User{
    //let x: number = userCounter%12; 
    //user.username = "DefaultUser" + userCounter;
    user.userId = userCounter++;
    //user.firstName = "John";
    //user.lastName = "Doe";
    //user.email = "default@email.com";
    //user.password = "password123";
    
    //Registering key value pair
    userMap.set(user.userid,user);
    return user;
}
export function getUserById(id:number){
    return userMap.get(id);
}

//const con = client();
//con.connect();