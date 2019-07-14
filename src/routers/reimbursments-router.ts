import express, {Request, Response} from 'express';
import * as reimbursmentService from '../service/reimbursments-service';
const reimbursmentsRouter = express.Router();
import MYSECRET from '../config/secret';
import pool from '../server';
import Reimbursment from '../models/Reimbursment';
import { request } from 'https';
/**
 * This is the call to view all reimbursements with the same status.
 * Only a finance manager(role id = 2) can do this. The call will
 * return a list of all reimbursements with that status.
 * */
reimbursmentsRouter.get('/status/:id',
    async (request:Request, response:Response)=>{
        const id = parseInt(request.params.id);
        const reim: Reimbursment[] = await reimbursmentService.getReimbursmentsByStatusId(id);
        if(reim){
            response.status(200).json(reim);
        }
        else{
            response.sendStatus(400);
        }
});
/**
 * This is the call to view all reimburements started by a specific user
 * User must be either a finance manager (role id = 2) or the author. The response 
 * Should be a list of all reimbursements the author made.
 */
reimbursmentsRouter.get('/author/userId/:id',
    async (request:Request, response:Response)=>{
        const id = parseInt(request.params.id);
        const reim: Reimbursment[] = await reimbursmentService.getReimbursmentsByAuthorId(id);
        if(reim){
            response.status(200).json(reim);
        }
        else{
            response.sendStatus(400);
        }
});
/**
 * This is the call to add a new reimbursement, anyone can make this request.
 * Return status code of 201 if a success
 */
reimbursmentsRouter.post('',
    async (request:Request, response:Response)=>{
        const res:Reimbursment = await reimbursmentService.postReimbursment(request.body);
        if(res.reimbursementId){
            response.sendStatus(201);
        }
        else{
            response.sendStatus(400);
        }
});
/**
 * This is the call to update a request whe resolving it, only a finance manager 
 * (role id = 2)is allowed to do this. Return the updated reimbursement on success.
 */
reimbursmentsRouter.patch('',
    async (request:Request,response:Response)=>{
        const patch: Reimbursment = request.body;
        const patchedRe: Reimbursment = await reimbursmentService.patchReimbursment(patch);
        if(patchedRe.reimbursementId){
            response.json(patchedRe);
        }
        response.sendStatus(200);
});


export default reimbursmentsRouter;