import express, {Request, Response} from 'express';
import * as reimbursementService from '../service/reimbursements-service';
import * as permissionService from '../service/permissions-service';
const reimbursementsRouter = express.Router();
import MYSECRET from '../config/secret';
import pool from '../server';
import Reimbursement from '../models/Reimbursement';
import { request } from 'https';
import {getUID} from "../login";
/**
 * This is the call to view all reimbursements with the same status.
 * Only a finance manager(role id = 2) can do this. The call will
 * return a list of all reimbursements with that status.
 * */
reimbursementsRouter.get('/status/:id',
    async (request:any, response:Response)=>{
        const uID = request.session.uid;
        if(!uID){
            response.status(401).json({message: "You are not logged in"});
        } 
        else{
            const financeCheck:Boolean = await permissionService.checkFinance(uID);
            if (financeCheck){
                const id = parseInt(request.params.id);
                const reim: Reimbursement[] = await reimbursementService.getReimbursementsByStatusId(id);
                if(reim[0].reimbursementId){
                    response.status(200).json(reim);
                }
                else{
                    response.status(400).json({message: "Invalid Credentials"});
                }
            }
            else{
                response.status(401).json({message: "You are not authorized for this operation"});
            }
        }
});
/**
 * This is the call to view all reimburements started by a specific user
 * User must be either a finance manager (role id = 2) or the author. The response 
 * Should be a list of all reimbursements the author made.
 */
reimbursementsRouter.get('/author/userId/:id',
    async (request:any, response:Response)=>{
        const id = parseInt(request.params.id);
        const uID = request.session.uid;
        if(!uID){
            response.status(401).json({message: "You are not logged in"});
        }
        else{
            const selfCheck:Boolean = await permissionService.checkSelfSearch(uID,id); 
            const financeCheck:Boolean = await permissionService.checkFinance(uID);
            if(selfCheck || financeCheck){
                const reim: Reimbursement[] = await reimbursementService.getReimbursementsByAuthorId(id);
                if(reim[0].reimbursementId){
                    response.status(200).json(reim);
                }
                else{
                    response.status(400).json({message: "Invalid Credentials"});
                }
            }
            else{
                response.status(401).json({message: "You are not authorized for this operation"});
            }
        }
});
/**
 * This is the call to add a new reimbursement, anyone can make this request.
 * Return status code of 201 if a success
 */
reimbursementsRouter.post('',
    async (request:any, response:Response)=>{
        //get the id number of the user if logged in otherwise it is undefined
        const uID = request.session.uid;
        console.log("The user ID is "+uID);
        //check make sure they are logged in
        if(!uID){
            response.status(401).json({message: "You are not logged in"});
        }
        else{
            //send their request and user id in to make/post the reinbersement
            const res:Reimbursement = await reimbursementService.postReimbursement(request.body,uID);
            if(res.reimbursementId){
                response.status(201).json(res);
            }
            else{
                response.status(400).json({message: "Invalid Credentials"});
            }
        }
});
/**
 * This is the call to update a request when resolving it, only a finance manager 
 * (role id = 2)is allowed to do this. Return the updated reimbursement on success.
 */
reimbursementsRouter.patch('',
    async (request:any,response:Response)=>{
        //get the logged in users user id or undefined if no one is logged in
        const uID = request.session.uid;
        if(!uID){
            response.status(401).json({message: "You are not logged in"});
        }
        else{
             //check if the user that is logged in has the role of finance manager
            const financeCheck:Boolean = await permissionService.checkFinance(uID);
                if(financeCheck){
                    const patch: Reimbursement = request.body;
                    const patchedRe: Reimbursement = await reimbursementService.patchReimbursement(patch,uID);
                    if(patchedRe.reimbursementId){
                        try{
                            response.status(200).json(patchedRe);
                        }catch(err){
                            throw err;
                        }
                    }
                    response.status(400).json({message: "Invalid Credentials"});
                }
                else{
                    response.status(401).json({message: "You are not authorized for this operation"});
                }
        }
});


export default reimbursementsRouter;