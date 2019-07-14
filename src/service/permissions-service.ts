import Reimbursment from "../models/Reimbursment";
import User from "../models/User";
import pool from "../server";
import {getUID} from "../login";

export async function checkAdmin(){
    const uID = getUID();
    const res = await pool.query(`SELECT roleid FROM users WHERE id = $1`,[uID]);
    if(res.rows[0].roleid == 1){
        return true;
    } 
    return false;
}
export async function checkFinance(){
    const uID = getUID();
    console.log(uID);
    const res = await pool.query(`SELECT roleid FROM users WHERE id = $1`,[uID]);
    console.log(res);
    console.log(res.fields);
    if(res.rows[0].roleid == 2){
        //console.log("I am definitely a finance manager\n\n\n\n\n\n");
        return true;
    } 
    return false;
}
export async function checkSelfSearch(id){
    const uID = getUID();
    if(id == uID){
        return true;
    }
    return false;
}
