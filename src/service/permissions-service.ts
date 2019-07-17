import Reimbursement from "../models/Reimbursement";
import User from "../models/User";
import pool from "../server";
import {getUID} from "../login";

/**
 * This function checks if the user has the role of admin
 * @param uID is the user who is currently logged in
 */
export async function checkAdmin(uID){
    const res = await pool.query(`SELECT role_id FROM users WHERE id = $1`,[uID]);
    if(res.rows[0].role_id == 1){
        return true;
    } 
    return false;
}
/**
 * This function checks if the logged in user has the role of a finance manager
 * @param uID is the user who is currently logged in
 */
export async function checkFinance(uID){
    const res = await pool.query(`SELECT role_id FROM users WHERE id = $1`,[uID]);
    if(res.rows[0].role_id == 2){
        return true;
    } 
    return false;
}
/**
 * This function will return true if the user is trying to search themself
 * @param uID is the user who is currently logged in
 * @param searchID is the user that they want to search
 */
export async function checkSelfSearch(uID,searchID){
    if(searchID == uID){
        return true;
    }
    return false;
}
