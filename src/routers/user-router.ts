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

/*userRouter.post('',(request: Request, response: Response) => {
    const user = userService.createUser(request.body); 
    if (user){
        response.status(201).json(user);
    }
    else{
        response.sendStatus(500);
    }

});*/
/**
 * Only finance manager or if the logged in user is the one being searched
 * 
 */
userRouter.get('/:id',
    async (request:Request, response:Response)=>{
    const id = parseInt(request.params.id);
    if(getUID() == 0){
        response.status(401).json({message: "You are not logged in"});
    }
    else{
        const selfCheck:Boolean = await permissionService.checkSelfSearch(id); 
        const financeCheck:Boolean = await permissionService.checkFinance();
        if(selfCheck || financeCheck){
            const user: User = await userService.getUserById(id);
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
    async (request:Request, response:Response)=>{
    //console.log("Attempting to get all users");
    if(getUID() == 0){
        response.status(401).json({message: "You are not logged in"});
    }
    else{
        const checkPer:Boolean = await permissionService.checkFinance();
        if(checkPer){
            const user: User[] = await userService.getUsers();
            //console.log(user[0]);
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
    async(request:Request,response:Response)=>{
        if(getUID() == 0){
            response.status(401).json({message: "You are not logged in"});
        }
        else{
            const checkPer:Boolean = await permissionService.checkAdmin();
            if(checkPer){
                const user: User = await userService.patchUsers(request.body);
                console.log(user);
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