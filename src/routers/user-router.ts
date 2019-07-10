import express, {Request, Response} from 'express';
import User from '../models/User';
import * as userService from '../service/user-service';
const userRouter = express.Router();
userRouter.post('',(request: Request, response: Response) => {
    console.log("IDK WHAT I'M DOING");
    const user = userService.createUser(request.body); 
    if (user){
        response.status(201).json(user);
    }
    else{
        response.sendStatus(500);
    }

});

userRouter.get('/:id', (request:Request, response:Response)=>{
    const id = parseInt(request.params.id);
    console.log("This guys got an ID of "+ id);
    const user : User = userService.getUserById(id);
    response.json(user);
});



//expose to others so they can use it
export default userRouter;