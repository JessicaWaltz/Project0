import express, {Request, Response} from 'express';
import User from '../models/User';
import * as userService from '../service/user-service';
import * as permissionService from '../service/permissions-service';
const userRouter = express.Router();
import {getUID} from "../login";
import MYSECRET from '../config/secret';
import pool from '../server';

//DAO Database Action Object
//  Create Query
//  Use Results
//  Async/await
//  {try-cat} 
//npm install tslint


/**
 * Only finance manager or if the logged in user is the one being searched
 * 
 */
userRouter.get('/:id',
    async (request:any, response:Response)=>{
    const getID = parseInt(request.params.id);
    const uID = request.session.uid;
    if(!uID){
        response.status(401).json({message: "You are not logged in"});
    }
    else{
        const selfCheck:Boolean = await permissionService.checkSelfSearch(uID,getID); 
        const financeCheck:Boolean = await permissionService.checkFinance(uID);
        if(selfCheck || financeCheck){
            const user: User = await userService.getUserById(getID);
            if(user.userId){
                response.status(200).json(user);
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
 * shows all users, only finance managers can do this
 */
userRouter.get('',
    async (request:any, response:Response)=>{
    const uID = request.session.uid;
    if(!uID){
        response.status(401).json({message: "You are not logged in"});
    }
    else{
        const checkPer:Boolean = await permissionService.checkFinance(request.session.uid);
        if(checkPer){
            const user: User[] = await userService.getUsers();
            if(user[0].userId){
                response.status(200).json(user);
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
 * Only an Admin can do this
 */
userRouter.patch('',
    async(request:any,response:Response)=>{
        const uID = request.session.uid;
        if(!uID){
            response.status(401).json({message: "You are not logged in"});
        }
        else{
            const checkPer:Boolean = await permissionService.checkAdmin(uID);
            if(checkPer){
                //only if all fields filled
                const user: User = await userService.patchUsers(request.body);
                if(user.userId){
                    response.status(200).json(user);
                }
                else{
                    response.status(400).json({message: "Invalid Credentials"});
                }
            }
            else{
                response.status(401).json({message: "You are not authorized for this operation"});
            }
        }
    })


//expose to others so they can use it
export default userRouter;