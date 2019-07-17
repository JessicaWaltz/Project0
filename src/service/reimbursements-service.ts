import Reimbursement from "../models/Reimbursement";
import pool from "../server";
import {getUID} from "../login";
/**
 * This returns a list of everything that has the same status as the
 * status id put in to search 1 = pending 2 = approved 3 = denied
 * @param id This is the status id that is being searched 
 */
export async function getReimbursementsByStatusId(id:number):Promise<Reimbursement[]>{
    const result = await pool.query(`SELECT * FROM reimbursements WHERE status = $1`,[id]);
    if (result.rowCount == 0){
        let a:Reimbursement = new Reimbursement(0);
        let er:Reimbursement[] = [];
        er.push(a);
        return er;
    }
    const reim:Reimbursement[] = [];
    for(let i of result.rows){
        const temp:Reimbursement = new Reimbursement(i);
        reim.push(temp);
    }
    return reim;
}
/**
 * This returns a list of all the reimbursements made by the auther with the 
 * submited id. if the person with that id hasnt submited anything or doesn't
 * exist then return an empty reimbursement class so that the invalid credentials
 * message is sent.
 * @param id is the id number belonging to the author of the post
 */
export async function getReimbursementsByAuthorId(id:number):Promise<Reimbursement[]>{
    try{
        const result = await pool.query(`SELECT * FROM reimbursements WHERE author = $1`,[id]);
        if (result.rowCount == 0){
            let a:Reimbursement = new Reimbursement(0);
            let er:Reimbursement[] = [];
            er.push(a);
            return er;
        }
        const reim:Reimbursement[] = [];
        for(let i of result.rows){
            const temp:Reimbursement = new Reimbursement(i);
            reim.push(temp);
        }
        console.log(result);
        console.log(reim);
        return reim;
    }
    catch(error){
        let a:Reimbursement = new Reimbursement(0);
        let er:Reimbursement[] = [];
        er.push(a);
        return er;
    }
}
/**
 * This runs the query to post the reimbursement, user passes in amount, description,
 * and type. rest is autofilled status = 1 (pending), author = user id and date_submitted
 * @param request is the data they pass in
 * @param id is their user ID
 */
export async function postReimbursement(request,id):Promise<Reimbursement>{
    //this gets the current date and formats it into sql's date form 
    let today = new Date();
    let day = String(today.getDate()).padStart(2,'0');
    let month =String(today.getMonth()+1).padStart(2,'0');//for some reason months start at 0
    let year = String(today.getFullYear());
    let submit_date = year + '-' + month + '-' + day;
    //if query is unsuccessful will return an empty reimbursement class
    try{
        const result = await pool.query(`INSERT INTO reimbursements 
        (author,amount,date_submitted,description,status,reimbursement_type) VALUES
        ($1,$2,$3,$4,$5,$6)`,[id,request.amount,submit_date,
        request.description,1,request.type]);
    }
    catch(error){
        const er = new Reimbursement(0);
        return er;
    }
    //this new reimbursement will have the highest id so if we order it by id and limit it my 1
    //we will can get the reimbursement without knowing its actual id number
    const ret = await pool.query(`SELECT * FROM reimbursements 
    ORDER BY id DESC LIMIT 1`);
    const reim = new Reimbursement(ret.rows[0]);
    return reim;
}
/**
 * Only a finance-manager can update a reimbursement when they do they
 * approve or deny a reimbursement, update status, date resolved, resolver
 * @param request is the request.body 
 */
export async function patchReimbursement(request,id):Promise<Reimbursement>{
    // This puts the current date in a string to use as the resolved_date
    //console.log(request.session.uID);
    let today = new Date();
    let day = String(today.getDate()).padStart(2,'0');
    let month =String(today.getMonth()+1).padStart(2,'0');//for some reason months start at 0
    let year = String(today.getFullYear());
    let submit_date = year + '-' + month + '-' + day;
    // This is the attempt to update the information to the reimbursement
    // to include the updated status, resolved time
    // check all entrys are valid syntax
    try{
        const result = await pool.query(`UPDATE reimbursements
        SET status = $1, resolver = $2, date_resolved = $3
        WHERE id = $4`,[request.status,id,submit_date,request.id]);
    }
    catch(err){
        const er = new Reimbursement(0);
        return er;
        //throw err;
        
    }
    const ret = await pool.query(`SELECT * FROM reimbursements WHERE id = $1`,[request.id]);
    
    const reim = new Reimbursement(ret.rows[0]);
    return reim;
}