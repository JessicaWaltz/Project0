import Reimbursment from "../models/Reimbursment";
import pool from "../server";

export async function getReimbursmentsByStatusId(id:number):Promise<Reimbursment[]>{
    const result = await pool.query(`SELECT * FROM reimbursements WHERE status = $1`,[id]);
    const reim:Reimbursment[] = [];
    for(let i of result.rows){
        reim.push(i);
    }
    console.log(result);
    console.log(reim);
    return reim;
}

export async function getReimbursmentsByAuthorId(id:number):Promise<Reimbursment[]>{
    const result = await pool.query(`SELECT * FROM reimbursements WHERE author = $1`,[id]);
    const reim:Reimbursment[] = [];
    for(let i of result.rows){
        reim.push(i);
    }
    console.log(result);
    console.log(reim);
    return reim;
}
export async function postReimbursment(request):Promise<Reimbursment>{
    console.log(request);
    let today = new Date();
    let day = String(today.getDate()).padStart(2,'0');
    let month =String(today.getMonth()).padStart(2,'0');
    let year = String(today.getFullYear());
    let submit_date = year + '-' + month + '-' + day;
    console.log(submit_date);
    //const the_date = await pool.query( `SELECT GETDATE();`);
    //console.log(the_date);
    const result = await pool.query(`INSERT INTO reimbursements 
    (author,ammount,date_submitted,description,status,reimbursement_type) VALUES
    ($1,$2,$3,$4,$5,$6)`,[request.author,request.ammount,submit_date,
    request.description,1,request.reimbursement_type]);
    console.log("WE INSERTED HERE");
    const ret = await pool.query(`SELECT * FROM reimbursements 
    ORDER BY id DESC LIMIT 1`);
    console.log("DID WE GET HERE?");
    console.log(ret.rows[0]);
    const reim = new Reimbursment(ret.rows[0]);
    console.log(reim);
    return reim;
}
/**
 * Only a finance-manager can update a reimbursement when they do they
 * approve or deny a reimbursement, update status, date resolved, resolver
 * @param request 
 */
export async function patchReimbursment(request):Promise<Reimbursment>{
    //const reim = new Reimbursment(request);
    let today = new Date();
    let day = String(today.getDate()).padStart(2,'0');
    let month =String(today.getMonth()).padStart(2,'0');
    let year = String(today.getFullYear());
    let submit_date = year + '-' + month + '-' + day;
    const result = await pool.query(`UPDATE reimbursements
    SET status = $1, resolver = $2, date_resolved = $3
    WHERE id = $4`,[request.status,request.resolver,submit_date,request.id]);
    const ret = await pool.query(`SELECT * FROM reimbursements WHERE id = $1`,[request.id]);
    const reim = new Reimbursment(ret.rows[0]);
    console.log(reim);
    return reim;
}