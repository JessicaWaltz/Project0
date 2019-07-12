import express, {Request, Response} from 'express';
import User from '../models/User';
import * as userService from '../service/user-service';
const userRouter = express.Router();
import MYSECRET from '../config/secret';
import pool from '../server';
//DAO Database Action Object
//  Create Query
//  Use Results
//  Async/await
//  {try-cat} 
//npm install tslint

userRouter.post('',(request: Request, response: Response) => {
    //console.log("IDK WHAT I'M DOING");
    const user = userService.createUser(request.body); 
    if (user){
        response.status(201).json(user);
    }
    else{
        response.sendStatus(500);
    }

});

userRouter.get('/:id',
    async (request:Request, response:Response)=>{
    const id = parseInt(request.params.id);
    const user: User = await userService.getUserById(id);
    if(user.userId){
        response.status(200).json(user);
    }
    else{
        response.sendStatus(400);
    }
});
userRouter.get('',
    async (request:Request, response:Response)=>{
    //const id = parseInt(request.params.id);
    const user: User[] = await userService.getUsers();
    if(user){
        response.status(200).json(user);
    }
    else{
        response.sendStatus(400);
    }
});



//expose to others so they can use it
export default userRouter;