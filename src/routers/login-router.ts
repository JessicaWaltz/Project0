import express, {Request, Response} from 'express';
import User from '../models/User';
import * as loginService from '../service/login-service';
const loginRouter = express.Router();
/**
 * user submits username and password to log in 
 * respond with the user 
 */
loginRouter.post('',async (request: Request, response: Response) => {
    console.log('Atempting to log in');
    const loginfo:User = await loginService.login(request.body);
    console.log(loginfo);
    if(loginfo.userId){
       // console.log('success?');
        response.status(201).json(request.body.username);
    }
    else{
        //console.log('you have no idea what you are doing do you?');
        response.status(400).json({message: "Invalid Credentials"});
    }

});
export default loginRouter;